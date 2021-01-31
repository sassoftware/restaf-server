#!/usr/bin/env node
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


let rafserver = require('./lib/index.js');

rafserver.icli (getCustomHandler);

function getCustomHandler () {
	let appName = `/${process.env.APPNAME}`; /* does not have to be this - your choice */
	let routes = [
		{
			method : ['GET'],
			path   : `${appName}/testroute`,
			options: {
				auth   : true,
				handler: async (req,h) => { 
					let context = req.pre.context;
					return context;
				},
				description: 'Test Route',
				notes      : 'Echo context',
				tags       : ['api']
			}
		},
		{
			method : ['POST'],
			path   : `${appName}/compute`,
			options: {
				auth   : true,
				handler: async (req,h) => { 
					let context = req.pre.context;
					return context;
				},
				description: 'Create a dataset with specified nummber of columns and rows',
				notes      : 'Uses restaf',
				tags       : ['api'],
			}
		},
		{
			method : ['POST'],
			path   : `${appName}/cas/{param*}`,
			options: {
				auth   : false,
				handler: async (req,h) => { 
					let context = req.pre.context;
					return context;
				},
				description: 'Route to run a simple cas action',
				notes      : 'Uses restaf',
				tags       : ['api']		
			}
		}
	];
    return routes;
} 

	



