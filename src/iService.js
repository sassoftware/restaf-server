/*
 *  ------------------------------------------------------------------------------------
 *  * Copyright (c) SAS Institute Inc.
 *  *  Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  * http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  limitations under the License.
 * ----------------------------------------------------------------------------------------
 *
 */

let fs = require('fs');
let debug = require('debug')('service');
let debug2 = require('debug')('tls');
// let isDocker = require('is-docker');
let Hapi = require('@hapi/hapi');
let H202 = require('@hapi/h2o2');
// const { isSameSiteNoneCompatible } = require('should-send-same-site-none');
let NodeCache = require("node-cache-promise");
let Vision = require('@hapi/vision');
let inert = require('@hapi/inert');
let selfsigned = require('selfsigned');
import setupAuth from './plugins/setupAuth';
import readCerts from './readCerts';

let os = require('os');

async function iService (userRouteTable, useDefault, asset, allAppEnv, serverMode, userCache) {
	// process.env.APPHOST_ADDR = process.env.APPHOST;
	const init = async () => {
	
		if (process.env.APPHOST === '*') {
			process.env.APPHOST = os.hostname();
		}
		let defaultMaxBytes = 10485760;
		let maxBytes;
		if (isNaN(process.env.PAYLOADMAXBYTES)) {
			maxBytes = defaultMaxBytes;
		} else {
			maxBytes = Number(process.env.PAYLOADMAXBYTES);
		}
		let isSameSite = 'Lax';
		let isSecure = false;
		let https = process.env.HTTPS || 'TRUE';
		https = https.toUpperCase();
		
		if (process.env.SAMESITE != null) {
			let [s1, s2] = process.env.SAMESITE.split(',');
			isSameSite = s1;
			isSecure = s2 === 'secure' ? true : false;
			if (https !== 'TRUE') {
				isSecure = false;
			}
		}
	

		let sConfig = {
			port: process.env.APPPORT,
			host: process.env.APPHOST,

			state: {
				isSameSite: isSameSite,
				isSecure  : isSecure,

			},
	

			routes: {
				payload: {
					maxBytes: maxBytes
				},
				cors: {
					origin     : ['*'],
					credentials: true,
					
					"headers": ["Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"]
					/*
					'Access-Control-Allow-Methods': ['GET', 'POST', 'OPTIONS'],
					additionalHeaders             : ['multipart/form-data', 'content-disposition'],
					additionalExposedHeaders      : ['location'],
					*/
				}
				
			},
		};
		if (process.env.HAPIDEBUG === 'YES') {
			sConfig.debug = { request: '*' };
		}
		debug(JSON.stringify(sConfig, null,4));
		if (https === 'TRUE') {
			sConfig.tls = getCertificates();
			debug('Setup of SSL certificates completed');
		} else {
			debug('Running with no SSL certificates');
		}
		if (asset !== null) {
			sConfig.routes.files= { relativeTo: asset };
		}

		debug2(
			`Application information: 
		APPLOC  : ${process.env.APPLOC}
		APPENTRY: ${process.env.APPENTRY}
`
		);

		let hapiServer = Hapi.server(sConfig);

		/*
		const cache = hapiServer.cache({ segment: 'sid', expiresIn: 3 * 24 * 60 * 60 * 1000 });
		hapiServer.app.cache = cache;
*/
		
		let nodeCacheOptions = {
			stdTTL        : 24*60*60*1000, 
			checkPeriod   : 3600,
			errorOnMissing: true,
			useClones     : false,
			deleteOnExpire: true,
		};
		let storeCache = new NodeCache(nodeCacheOptions);
		hapiServer.app.cache = storeCache;
		

		// common plugins
		let visionOptions = {
			engines   : { html: require('handlebars') },
			relativeTo: __dirname,
			path      : '.',
		};
		await hapiServer.register(Vision);
		hapiServer.views(visionOptions);
		await hapiServer.register(inert);
		if (https === 'TRUE') {
			await hapiServer.register({ plugin: require('hapi-require-https'), options: {} });
		}
		// register H202 for proxy handling
		await hapiServer.register(H202);

		
		// setup authentication related plugins
		
		let options = {
			serverMode    : serverMode,
			authFlow      : process.env.AUTHFLOW,
			host          : process.env.VIYA_SERVER,
			isSameSite    : isSameSite,
			isSecure      : isSecure,
			ns            : (allAppEnv.LOGONPAYLOAD != null) ? allAppEnv.LOGONPAYLOAD.ns : null,
			nsHost        : (allAppEnv.LOGONPAYLOAD != null) ? allAppEnv.LOGONPAYLOAD.nsHost : null,
			redirect      : process.env.REDIRECT,
			clientId      : process.env.CLIENTID,
			clientSecret  : process.env.CLIENTSECRET,
			redirectTo    : `/${process.env.APPNAME}/logon`,
			allAppEnv     : allAppEnv,
			useHapiCookie : true,
			appName       : process.env.APPNAME,
			appHost       : process.env.APPHOST,
			appPort       : process.env.APPPORT,
			userRouteTable: userRouteTable,
			useDefault    : useDefault, /* not used - left here for potential reuse */
			userCache      : userCache ||{},
			https         : https,
			authDefault   : false, /* set later in setDefaultRoutes */
            authLogon     : false  /* set later in setDefaultRoutes */

		};
		
		debug2('Options',options);
		if (process.env.AUTHFLOW != null) {
				await setupAuth(hapiServer, options);
				if (process.env.PREAUTH === 'YES') {
				console.log('Preauth enabled');
				hapiServer.ext('onPreAuth', (request, h) => {
					debugger;
					if (!request.auth.isAuthenticated && !request.path.startsWith(`/login`)) {
							const redirectTo = `${request.path}?${new URLSearchParams(request.query).toString()}`;
							console.log('Redirect to login', {redirectTo});
							debugger;
							return h.redirect(`/login`).takeover();
					}
					return h.continue;
				});
			}
		}

		
		//
		// Start server
		//
		// eslint-disable-next-line no-unused-vars
		let allRoutes = hapiServer.table();
		await hapiServer.start();
		let hh = hapiServer.info.uri;
		hh = hh.replace(/0.0.0.0/, 'localhost');
		console.log('====================================================================================');
		console.log('Server Start Time: ', Date());
		let msg =
			options.serverMode === 'app'
				? `Visit ${hh}/${process.env.APPNAME} to access application`
				: `Visit ${hh}/${process.env.APPNAME}/api to access swagger`;
		console.log('\x1b[1m%s\x1b[0m',msg);
		console.log('NOTE: If running in container use the exported port');
		process.env.APPSERVER = `${hh}/${process.env.APPNAME}`;
		process.env.HEALTH = 'true';
		console.log('====================================================================================');
		return `${hh}/${process.env.APPNAME}`
	};

	process.on('unhandledRejection', (err) => {
		console.log(err);
		process.exit(1);
	});
	try {
      let r = await init();
	  return r;
	}
	catch(err){

		console.log('Error starting server', err);
		return false;
	};
}

