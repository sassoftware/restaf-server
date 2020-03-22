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
let Hapi = require('@hapi/hapi'),
	inert = require('@hapi/inert'),
	vision = require('@hapi/vision'),
	HapiSwagger = require('hapi-swagger'),
	//  WebpackPlugin = require('hapi-webpack-plugin'),/* for hot restart */
	hapiServer;
import SASauth from './SASauth';

function appServerV (userRouterTable, asset, rootHandler) {
	process.env.APPHOST_ADDR = process.env.APPHOST;
	let tls = null;

	let sConfig = {
		
		port: process.env.APPPORT,
		host: process.env.APPHOST,

		/* debug   : {request: ['*']},
		*/
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
			key       : fs.readFileSync(tlsInfo[1]),
			cert      : fs.readFileSync(tlsInfo[0]),
			passphrase: tlsInfo[2]
		};
	}

	let fullpath = require('path').resolve(asset);
	console.log(fullpath);

	if (asset !== null) {
		sConfig.routes.files = { relativeTo: asset };
	}
	console.log(sConfig);

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
	

		let plugin = {
			plugin: {
				name    : 'main',
				version : '1.0.0',
				register: pluginRegister
			},
			options: {
				routes: userRouterTable
			}

		};

		await hapiServer.register(plugin, { routes: { vhost: process.env.VHOST } });

		// eslint-disable-next-line require-atomic-updates
		hapiServer.app.cache = hapiServer.cache({
			segment  : 'session',
			expiresIn: 14 * 24 * 60 * 60 * 1000
		});

		await hapiServer.start();
		console.log(`http://${process.env.VHOST}/${process.env.APPNAME}`);

	};

	process.on('unhandledRejection', err => {
		console.log(err);
		process.exit(1);
	});

	init();
}

async function pluginRegister (server, options) {
	console.log('in plugin');
	console.log(options);
	server.route(options.routes);
}
export default appServerV;
