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

let SASauth          = require('./SASauth');
let appCookie        = require('./appCookie');
let token            = require('./token');
let setDefaultRoutes = require('./setDefaultRoutes');

/** Notes:
 * I api then register sasAuth and token - no cookies
 * If app, then register sasAuth and cookie(session) but no token 
 */
async function setupAuth (server, options){
	
	if (options.authFlow === 'server') {
		await server.register({plugin: SASauth,   options: options});
		// await server.register({plugin: appCookie, options: options});
		await appCookie(server,options);

		let def = 'session';
		if (options.serverMode === 'api') {
			await server.register({ plugin: token });
			def = 'token';
		}
		server.log('***********************Default auth', def);
		server.auth.default(def);
		// console.log(server.registerations);
	}
	setDefaultRoutes(server, options);
};

export default setupAuth;