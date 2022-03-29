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
let debug = require('debug')('iservice');
// let isDocker = require('is-docker');
let Hapi = require('@hapi/hapi');
// const { isSameSiteNoneCompatible } = require('should-send-same-site-none');
let NodeCache = require("node-cache-promise");
let Vision = require('@hapi/vision');
let inert = require('@hapi/inert');
// let HapiSwagger = require('hapi-swagger');
let selfsigned = require('selfsigned');
import setupAuth from './plugins/setupAuth';

let os = require('os');

function iService (userRouteTable, useDefault, asset, allAppEnv, serverMode, userInfo) {
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
		let isSameSite = 'None';
		let isSecure = false;
		
		if (process.env.SAMESITE != null) {
			let [s1, s2] = process.env.SAMESITE.split(',');
			isSameSite = s1;
			isSecure = s2 === 'secure' ? true : false;
			if (process.env.HTTPS !== 'true') {
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
		if (process.env.HTTPS === 'true') {
			sConfig.tls = await getCertificates();
			debug('Setup of SSL certificates completed');
		} else {
			debug('Running with no SSL certificates');
		}
		if (asset !== null) {
			sConfig.routes.files= { relativeTo: asset };
		}

		debug(
			`Application information: 
		APPLOC  : ${process.env.APPLOC}
		APPENTRY: ${process.env.APPENTRY}
`
		);

		let hapiServer = Hapi.server(sConfig);

		/*
		const cache = hapiServer.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });
		hapiServer.app.cache = cache;
		*/

		let nodeCacheOptions = {
			stdTTL        : 36000,
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
		if (process.env.HTTPS === 'true') {
			await hapiServer.register({ plugin: require('hapi-require-https'), options: {} });
		}
		await hapiServer.register({
			plugin : require('hapi-pino'),
			options: {
				prettyPrint: process.env.NODE_ENV !== 'production',
				level      : process.env.LOGLEVEL == null ? 'silent' : process.env.LOGLEVEL,
			},
		});
		
		// setup authentication related plugins
		let options = {
			serverMode    : serverMode, /* api or app */
			authFlow      : process.env.AUTHFLOW,
			host          : process.env.VIYA_SERVER,
			isSameSite    : isSameSite,
			isSecure      : isSecure,
			ns            : (allAppEnv.LOGONPAYLOAD != null) ? allAppEnv.LOGONPAYLOAD.ns : null,
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
			userInfo      : userInfo,
			https         : process.env.HTTPS,
			authDefault   : false, /* set later in setDefaultRoutes */
            authLogon     : false  /* set later in setDefaultRoutes */

		};
		
		debug('Options',options);

		await setupAuth(hapiServer, options);
		hapiServer.log('Plugin', process.env.PLUGIN);
		if (process.env.PLUGIN === 'hapi-swagger' && serverMode === 'api') {
			let	swaggerOptions = {
				"info": {
					"title"      : `API for ${process.env.APPNAME}`,
					"version"    : "0.0.1",
					"description": "This document was auto-generated at run time"
				},
				"schemes"          : ["http", "https"],
				"cors"             : true,
				"debug"            : true,
				"jsonPath"         : `/${options.appName}/swagger.json`,
			    "jsonRoutePath"    : `/${options.appName}/swagger.json`,
			    "documentationPage": true,
	    		"documentationPath": `/${options.appName}/documentation`,
				"swaggerUI"        : true,
				"swaggerUIPath"    : `/${options.appName}/swaggerui`,
				auth               : options.authDefault
				};

			if (userInfo != null) {
		    	let override = userInfo(options, 'SWAGGEROPTIONS');
				swaggerOptions = {...swaggerOptions, ...override};
			}
			
			debug('Swagger Options:' ,swaggerOptions);
			await hapiServer.register({ plugin: require('hapi-swagger'), options: swaggerOptions });
		} else if (process.env.PLUGIN == 'hapi-openapi' && serverMode === 'api') {
			console.log('hapi-openapi', 'coming soon');
		} 

		//
		// Start server
		//
		let allRoutes = hapiServer.table();
		debug(allRoutes);
		await hapiServer.start();
		let hh = hapiServer.info.uri;
		hh = hh.replace(/0.0.0.0/, 'localhost');
		console.log('Server Start Time: ', Date());
		let msg =
			options.serverMode === 'app'
				? `Visit ${hh}/${process.env.APPNAME} to access application`
				: `Visit ${hh}/${process.env.APPNAME}/api to access swagger`;
		console.log(msg);
		console.log('NOTE: If running in container then use the port number you mapped to');
		process.env.APPSERVER = `${hh}/${process.env.APPNAME}`;
		process.env.HEALTH = 'true';
		console.log('Initialization completed ============================================================');
	};

	process.on('unhandledRejection', (err) => {
		console.log(err);
		process.exit(1);
	});
	init();
}

async function getCertificates () {

	let tls = {};
	if (process.env.TLS_CERT != null) {
		/* backward compatability */
		debug('TLS set: TLS_CERT');
		tls.cert = fs.readFileSync(process.env.TLS_CERT);
		tls.key = fs.readFileSync(process.env.TLS_KEY);
	} else if (process.env.TLS_PFX != null) {
		debug('TLS set: PFX');
		tls.pfx = fs.readFileSync(process.env.TLS_PFX);
		if (process.env.TLS_PW != null) {
			tls.passphrase = process.env.TLS_PW;
		}
	} else if (process.env.TLS_CRT != null) {
		/* new key names to conform to k8s*/
		debug('TLS set: TLS_CRT');
		tls.cert = process.env.TLS_CRT;
		tls.key = process.env.TLS_KEY;
	} else if (process.env.TLS_CREATE != null) {
		/* unsigned certificate */
		debug('TLS set: TLS_CREATE=', process.env.TLS_CREATE);
		tls = await getTls();
		debug(tls);
	}

	if (process.env.TLS_CABUNDLE != null) {
		tls.CA = fs.readFileSync(process.env.TLS_CABUNDLE);
	}

	if (Object.keys(tls).length > 0) {
		return tls;
	} else {
		debug('Warning: The current protocol is https: No TLS certificate information has been specified.');
		return tls;
	}
}

async function getTls () {
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
