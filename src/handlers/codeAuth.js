/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

import setCookies from './setCookies';
import Boom from '@hapi/boom';
let debug = require('debug')('codeauth');

async function codeAuth (req, h) {
	debugger;
	debug(req.state);
	debugger;
	let logonResult = await setCookies(req, h);

	// To handle the 500 under certain circumstances
	// message sent to browser in onpreResponse 
	if (logonResult.status === false) {
		console.log('redirecting');
		let error = Boom.badRequest('Unable to logon');
		error.output = logonResult.error.output;
		error.output.payload.custom = 'Logon Error';
		throw error;
	}

	let indexHTML = process.env.APPENTRY == null ? 'index.html' : process.env.APPENTRY;
	debug(indexHTML);
	
	if (indexHTML.indexOf('/') === 0) {
		// added to support create-react-restaf-viya-app cli
		debug(`/${process.env.APPNAME}${indexHTML}`);
		return h.redirect(`/${process.env.APPNAME}${indexHTML}`);
	} else {
		return h.file(indexHTML);
	};
}
export default codeAuth;
