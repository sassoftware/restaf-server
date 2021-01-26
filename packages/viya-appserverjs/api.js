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

debugger;
let rafserver = require('./lib/index.js');
debugger;
rafserver.icli (getCustomHandler);

function getCustomHandler () {
	let appName = `/${process.env.APPNAME}`; /* does not have to be this - your choice */
	let routes = [
		{
			method : ['GET'],
			path   : `${appName}/testroute`,
			options: {
				handler: async (req,h) => { 
					let context = req.pre.context;
					console.log(context);
					return context;
				}
			}
		},
		{
			method : ['POST'],
			path   : `${appName}/compute`,
			options: {
				handler: async (req,h) => { 
					let context = req.pre.context;
					return context;
				}
			}
		},
		{
			method : ['POST'],
			path   : `${appName}/cas/{param*}`,
			options: {
				handler: async (req,h) => { 
					let context = req.pre.context;
					return context;
				}
			}
		}
	];
    return routes;
} 

	



