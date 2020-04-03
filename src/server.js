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

function server (userRouterTable, asset, allAppEnv) {
	process.env.APPHOST_ADDR = process.env.APPHOST;

	let sConfig = {
		port: process.env.APPPORT,
		host: process.env.APPHOST_ADDR,
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
		let inp = process.env.TLS.split(' ');
		let tlsInfo = inp.filter(t => t.length > 0);
		//  console.log(tlsInfo);
		sConfig.tls = {
			key : fs.readFileSync(tlsInfo[ 1 ]),
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
				appenv: allAppEnv
			}
		};
		await hapiServer.register(pluginSpec);
		await hapiServer.start();
		console.log(
			`Visit ${hapiServer.info.uri}/${process.env.APPNAME}`
		);

	};

	process.on('unhandledRejection', err => {
		console.log(err);
		process.exit(1);
	});

	init();
}

export default server;
