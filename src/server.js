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

import Boom from '@hapi/boom';

// proxy server

let fs = require('fs');
// let isDocker = require('is-docker');
let Hapi = require('@hapi/hapi');
const { isSameSiteNoneCompatible } = require('should-send-same-site-none');
let Vision = require('@hapi/vision');
let debug = require('debug')('server');
let selfsigned = require('selfsigned');


function server (userRouterTable, asset, allAppEnv) {
	// process.env.APPHOST_ADDR = process.env.APPHOST;

	let isSameSite = 'None';
	let isSecure = false;

	if (process.env.SAMESITE != null) {
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
	
	hapiServer.state =
		('ocookie',
		{
			ttl     : null,
	    	encoding: 'base64json',
			isSecure: isSecure
		});

	//https://hapi.dev/api/?v=19.2.0#request.preResponses

	const preResponse = async (req, h) => {
		if (req.response.isBoom === true) {
			console.log(req.response.output.statusCode);
			return h.view('visionIndex', { title: req.response.output.payload.custom, message: JSON.stringify(req.response.output.payload, null,4) });
		} else {
			return h.continue;
		}
	};

	const init = async () => {
		let pluginSpec = {
			plugin : require('./plugins/restafServer'),
			options: {
				routes: userRouterTable,
				appenv: allAppEnv,

				isSameSite: isSameSite,
				isSecure  : isSecure,
			},
		};
		
		let visionOptions = {
			engines   : { html: require('handlebars')},
			relativeTo: __dirname,
			path      : '.',
		};
		await hapiServer.register(Vision);
		hapiServer.views(visionOptions);

		hapiServer.ext('onPreResponse', preResponse);

		await hapiServer.register(pluginSpec);
		await hapiServer.register({ plugin: require('hapi-require-https'), options: {} });
		await hapiServer.start();
		let hh = hapiServer.info.uri.replace(/0.0.0.0/, 'localhost');
		console.log('Start Time: ', Date());
		console.log(`Visit ${hh}/${process.env.APPNAME}`);
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
