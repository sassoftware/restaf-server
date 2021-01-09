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

import { getApp, keepAlive, keepAlive2,logout, logon, setupUserRoutes} from '../handlers';

module.exports = function setHandlers (server, options) {

	let appName = '/' + options.appName;
	let authDefault = {
		strategies: ['token', 'session'],
		mode      : 'required'
	};
	let authLogon = {
			mode    : 'required',
			strategy: 'sas',
		};


	let uTable = setupUserRoutes(options.userRouteTable, authDefault);
	
	let defaultTable = [
		{
			method : ['GET'],
			path   : `${appName}`,
			options: {
				auth   : authDefault,
				handler: getApp
			},
		},
		{
			method : ['GET'],
			path   : `${appName}/api`,
			options: {
				auth   : authDefault,
				handler: async (req, h) => {
					console.log('Logon Successful');
					return h.redirect('/documentation');
				},
			},
		},
		{
			method : ['GET'],
			path   : `${appName}/logon`,
			options: {
				auth   : authLogon,
				handler: async (req, h) => {
					return logon(req, h);
				},
			},
		},
		{
			method : ['GET'],
			path   : `${appName}/logout`,
			options: {
				auth   : authDefault,
				handler: logout,
			},
		},
		{
			method : ['GET', 'POST'],
			path   : `${appName}/keepAlive`,
			options: {
				auth   : authDefault,
				handler: keepAlive,
			},
		},
		{
			method : ['GET', 'POST'],
			path   : `${appName}/keepAlive2`,
			options: {
				auth   : authDefault,
				handler: keepAlive2,
			},
		}
	];

	let routeTables = [...defaultTable, ...uTable];
	console.table(routeTables);
	server.route(routeTables);
};
