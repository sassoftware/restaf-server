/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
const rafServer = require('@sassoftware/viya-serverjs');
debugger;
rafServer.icli(null, getCustomHandlers, null);

function getCustomHandlers () {
	let appName = `/${process.env.APPNAME}`; /* does not have to be this - your choice */
	let routes = [
		{
			method : ['GET'],
			path   : `${appName}/testproxy/{*params}`,
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
			path   : `${appName}/testproxy/{*params}`,
			options: {
				handler: async (req,h) => { 
					debugger;
					console.log('++++++++++++++++++++++ in post');
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
// eslint-disable-next-line no-unused-vars
function customize (key, _options){
    debugger;
    let info = {
        SWAGGEROPTIONS: {},
        APPENV        : null
    };
    return info[key];  
}




