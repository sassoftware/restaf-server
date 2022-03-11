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

let fs = require('fs');
import parseDocker from './parseDocker';
import debug from 'debug';
let configDebug = debug('config');

function config (appEnv, dockerFile) {
	
	
	if (dockerFile !=null) {
		parseDocker(dockerFile);
	}

	if (appEnv != null) {
		iconfig(appEnv);
	}
	

	// Final patching
	if (process.env.APPPORT == null && process.env.EXPOSEDPORT != null) {
		process.env.APPPORT = process.env.EXPOSEDPORT;
		console.log(`APPPORT set to value of exposed port ${process.env.APPPORT}`);
	}
	
	
	if (process.env.PORT != null && process.env.APPPORT == null) {
		process.env.APPPORT = process.env.PORT;
		console.log(`APPPORT overriden by PORT ${process.env.PORT}`);
	}


	if (process.env.APPLOC == null) {
		process.env.APPLOC = './public';
	}

	if (process.env.APPENTRY == null) {
		process.env.APPENTRY = 'index.html';
	}

	// fixing usual user error of adding a space after the url
	let vserver = process.env.VIYA_SERVER;
	if (vserver == null) {
		console.log('Note: VIYA_SERVER not specified');
		process.exit(0);
	}

	vserver = vserver.trim();
	if (vserver.endsWith('/') === true) {
		vserver = vserver.substring(0, vserver.length - 1);
	}
	if (vserver.indexOf('http') < 0) {
		vserver = 'https://' + vserver;
		console.log('No protocol specified. Setting to https');
	} 

	process.env.VIYA_SERVER = vserver;
	console.log('VIYA_SERVER is: ', process.env.VIYA_SERVER);
	if (vserver.indexOf('https://') !== -1) {
		process.env.HTTPS = 'true';
	}
}

function iconfig (appEnv) {
	try {
		let data = fs.readFileSync(appEnv, 'utf8');
		let d = data.split(/\r?\n/);
		d.forEach(l => {
			if (l.length > 0 && l.indexOf('#') === -1) {
				let la = l.split('=');
				let envName = la[0];
				if (la.length === 2 && la[1].length > 0) {
					process.env[envName] = la[1];
				} 
				configDebug(la[ 1 ]);
			}
		});

	} catch (err) {
		console.log(err);
		process.exit(0);
	}
}


export default config;
