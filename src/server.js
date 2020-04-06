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
// proxy server

let fs = require('fs');
// let isDocker = require('is-docker');
let Hapi = require('@hapi/hapi');
const { isSameSiteNoneCompatible } = require('should-send-same-site-none');

function server (userRouterTable, asset, allAppEnv) {
    
	// process.env.APPHOST_ADDR = process.env.APPHOST;


	let isSameSite = 'None';
	let isSecure   = false;

	if (process.env.SAMESITE != null) {
		let [s1, s2] = process.env.SAMESITE.split(',');
		console.log(s1, s2);
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
				const userAgent = request.headers[ 'user-agent' ] || false;
				if (userAgent && isSameSiteNoneCompatible(userAgent)) {
					definition.isSecure = isSecure;
					definition.isSameSite = isSameSite;
				}
				request.response.vary('User-Agent');
			}
			
		},
		/* debug   : {request: ['*']},*/

		routes: {
			cors: {
				origin     : ['*'],
				credentials: true,

				additionalHeaders: [
					'multipart/form-data',
					'content-disposition'
				],
				additionalExposedHeaders: ['location']
			}
		}
	};

	if (process.env.TLS != null) {
		let inp = process.env.TLS.split(',');
		let tlsInfo = inp.filter(t => t.length > 0);
		//  console.log(tlsInfo);
		sConfig.tls = {
			key : fs.readFileSync(tlsInfo[ 1 ], 'UTF8'),
			cert: fs.readFileSync(tlsInfo[ 0 ]),

			passphrase: tlsInfo[ 2 ]
		};
	}

	if (asset !== null) {
		sConfig.routes.files = { relativeTo: asset };
	}
	console.log(sConfig);

	let hapiServer = Hapi.server(sConfig);
	


	const init = async () => {
		let pluginSpec = {
			plugin : require('./plugins/restafServer'),
			options: {
				routes: userRouterTable,
				appenv: allAppEnv,

				isSameSite: isSameSite,
				isSecure  : isSecure
			}
		};
		await hapiServer.register(pluginSpec);
		await hapiServer.start();
		let hh = hapiServer.info.uri.replace(/0.0.0.0/, 'localhost');
		console.log(
			`Visit ${hh}/${process.env.APPNAME}`
		);

	};

	process.on('unhandledRejection', err => {
		console.log(err);
		process.exit(1);
	});

	init();
}

export default server;
