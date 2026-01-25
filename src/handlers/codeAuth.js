/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

import setCookies from '../plugins/setCookies';
let debug = require('debug')('codeauth');
async function codeAuth (req, h, options) {  
	debug('calling setCookies in codeAuth');
	await setCookies(req, h, options);
	
	let indexHTML = process.env.APPENTRY == null ? 'index.html' : process.env.APPENTRY;
	if (process.env.REDIRECT != null) {
		debug('using REDIRECT env variable', process.env.REDIRECT);
		indexHTML = process.env.REDIRECT;
	}
	debug('..................', indexHTML);
	if (indexHTML.indexOf('/') === 0) {
		// added to support create-react-restaf-viya-app cli
		if (indexHTML !== '/develop') {
			indexHTML = `/${process.env.APPNAME}${indexHTML}`;
		}
		console.log(`Redirecting to ${indexHTML}`);
		return h.redirect(indexHTML);
	} else {
		console.log(`Visiting ${indexHTML}`);
		return h.file(indexHTML);
	};
}
export default codeAuth;
