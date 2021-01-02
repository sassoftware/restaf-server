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
let inert = require('@hapi/inert');
let vision = require('@hapi/vision');


let SASauth = require('./SASauth');
let appCookie = require('./appCookie');

async function setupAuth (server, options){
	
	let pluginSpec = {
		plugin : SASauth,
		options: options
	};
	await server.register(pluginSpec);

	if (options.useHapiCookie === true) {
		pluginSpec = {
			plugin : appCookie,
			options: options
		};
		await server.register(pluginSpec);
	} else {
		server.state('ocookie', {
			ttl         : null,
			isSecure    : options.isSecure,
			isHttpOnly  : true,
			encoding    : 'base64json',
			clearInvalid: true,
			strictHeader: true,
		});
	}

	// custom cookie management
	
	server.auth.default((options.useHapiCookie === true) ? 'session' : 'sas');

	
};

export default setupAuth;