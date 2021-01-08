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
import server from './server';
import { getApp, keepAlive, keepAlive2,appCallback, logout, logon, getUser, setupUserRoutes} from './handlers';
let os = require('os');
let debug = require('debug')('appenv');

function iService (uTablep, useDefault, asset, allAppEnv, swaggerOptions) {

	process.env.APPHOST = process.env.APPHOST === '*' ? os.hostname() : process.env.APPHOST;
	
	let appName = '/' + process.env.APPNAME;
	
	
	let authDefault = {
		strategies: ['token', 'session'],
		mode      : 'required'
	};
	let authLogon = {
			mode    : 'required',
			strategy: 'sas',
		};

	
	let getAppEnv = async (req, h) => {
		debug(allAppEnv);
		return allAppEnv;
	};

	// see if appenv was overridden

	let uTable = setupUserRoutes (uTablep, authDefault);

	let hasAppEnv = null;
	if (uTable !== null) {
		hasAppEnv = uTable.find((u) => u.path === '/appenv');
	}

	// end temp patch

	//
	// TBD: Move route definition into the plugin
	//
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
			path   : `${appName}/appenv`,
			options: {
				auth   : authDefault,
				handler: getAppEnv
			},
		},
		{
			method : ['GET'],
			path   : `/appenv`,
			options: {
				auth   : authDefault,
				handler: getAppEnv,
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
			path   : `${appName}/{param*}`,
			options: {
				auth   : authDefault,
				handler: getApp2,
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
		},
		{
			method : ['GET', 'POST'],
			path   : `/{param*}`,
			options: {
				auth   : authDefault,
				handler: getApp2,
			},
		},
		{
			method : ['GET'],
			path   : `${appName}/user`,
			options: {
				auth   : authDefault,
				handler: getUser,
			},
		},
	];

	let userRouterTable;
	if (uTable !== null) {
		if (useDefault === true) {
			userRouterTable = [...defaultTable, ...uTable];
		} else {
			userRouterTable = [...uTable];
		}
	} else {
		userRouterTable = [...defaultTable];
	}
	console.table(userRouterTable);
	
	server(userRouterTable, asset, allAppEnv, swaggerOptions);
}

//
// get app server files - too small
//


async function getIcon (req, h) {
	return h.file('favicon.ico');
}

async function getApp2 (req, h) {
	return h.file(`${req.params.param}`);
}

export default iService;
