/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

let debug = require('debug')('codeauth');

async function codeAuth (req, h) {  
	
	let indexHTML = process.env.APPENTRY == null ? 'index.html' : process.env.APPENTRY;
	if (indexHTML.indexOf('/') === 0) {
		// added to support create-react-restaf-viya-app cli
		debug(`/${process.env.APPNAME}${indexHTML}`);
		return h.redirect(`/${process.env.APPNAME}${indexHTML}`);
	} else {
		return h.file(indexHTML);
	};
}
export default codeAuth;
