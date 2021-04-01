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

let handlers = require('./handlers');
let Joi = require('joi');

module.exports = function api () {
	let appName = `/${process.env.APPNAME}`; /* does not have to be this - your choice */
	let routes = [
		{
			method : ['GET'],
			path   : `${appName}/testroute`,
			options: {
				handler: async (req, h) => {
					let context = req.pre.context;
					return context;
				},
				description: 'Test Route',
				notes      : 'Echo context',
				tags       : ['api'],
			},
		},
		{
			method : ['GET'],
			path   : `${appName}/simpleExample`,
			options: {
				handler    : handlers.simpleExample,
				description: 'Simple Example returning list of files',
				notes      : 'Uses axios to get a list of files from Viya file service',
				tags       : ['api'],
			},
		},
		{
			method : ['POST'],
			path   : `${appName}/compute/{param*}`,
			options: {
				handler    : handlers.compute,
				description: 'Route to run a simple compute job',
				notes      : 'Uses compute service',
				tags       : ['api'],

				validate: {
					payload: Joi.object({
						input: Joi.object().description('your macros as an object'),
						code : Joi.string().description('your sas program'),
					}),
				},
			},
		},
		{
			method : ['POST'],
			path   : `${appName}/coolStuff`,
			options: {
				handler    : handlers.coolStuff,
				description: 'Run a specific saved program',
				notes      : 'This creates a data set with the numbre of cols specfied in the input',
				tags       : ['api'],

				validate: {
					payload: Joi.object({
						input: Joi.object({
							cols: Joi.number().default(10).min(5).max(20),
						}).description('specify cols'),
						output: Joi.string()
							.lowercase()
							.valid('log', 'list', 'ods')
							.lowercase().description('return log, listing or ods'),
					}),
				},
			},
		},
		{
			method : ['POST'],
			path   : `${appName}/casAction`,
			options: {
				handler    : handlers.casAction,
				description: 'Route to run any cas action',
				notes      : 'This can be used to execute any cas action',
				tags       : ['api'],

				validate: {
					payload: Joi.object({
						action: Joi.string().description('actionset.actionName'),
						data  : Joi.any().description('action parameters'),
					}),
				},
			},
		},
		{
			method : ['POST'],
			path   : `${appName}/casl`,
			options: {
				handler    : handlers.casl,
				description: 'Route a casl program',
				notes      : 'You can execute any casl program and return some json',
				tags       : ['api'],

				validate: {
					payload: Joi.object({
						input: Joi.object().description('input args'),
						code : Joi.string().description('the casl code'),
					}),
				},
			},
		},
		{
			method : ['POST'],
			path   : `${appName}/getData`,
			options: {
				handler    : handlers.getData,
				description: 'Get data from a cas table',
				notes      : 'This returns the first few values. ',
				tags       : ['api'],

				validate: {
					payload: Joi.object({
						input: Joi.object({
							caslib: Joi.string().description('caslib'),
							name  : Joi.string().description('table name')
						})
					})
				}
			}
		},
	];
	return routes;
};
