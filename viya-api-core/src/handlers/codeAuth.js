/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

import setCookies from './setCookies';

async function codeAuth (req, h, options) {  
	
	await setCookies(req, h, options);
	let indexHTML = process.env.APPENTRY == null ? 'index.html' : process.env.APPENTRY;
	if (indexHTML.indexOf('/') === 0) {
		// added to support create-react-restaf-viya-app cli
		if (indexHTML !== '/develop') {
			indexHTML = `/${process.env.APPNAME}${indexHTML}`;
		}
		return h.redirect(indexHTML);
	} else {
		return h.file(indexHTML);
	};
}
export default codeAuth;
