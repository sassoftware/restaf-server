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

import axios from 'axios';

// proxy server

let os = require('os');
let Hapi = require('@hapi/hapi'),
	h2o2 = require('@hapi/h2o2');

function iProxyServer () {

	//let host = (process.env.VHOST === '*') ? os.hostname() : process.env.VHOST;
	let sConfig = {
		port: process.env.APPPORT,
        host: process.env.APPHOST,
        
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


	let hapiServer = Hapi.server(sConfig);

	const init = async () => {
        await hapiServer.register([
            h2o2
			]);
    
		// let protocol = process.env.IAPPHOST.indexOf('https') !== -1 ? 'https' : 'http';
		let routes = [
			{
				method : '*',
				path   : '/{param*}',
				options: {
					handler: checkAuth
				}
			},
			{
				method : '*',
				path   : '/callback',
				options: {
					handler: callback
					}
			}
		];
		console.log(routes);
		hapiServer.route(routes);

		await hapiServer.start();

		console.log(`Visit ${hapiServer.info.uri}/documentation for documentation on the API`);
		let uri = hapiServer.info.uri;
		
		// Need to do this for docker deployment
		if (hapiServer.info.host === '0.0.0.0') {
			uri = `${hapiServer.info.protocol}://localhost:${hapiServer.info.port}`;
		}
		console.log(`To access application visit ${uri}/${process.env.APPNAME}`);

	};

	process.on('unhandledRejection', err => {
		console.log(err);
		console.log('unhandled exception');
		process.exit(2);
	});

	init();

	async function checkAuth (req,h) {
		
		let head = {...req.headers};
		if (head.cookie != null){
			delete head.cookie;
		}
		let resp = h.redirect(`${process.env.VIYA_SERVER}/SASLogon/oauth/authorize?client_id=${process.env.CLIENTID}&redirect_uri=http://localhost:3000/api/callback&response_type=code`);
		for (let k in head) {
			resp.header(k, head[k]);
		};
		return resp.code(302);
		/*
		let SASLogon = `${process.env.VIYA_SERVER}/SASLogon/oauth/authorize?client_id=${process.env.CLIENTID}&redirect_uri=http://localhost:3000/api/callback&response_type=code`;
		console.log(SASLogon);
		let p = {
			method : 'GET',
			url    : `${process.env.VIYA_SERVER}/SASLogon/oauth/authorize`,
			headers: head,

			withCredentials: true,

			qs: {
				client_id    : process.env.CLIENTID,
				response_type: 'code'
			}
		};

		let r = await axios (p);
		

		p = {
			method : 'POST',
			url    : `${process.env.VIYA_SERVER}/SASLogon/oauth/token`,
			headers: head,

			withCredentials: true
		};
		try {
			 let r2 = await axios(p);
			 console.log(r2);
			
		}
		catch(err){
			
			console.log(err);
		}
		*/
	
		//return h.redirect(SASLogon).code(302);
	}
	async function callback (req, h) {
		
		console.log(req.headers);
		
		return true;
	}

}
export default iProxyServer;
