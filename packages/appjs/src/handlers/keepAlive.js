/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

import axios from 'axios';

// primarly to do a keepAlive of sasLogon
let qs = require('qs');
let debug = require('debug')('keepalive');
import decodeJwt from './decodeJwt';

async function keepAlive (req, h) {
    refreshToken(req, h);
    // let SASLogon = `${process.env.VIYA_SERVER}/SASLogon/oauth/authorize?client_id=${process.env.CLIENTID}&redirect_uri=${process.env.APPSERVER}/keepAlive2&response_type=code`;
    let SASLogon = `${process.env.VIYA_SERVER}/SASLogon/`;
   debug(SASLogon);
  return h.redirect(SASLogon).code(302);
}

async function refreshToken (req, h) {
    
    if (req.state.ocookie == null) {
        return false;
    }
    let sid = req.state.ocookie.sid;
    debug(sid);
    let credentials = await req.server.app.cache.get(sid);

    let config = {
        url   : `${process.env.VIYA_SERVER}/SASLogon/oauth/token`,
        method: 'POST',

        headers: {
            'Accept'      : 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify({
            grant_type   : 'refresh_token',
            refresh_token: credentials.refreshToken,
            client_id    : process.env.CLIENTID,
            client_secret: process.env.CLIENTSECRET
        })
    };

    let r = await axios(config);
  
	credentials = {
		token       : r.data.access_token,
		refreshToken: r.data.refresh_token,
		sid         : sid
    };
    await req.server.app.cache.set(sid, credentials);
    h.state('ocookie', { "sid": sid });
    return credentials;

}
export default keepAlive;