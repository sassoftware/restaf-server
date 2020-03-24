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
let inert = require('@hapi/inert'),
	vision = require('@hapi/vision');
	//  WebpackPlugin = require('hapi-webpack-plugin'),/* for hot restart */


exports.plugin = {
	name    : 'restafServer',
	version : '1.0.0',
	register: appServer
};

async function appServer (server, options) {
	let {routes} = options; 
	process.env.APPHOST_ADDR = process.env.APPHOST;
	if (process.env.AUTHFLOW === 'authorization_code' ||
		process.env.AUTHFLOW === 'code') {
		await server.register(require('./SASauth'));
	}

	await server.register([
		inert,
		vision,
	]);

	server.route(routes);

	// eslint-disable-next-line require-atomic-updates
	server.app.cache = server.cache({
		segment  : 'session',
		expiresIn: 14 * 24 * 60 * 60 * 1000
	});
};

