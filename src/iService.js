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

function iService (uTablep, useDefault, asset, allAppEnv) {

	process.env.APPHOST = process.env.APPHOST === '*' ? os.hostname() : process.env.APPHOST;
	
	let appName = '/' + process.env.APPNAME;
	
	let auth1 = false;
	let auth2 = false;
	let authLogon = false;

	if (process.env.AUTHFLOW === 'authorization_code' || process.env.AUTHFLOW === 'code') {
		auth1 = {
			strategies: ['token', 'session'],
			mode      : 'required'
		};
		authLogon = {
			mode    : 'required',
			strategy: 'sas',
		};
		auth2 = false;
	} else {
		auth1 = false;
		auth2 = false;

	}
	let getAppEnv = async (req, h) => {
		debug(allAppEnv);
		return allAppEnv;
	};

	// see if appenv was overridden

	let uTable = setupUserRoutes (uTablep, auth1);

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
				auth   : auth1,
				handler: getApp
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
				auth   : auth1,
				handler: getAppEnv
			},
		},
		{
			method : ['GET'],
			path   : `/appenv`,
			options: {
				auth   : auth1,
				handler: getAppEnv,
			},
		},
		{
			method : ['GET'],
			path   : `${appName}/callback`,
			options: {
				auth   : auth1,
				handler: appCallback,
			},
		},
		{
			method : ['GET'],
			path   : `${appName}/{param*}`,
			options: {
				auth   : auth1,
				handler: getApp2,
			},
		},
		{
			method : ['GET'],
			path   : `${appName}/logout`,
			options: {
				auth   : auth1,
				handler: logout,
			},
		},
		{
			method : ['GET', 'POST'],
			path   : `${appName}/keepAlive`,
			options: {
				auth   : auth1,
				handler: keepAlive,
			},
		},
		{
			method : ['GET', 'POST'],
			path   : `${appName}/keepAlive2`,
			options: {
				auth   : auth1,
				handler: keepAlive2,
			},
		},
		{
			method : ['GET', 'POST'],
			path   : `/{param*}`,
			options: {
				auth   : auth1,
				handler: getApp2,
			},
		},
		{
			method : ['GET'],
			path   : `${appName}/user`,
			options: {
				auth   : auth1,
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
	
	server(userRouterTable, asset, allAppEnv);
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
