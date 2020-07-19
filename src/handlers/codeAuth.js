/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

import setCookies from './setCookies';
let debug = require('debug')('codeauth');

async function codeAuth (req, h) {
    debug('passing thru codeAuth');
	debug(req.state);
	await setCookies(req, h);
	let indexHTML = process.env.APPENTRY == null ? 'index.html' : process.env.APPENTRY;
	debug(indexHTML);
	if (indexHTML.indexOf('/') === 0) {
		debug(`/${process.env.APPNAME}${indexHTML}`);
		return h.redirect(`/${process.env.APPNAME}${indexHTML}`);
	} else {
		return h.file(indexHTML);
	};
}
export default codeAuth;
