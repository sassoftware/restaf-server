/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
let uuid = require('uuid');
let debug = require('debug');
let debugAuth = debug('auth');

async function getAuthApp (rootHandler, req, h) {
  
    debugger;
    let credentials = req.auth.credentials;
    //use an unique name for the saved credentials
    const sid = uuid.v4();
    await req.server.app.cache.set(sid, credentials);
    debugAuth(req.auth);
    
    //
    // save unique cache segment name in cookieAuth
    // the credentials are never sent back to client
    //
    req.cookieAuth.set({ JSESSIONID: sid });

    // Now redirect
	let indexHTML = process.env.APPENTRY == null ? 'index.html' : process.env.APPENTRY;
	console.log(`redirecting to /${indexHTML}`);

	return h.redirect(`/${indexHTML}`);
}
export default getAuthApp;