function getCertificates () {
	let tlsdir = process.env.SSLCERT;
    let options = readCerts(tlsdir);
	if (options === null){
		console.log('No SSL certificates found, generating self-signed certificates');
		options = getTls();
		options.rejectUnauthorized= false;
	}
	return options;
}

function getTls () {
	let options = {
		keySize          : 2048,
		days             : 360,
		algorithm        : "sha256",
		clientCertificate: true,
		extensions       : {}, 
	};
	let subjt = process.env.TLS_CREATE.replaceAll('"', '').trim();
	let subj  = subjt.split(',');
	
	let d = {};
	subj.map(c => {
		let r = c.split(':');
		d[ r[ 0 ] ] = r[ 1 ];
		return {  value: r[ 1 ] };
	});

	//  TLS_CREATE=C:US,ST:NC,L:Cary,O:SAS Institute,OU:STO,CN:localhost,ALT:na.sas.com
	let attr = [
		{
			name : 'commonName',
			value: d.CN /*process.env.APPHOST*/,
		},
		{
			name : 'countryName',
			value: d.C
		}, {
			shortName: 'ST',
			value    : d.ST
		}, {
			name : 'localityName',
			value: d.L,
		}, {
			name : 'organizationName',
			value: d.O
		},
		{
			shortName: 'OU',
			value    : d.OU
		}
	];

	options.extensions.altNames = [
		//	{ type: 6, value: `http://${process.env.APPHOST}:${process.env.APPPORT}/${process.env.APPNAME}` },
		{ type: 6, value: `https://${process.env.APPHOST}:${process.env.APPPORT}/${process.env.APPNAME}` },
		{ type: 6, value: `https://${process.env.APPHOST}:${process.env.APPPORT}/${process.env.APPNAME}/api` },
		{ type: 6, value: `https://${process.env.APPHOST}:${process.env.APPPORT}/${process.env.APPNAME}/logon` },
		{ type: 6, value: `https://${process.env.APPHOST}/${process.env.APPNAME}` },
		{ type: 6, value: `https://${process.env.APPHOST}/${process.env.APPNAME}/api` },
		{ type: 6, value: `https://${process.env.APPHOST}/${process.env.APPNAME}/logon` },
	];
	debug('tls options ', JSON.stringify(options, null,4));
	let pems = selfsigned.generate(attr, options);
	let tls = {
		cert: pems.cert,
		key : pems.private
	};
	return tls;


}
export default iService;
