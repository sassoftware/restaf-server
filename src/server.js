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
let isDocker = require('is-docker');
let Hapi = require('@hapi/hapi'),
	inert = require('@hapi/inert'),
	//  WebpackPlugin = require('hapi-webpack-plugin'),/* for hot restart */
	hapiServer;
import SASauth from './SASauth';

function server (userRouterTable, asset, rootHandler) {
	process.env.APPHOST_ADDR = process.env.APPHOST;
	let tls = null;

	let sConfig = {
		port: process.env.APPPORT,
		host: process.env.APPHOST_ADDR,
		/* debug   : {request: ['*']},*/

		routes: {
			cors: {
				origin     : [ '*' ],
				credentials: true,

				additionalHeaders: [
					'multipart/form-data',
					'content-disposition'
				],
				additionalExposedHeaders: [ 'location' ]
			}
		}
	};

	/*
    console.log('--------------------------------------------');
    console.log(JSON.stringify(sConfig, null, 4));
    console.log('--------------------------------------------');
    */

	if (process.env.TLS != null) {
		let inp = process.env.TLS.split(' ');
		let tlsInfo = inp.filter(t => t.length > 0);
		//  console.log(tlsInfo);
		sConfig.tls = {
			key       : fs.readFileSync(tlsInfo[1]),
			cert      : fs.readFileSync(tlsInfo[0]),
			passphrase: tlsInfo[2]
		};
	}

	if (asset !== null) {
		sConfig.routes.files = { relativeTo: asset };
	}

	hapiServer = Hapi.server(sConfig);

	const init = async () => {

		if (process.env.OAUTH2 === 'YES') {   
     	   let info = await SASauth(hapiServer);
	    };
		await hapiServer.register(inert);
	
		hapiServer.route(userRouterTable);

		hapiServer.app.cache = hapiServer.cache({
			segment  : 'session',
			expiresIn: 14 * 24 * 60 * 60 * 1000
		});

		await hapiServer.start();

		if (isDocker() === true) {
			console.log('Application is now running in docker');
		}
		
		console.log(
			`To access application visit ${hapiServer.info.uri}/${process.env.APPNAME}`
		);
			
	};

	process.on('unhandledRejection', err => {
		console.log(err);
		process.exit(1);
	});

	init();
}
export default server;
