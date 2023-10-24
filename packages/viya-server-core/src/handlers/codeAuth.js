/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

import setCookies from './setCookies';
let debug = require('debug')('codeauth');
async function codeAuth (req, h, options) {  
	debug('in codeauth');
	await setCookies(req, h, options);
	console.log(options);
	let indexHTML = process.env.APPENTRY == null ? 'index.html' : process.env.APPENTRY;
	if (process.env.REDIRECT != null) {
		indexHTML = process.env.REDIRECT;
	}
	console.log('..................', indexHTML);
	if (indexHTML.indexOf('/') === 0) {
		// added to support create-react-restaf-viya-app cli
		if (indexHTML !== '/develop') {
			indexHTML = `/${process.env.APPNAME}${indexHTML}`;
		}
		debug(`Redirecting to ${indexHTML}`);
		return h.redirect(indexHTML);
	} else {
		debug(`Redirecting to ${indexHTML}`);
		return h.file(indexHTML);
	};
}
export default codeAuth;
