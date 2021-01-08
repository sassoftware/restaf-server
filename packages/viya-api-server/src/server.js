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

'use strict';

// import { all } from 'core-js/fn/promise';

// proxy server

let fs = require('fs');
// let isDocker = require('is-docker');
let Hapi = require('@hapi/hapi');
const { isSameSiteNoneCompatible } = require('should-send-same-site-none');
let NodeCache = require("node-cache-promise");
let Vision = require('@hapi/vision');
let inert = require('@hapi/inert');
let HapiSwagger = require('hapi-swagger');
let debug = require('debug')('server');
let selfsigned = require('selfsigned');
import setupAuth from  './plugins/setupAuth';

function server (routeTable, asset, allAppEnv) {
	// process.env.APPHOST_ADDR = process.env.APPHOST;

	let defaultMaxBytes = 10485760;
	let maxBytes;
	if (isNaN(process.env.PAYLOADMAXBYTES)) {
		maxBytes = defaultMaxBytes;
	} else {
		maxBytes = Number(process.env.PAYLOADMAXBYTES);
	}
	console.log(setupAuth);
	let isSameSite = 'None';
	let isSecure = false;

	if (process.env.SAMESITE != null) {
		console.log(process.env.SAMESITE);
		let [s1, s2] = process.env.SAMESITE.split(',');
		isSameSite = s1;
		isSecure = s2 === 'secure' ? true : false;
	}

	let sConfig = {
		port: process.env.APPPORT,
		host: process.env.APPHOST,

		state: {
			isSameSite: isSameSite,
			isSecure  : isSecure,

			contextualize: async (definition, request) => {
				const userAgent = request.headers['user-agent'] || false;
				if (userAgent && isSameSiteNoneCompatible(userAgent)) {
					definition.isSecure = isSecure;
					definition.isSameSite = isSameSite;
				}
				request.response.vary('User-Agent');
			},
		},
		/* debug   : {request: ['*']},*/

		routes: {
			cors: {
				origin     : ['*'],
				credentials: true,

				additionalHeaders       : ['multipart/form-data', 'content-disposition'],
				additionalExposedHeaders: ['location'],
			},
		},
	};

	let tls = {};

	if (process.env.HTTPS === 'YES') {
		console.log('TLS_CREATE ', process.env.TLS_CREATE);
		if (process.env.TLS_CREATE != null) {
			let options = {
				keySize  : 2048,
				days     : 360,
				algorithm: "sha256",

				clientCertificate: true
			};

			let subj = process.env.TLS_CREATE.split(',');
			let attr = subj.map(c => {
				let r = c.split(':');
				return { name: r[ 0 ], value: r[ 1 ] };
			});
			debug(attr);
			let pems = selfsigned.generate(null, options);
			tls.cert = pems.cert;
			tls.key = pems.private;
			debug(tls);

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
	
	debug(sConfig);

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
		deleteOnExpire: true
   };
	let storeCache = new NodeCache(nodeCacheOptions);
	hapiServer.app.cache = storeCache;

	
	
	const init = async () => {
		// common plugins
		let visionOptions = {
			engines   : { html: require('handlebars')},
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
			  level      : (process.env.PINOLEVEL == null) ? 'silent' : process.env.PINOLEVEL
			}
		  });

		// setup authentication related plugins

		if (process.env.AUTHFLOW === 'authorization_code' || process.env.AUTHFLOW === 'code') {
			let options = {
				host         : process.env.VIYA_SERVER,
				isSameSite   : isSameSite,
				isSecure     : isSecure,
				redirect     : process.env.REDIRECT,
				clientId     : process.env.CLIENTID,
				clientSecret : process.env.CLIENTSECRET,
				redirectTo   : `/${process.env.APPNAME}/logon`,
				allAppEnv    : allAppEnv,
				useHapiCookie: true,
				serverMode   : process.env.serverMode
			};
		await setupAuth(hapiServer, options);
		}

		if (process.env.SWAGGER != null) {
			let swaggerOptions = {
				info: {
					title      : `API for ${process.env.APPNAME}`,
					description: 'This document was auto-generated at run time'
				},
				auth: 'session'
			};
			console.log(process.env.SWAGGER);
			let js = fs.readFileSync(process.env.SWAGGER, 'utf8');
			swaggerOptions = JSON.parse(js);
			console.log(swaggerOptions);
			
			await hapiServer.register({plugin: HapiSwagger, options: swaggerOptions});
		}
		// setup displaying errors caught during a run

		/*
	    const preResponse = async (req, h) => {
			
			if (req.response.isBoom === true) {
				console.log(Date(), req.response.output.statusCode);
				debug(req);
				let output = (req.response.output.payload != null) ? JSON.stringify(req.response.output.payload, null,4) : ' ';
				return h.view('visionIndex', { title: req.response.output.payload.custom, message: output});
			} else {
				return h.continue;
			}
		};
		hapiServer.ext('onPreResponse', preResponse);
		*/

		// Finally setup routes and start server

		// temp:
		// hapiServer.log(['test', 'error'], 'Test event');

		hapiServer.route(routeTable);
		await hapiServer.start();
		let hh = hapiServer.info.uri.replace(/0.0.0.0/, 'localhost');
		console.log('Start Time: ', Date());
		console.log(`Visit ${hh}/${process.env.APPNAME}/api to access swagger`);
		process.env.APPSERVER = `${hh}/${process.env.APPNAME}`;
	};

	process.on('unhandledRejection', (err) => {
		console.log(err);
		process.exit(1);
	});
	debug(process.env.DEBUG);
	init();
}

export default server;
