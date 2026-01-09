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
	debug(options);
	// add support for REDIRECT env variable
	let indexHTML = process.env.APPENTRY == null ? 'index.html' : process.env.APPENTRY;
	let redirectPath = null;
	if (process.env.REDIRECT != null) {
	    redirectPath = (process.env.REDIRECT != null && process.env.REDIRECT.startsWith('/') 
	              ? `/${process.env.APPNAME}${process.env.REDIRECT}`
				  : `/${process.env.REDIRECT}`);
	}
	debug(indexHTML);
	debug(redirectPath);
	if (redirectPath !== null) {
		debug('redirecting to', redirectPath);
	   return h.redirect(redirectPath);
	} else {
		console.log(`Visiting ${indexHTML}`);
		return h.file(indexHTML);
	};
}
export default codeAuth;
