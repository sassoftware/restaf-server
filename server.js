/*
 * Copyright © 2025, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
let core = require('./lib/index.js');
debugger;
let userCache = {};
core(getCustomHandler, true, 'app', null, userCache);
console.log('Finished cli setup', userCache);

function getCustomHandler() {
	let appName = `/${process.env.APPNAME}`; /* does not have to be this - your choice */
	debugger;
	let routes = [
		{
			method: ["GET"],
			path: "/help",
			options: {
				files: {
					relativeTo: "./public",
				},
				handler: async (req, h) => {
					debugger;
					let hf = 'help.html';
					return h.file(hf);
				},
				auth: false,
				description: "Help",
				notes: "Help",
				tags: ["app"],
			},
		},
		{
			method: ["GET"],
			path: `/new`,
			options: {
				files: {
					relativeTo: "./public",
				},
				handler: async (req, h) => {
					debugger;
					let r = await req.server.app.cache.get('session');
					console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>in new');
					console.log('credentials', req.pre.context);

					
					return h.file('index.html');	
				},
				auth: true,
				description: "Create new application",
				notes: "Index file created from env data",
				tags: ["app"],
			},
		}
	];
	return routes;
}


