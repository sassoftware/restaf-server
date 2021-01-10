/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
let uuid      = require('uuid');
let debug = require('debug')('setcookies');
import decodeJwt from './decodeJwt';
import Boom  from '@hapi/boom';

async function setCookies (req, h) {

    let authCred = req.auth.credentials;
    debug(authCred);
    if (authCred != null && req.auth.error != null) {
        debug('logon failed');
        return { status: false, error: req.auth.error };
		}
    // create a session id and save credentials in cache
    
    const sid = uuid.v4();
    let jwt = decodeJwt(authCred.token);
    let credentials = {
        token       : authCred.token,
        refreshToken: authCred.refreshToken,
        sid         : sid,
        user_name   : jwt.user_name
    };
      
    await req.server.app.cache.set(sid, credentials);
 
    debug(sid);
    h.state('ocookie', { "sid": sid });
  

    return { status: true, error: null };
}


export default setCookies;

/* 
 save for future reference - not used at this time
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
*/