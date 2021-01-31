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

// let isDocker = require('is-docker');
let Hapi = require('@hapi/hapi');
const { isSameSiteNoneCompatible } = require('should-send-same-site-none');
let NodeCache = require("node-cache-promise");
let Vision = require('@hapi/vision');
let inert = require('@hapi/inert');
let HapiSwagger = require('hapi-swagger');
let selfsigned = require('selfsigned');
import setupAuth from './plugins/setupAuth';

let os = require('os');

function iService (userRouteTable, useDefault, asset, allAppEnv, serverMode) {
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
			if (process.env.HTTPS !== 'YES') {
				isSecure = false;
			}
		}

		let sConfig = {
			port: process.env.APPPORT,
			host: process.env.APPHOST,

			state: {
				isSameSite: isSameSite,
				isSecure  : isSecure,
				/*
				contextualize: async (definition, request) => {
					const userAgent = request.headers['user-agent'] || false;
					if (userAgent && isSameSiteNoneCompatible(userAgent)) {
						definition.isSecure = isSecure;
						definition.isSameSite = isSameSite;
					}
					request.response.vary('User-Agent');
				},
				*/
			},
	

			routes: {
				payload: {
					maxBytes: maxBytes
				},
				cors: {
					origin     : ['*'],
					credentials: true,

					additionalHeaders       : ['multipart/form-data', 'content-disposition'],
					additionalExposedHeaders: ['location'],
				},
			},
		};
		if (process.env.HAPIDEBUG === 'YES') {
			sConfig.debug = { request: '*' };
		}
		let tls = {};

		if (process.env.HTTPS === 'YES') {
			if (process.env.TLS_CREATE != null) {
				tls = await getTls();
			}
			if (process.env.TLS_CERT != null) {
				tls.cert = fs.readFileSync(process.env.TLS_CERT);
			}

			if (process.env.TLS_CERT != null) {
				tls.key = fs.readFileSync(process.env.TLS_KEY);
			}

			if (process.env.TLS_CABUNDLE != null) {
				tls.CA = fs.readFileSync(process.env.TLS_CABUNDLE);
			}

			if (process.env.TLS_PFX != null) {
				tls.pfx = fs.readFileSync(process.env.TLS_PFX);
			}

			if (process.env.TLS_PW != null) {
				tls.passphrase = process.env.TLS_PW;
			}
			if (Object.keys(tls).length > 0) {
				sConfig.tls = tls;
			}
		}

		if (asset !== null) {
			sConfig.routes.files = { relativeTo: asset };
		}

		console.log(
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

		await hapiServer.register({ plugin: require('hapi-require-https'), options: {} });
		await hapiServer.register({
			plugin : require('hapi-pino'),
			options: {
				prettyPrint: process.env.NODE_ENV !== 'production',
				level      : process.env.LOGLEVEL == null ? 'silent' : process.env.LOGLEVEL,
			},
		});

		// setup authentication related plugins
		let options = {
			serverMode    : serverMode,
			authFlow      : process.env.AUTHFLOW,
			host          : process.env.VIYA_SERVER,
			isSameSite    : isSameSite,
			isSecure      : isSecure,
			redirect      : process.env.REDIRECT,
			clientId      : process.env.CLIENTID,
			clientSecret  : process.env.CLIENTSECRET,
			redirectTo    : `/${process.env.APPNAME}/logon`,
			allAppEnv     : allAppEnv,
			useHapiCookie : true,
			appName       : process.env.APPNAME,
			appHost       : process.env.APPHOST,
			userRouteTable: userRouteTable,
			useDefault    : useDefault, /* not used - left here for potential reuse */
			https         : process.env.HTTPS
		};
		hapiServer.log('Options',options);
		
		if (process.env.HTTPS === 'YES') {
			hapiServer.log('TLS_CREATE', process.env.TLS_CREATE);
			hapiServer.log('TLS', tls);
		};

		await setupAuth(hapiServer, options);
		hapiServer.log('Plugin', process.env.PLUGIN);
		if (process.env.PLUGIN === 'hapi-swagger' && serverMode === 'api') {
			let swaggerOptions = {
				info: {
					title      : `API for ${process.env.APPNAME}`,
					description: 'This document was auto-generated at run time',
				},
				auth: 'session',
			};
			let js = fs.readFileSync(process.env.SWAGGER, 'utf8');
			swaggerOptions = JSON.parse(js);
			hapiServer.log('hapi-swagger', swaggerOptions);
			await hapiServer.register({ plugin: HapiSwagger, options: swaggerOptions });
		} else if (process.env.PLUGIN == 'hapi-openapi' && serverMode === 'api') {
			console.log('hapi-openapi', 'coming soon');
		} 

		//
		// Start server
		//
		await hapiServer.start();
		let hh = hapiServer.info.uri.replace(/0.0.0.0/, 'localhost');
		console.log('Server Start Time: ', Date());
		let msg =
			options.serverMode === 'app'
				? `Visit ${hh}/${process.env.APPNAME} to access application`
				: `Visit ${hh}/${process.env.APPNAME}/api to access swagger`;
		console.log(msg);
		console.log('NOTE: If running in container then use the port number you mapped to');
		process.env.APPSERVER = `${hh}/${process.env.APPNAME}`;
	};

	process.on('unhandledRejection', (err) => {
		console.log(err);
		process.exit(1);
	});
	init();
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
			value: process.env.APPHOST,
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
		{ type: 6, value: `http://${process.env.APPHOST}:${process.env.APPPORT}/${process.env.APPNAME}` },
		{ type: 6, value: `https://${process.env.APPHOST}:${process.env.APPPORT}/${process.env.APPNAME}` },
		{ type: 6, value: `https://${process.env.APPHOST}:${process.env.APPPORT}/${process.env.APPNAME}/api` },
		{ type: 6, value: `https://${process.env.APPHOST}/${process.env.APPNAME}` },
		{ type: 6, value: `https://${process.env.APPHOST}/${process.env.APPNAME}/api` },
		{ type: 6, value: `https://${process.env.APPHOST}/${process.env.APPNAME}/logon` }
	];

	let pems = selfsigned.generate(attr, options);
	let tls = {
		cert: pems.cert,
		key : pems.private
	};
	return tls;


}
export default iService;