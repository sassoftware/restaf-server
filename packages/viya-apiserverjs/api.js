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
debugger;
rafserver.icli (getCustomHandler, null, customize);

function getCustomHandler () {
	let appName = `/${process.env.APPNAME}`; /* does not have to be this - your choice */
	let routes = [
		{
			method : ['GET'],
			path   : `${appName}/testget`,
			options: {
				handler: async (req,h) => { 
					debugger;
					console.log('++++++++++++++++++++++ in testroute');
					let context = req.pre.context;
					return context;
				},
				description: 'Test get Route',
				notes      : 'Echo context',
				tags       : ['api']
			}
		},
		{
			method : ['POST'],
			path   : `${appName}/testpost`,
			options: {
				handler: async (req,h) => { 
					debugger;
					console.log('-------------- in post');
					let context = req.pre.context;
					return context;
				},
				description: 'Create a dataset with specified nummber of columns and rows',
				notes      : 'Uses restaf',
				tags       : ['api'],
			}
		}
	];
    return routes;
} 
function customize (options, key){
    let info = {
		swaggerOptions: {
			"host"             : 'viyans.ingress-nginx.kdksecdb-m1.secdb.sashq-d.openstack.sas.com',
			"documentationPage": true,
			"documentationPath": `/${process.env.APPNAME}/documentation`,
			"swaggerUI"        : true,
		    "swaggerUIPath"    : `/${process.env.APPNAME}/swaggerui`
			}
	};
    return info[key];
}


	



