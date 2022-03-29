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

import { getApp, getApp2,  appCallback, favicon, keepAlive, keepAlive2,logout, logon, setupUserRoutes, reactDev} from '../handlers';

module.exports = function setDefaultRoutes (server, options) {

	let appName = '/' + options.appName;
	let authDefault = false;
	let authLogon = false;
	if (options.authFlow === 'server') {
		authDefault = (options.serverMode === 'app') ? false : {
			strategies: ['token', 'session'],
			mode      : 'required'
		};
		
	    authLogon = {
			mode    : 'required',
			strategy: 'sas',
		};
	}
	let getAppb = getApp.bind(null, (process.env.USETOKEN === 'YES' ? options : null));

	server.log('Default strategy', authDefault);
	server.log('Logon strategy', authLogon); 
	options.authDefault = authDefault;
    options.authLogon   = authLogon;

	let uTable = (options.userRouteTable !== null) ? setupUserRoutes(options.userRouteTable, authDefault) : null;
	
	let defaultTable = [
		{
			method : ['GET'],
			path   : `/health`,
			options: {
				auth   : false,
				handler: async (req, h) => {
					return h.response({x: 1}).code(200);
				},
			},
		},
		{
			method : ['GET'],
			path   : `${appName}`,
			options: {
				auth   : options.serverMode === 'app' ? authLogon : authDefault,
				handler: getAppb,
			},
		},
		{
			method : ['GET'],
			path   : `${appName}/api`,
			options: {
				auth   : authDefault,
				handler: async (req, h) => {
					return h.redirect(`${appName}/documentation`);
				},
			},
		}, 
		{
			method : ['GET'],
			path   : `/develop`,
			options: {
				auth   : false,
				cors   : true,
				handler: reactDev,
			},
		},
		{
			method : ['GET'],
			path   : `${appName}/logon`,
			options: {
				auth   : authLogon,
				//https://futurestud.io/tutorials/hapi-redirect-to-previous-page-after-login
				plugins: {
					'hapi-auth-cookie': { redirectTo: false },
				},
				handler: logon,
			},
		},
		{
			method : ['GET'],
			path   : `${appName}/callback`,
			options: {
				auth   : authDefault,
				handler: appCallback,
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
			method: ['GET', 'POST'],
			path  : `${appName}/keepAlive`,

			options: {
				auth   : authDefault,
				handler: keepAlive,
			},
		},
		{
			method : ['GET'],
			path   : `${appName}/appenv`,
			options: {
				auth   : /*authDefault*/ false,
				handler: (req, h) => {
					let allAppEnv = options.allAppEnv;
					if (options.userInfo != null) {
						allAppEnv.APPENV = options.userInfo('APPENV', options);
					}
					allAppEnv.credentials = options.credentials;

					let s =
						`let LOGONPAYLOAD = ${JSON.stringify(allAppEnv.LOGONPAYLOAD)};` +
						`let APPENV = ${JSON.stringify(allAppEnv.APPENV)};`;
					return s;
				},
			},
		},
		{
			method : ['GET'] /* nedd this when running under dev mode in react apps */,
			path   : `/appenv`,
			options: {
				auth   : /*authDefault*/ false,
				handler: (req, h) => {
					let allAppEnv = options.allAppEnv;
					if (options.userInfo != null) {
						allAppEnv.APPENV = options.userInfo('APPENV', options);
					}

					let s =
						`let LOGONPAYLOAD = ${JSON.stringify(allAppEnv.LOGONPAYLOAD)};` +
						`let APPENV = ${JSON.stringify(allAppEnv.APPENV)};`;
					return s;
				},
			},
		},
		{
			method: ['GET'],
			path  : `${appName}/{param*}`,

			options: {
				auth   : authDefault,
				handler: getApp2,
			},
		},
		{
			method: ['GET'],
			path  : `/{param*}`,

			options: {
				auth   : authDefault,
				handler: getApp2,
			},
		},
		{
			method : ['GET'],
			path   : `/favicon.ico`,
			options: {
				auth   : false,
				handler: favicon,
			},
		},
		{
			method : ['GET', 'POST'],
			path   : `${appName}/keepAlive2`,
			options: {
				auth   : authDefault,
				handler: keepAlive2,
			},
		},
	];

	let routeTables = (uTable !== null) ? defaultTable.concat(uTable) : defaultTable;
	/*
	server.log('routes', routeTables);
	console.table(routeTables);
	*/
	server.route(routeTables);
};
