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

import SASAuth from './SASauth.js';
import appCookie from './appCookie.js';
let setDefaultRoutes = require('./setDefaultRoutes');
let debug	 = require('debug')('auth');


/** Notes:
 * If api then register sasAuth and token - no cookies
 * If app, then register sasAuth and cookie(session) but no token 
 */
async function setupAuth (server, options){
	
	// register cookie and bell
	await server.register(require('@hapi/cookie'));
	await server.register(require('@hapi/bell'));

	await appCookie(server, options);
	await SASAuth(server, options);

	// setup default routes now that we have auth strategies
	setDefaultRoutes(server, options);
	return true;
};

export default setupAuth;