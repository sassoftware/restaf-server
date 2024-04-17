/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

import axios from 'axios';
let Boom = require('@hapi/boom');

// primarly to do a keepAlive of sasLogon
let qs = require('qs');
async function keepAlive (req, h) {
       refreshToken(req, h);
       let SASLogon = `${process.env.VIYA_SERVER}/SASLogon/`;
       return h.redirect(SASLogon).code(302);
}
// let SASLogon = `${process.env.VIYA_SERVER}/SASLogon/oauth/authorize?client_id=${process.env.CLIENTID}&redirect_uri=${process.env.APPSERVER}/keepAlive2&response_type=code`;
 
async function refreshToken (req, h) {
    let credentials = req.auth.credentials;
    let sid = credentials.sid;
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
    try {
       let r = await axios(config);
       let newcred = {...credentials};
       newcred.token        = r.data.access_token;
       newcred.refreshToken = r.data.refresh_token;
       await req.server.app.cache.set(sid, credentials);
       return credentials;
       }
    catch(err) {
        let error = Boom.badRequest('Unable to refresh tokens in KeepAlive', JSON.stringify(err, null,4));
		throw error;
    }

}
export default keepAlive;