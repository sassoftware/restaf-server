/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

import setCookies from './setCookies';
import Boom from '@hapi/boom';
let debug = require('debug')('codeauth');

async function codeAuth (req, h) {
    debug('passing thru codeAuth');
	debug(req.state);
	let logonResult = await setCookies(req, h);
	if (logonResult.status === false) {
		console.log('redirecting');
		let error = Boom.badRequest('Unable to logon');
		error.output = logonResult.error.output;
		error.output.payload.custom = 'Logon Error';
		throw error;

		/*
		return `   <h1> Server Error </h1>
		<h3> SAS Logon failed to return token. Probably related to some combination of server settings and browser settings</h3>
			   <h3> Contact your administrator</h3>
			   <pre>  ${JSON.stringify(logonResult.error.output, null,4)} </pre>
			   `;
			   */
		
	}
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
