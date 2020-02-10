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
	vision = require('@hapi/vision'),
	HapiSwagger = require('hapi-swagger'),
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

		if (process.env.AUTHFLOW === 'authorization_code' || process.env.AUTHFLOW === 'code') {   
     	   let info = await SASauth(hapiServer);
		};
		
		let swaggerOptions = {
			info: {
				title  : `API Documentation for ${process.env.APPNAME}`,
				version: (process.env.APPVERSION == null) ? '1.0.0' : process.env.APPVERSION
			},
			grouping: 'tags'
		};

		await hapiServer.register([
			 inert, 
			 vision,
			 {
				 plugin : HapiSwagger,
				 options: swaggerOptions
			 }
			]);
	
		hapiServer.route(userRouterTable);

		// eslint-disable-next-line require-atomic-updates
		hapiServer.app.cache = hapiServer.cache({
			segment  : 'session',
			expiresIn: 14 * 24 * 60 * 60 * 1000
		});

		await hapiServer.start();

		console.log(`Visit ${hapiServer.info.uri}/documentation for documentation on the API`);
		
		if (process.env.AUTHFLOW === 'implicit') {
			console.log(`To logon to the application visit ${hapiServer.info.uri}/${process.env.APPNAME}`);
		} else {
		   console.log(`To access application visit ${hapiServer.info.uri}/${process.env.APPNAME}`);
		};
		if (isDocker() === true) {
			console.log ( 
				`
			   Application is running in Docker
				  Use the exposed port ${process.env.EXPOSEDPORT}`
			);
		}
	};

	process.on('unhandledRejection', err => {
		console.log(err);
		process.exit(1);
	});

	init();
}
export default server;
