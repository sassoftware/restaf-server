/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
let uuid      = require('uuid');
let debug     = require('debug');
let debugAuth = debug('auth');
let axios     = require('axios');
let qs        = require('qs');

async function getAuthApp (rootHandler, req, h) {
  
    debugger;
    
    // let credentials = req.auth.credentials;
    let credentials = await getCredentials(req);

    //use an unique name for the saved credentials
    const sid = uuid.v4();
    await req.server.app.cache.set(sid, credentials);
    debugAuth(credentials);
    
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
//
// Note: Do not understand why bell.js is not setting the req.auth. Need to debug this.
// so patching it here 

async function getCredentials (req) {
    let route = process.env.REDIRECT == null ? `/callback` : '/' + process.env.REDIRECT;
    let info = req.server.info;
    let location = info.uri + route;
    if (info.host === '0.0.0.0') {
        location = `${info.protocol}://${process.env.APPHOST}:${info.port}${route}`;
    };

    let payload = {
		url   : `${process.env.VIYA_SERVER}/SASLogon/oauth/token`,
		method: 'POST',

		headers: {
			// 'Authorization': 'Basic ' + Buffer.from(`${process.env.CLIENTID}:${process.env.CLIENTSECRET}`).toString('base64'),
			'Accept'      : 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
        data: qs.stringify({
            client_id    : `${process.env.CLIENTID}`,
            client_secret: `${process.env.CLIENTSECRET}`,
            redirect_uri : `${location}`,

			'grant_type': 'authorization_code',
			code        : req.query.code
		})
	};
    try {
        let r = await axios(payload);
        return r.data;
    } catch (err) {
        console.log(err);

    }
}
export default getAuthApp;

