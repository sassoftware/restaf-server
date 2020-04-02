/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

import axios from 'axios';

let debug = require('debug')('logoff');

async function logoff (req, h) {
   
    debug(req.state);
    if (process.env.AUTHFLOW === 'code' || process.env.AUTHFLOW === 'authorization_code') {
        let credentials = req.auth.credentials;
        debug(credentials);
        let sid = credentials.sid;
        debug(sid);
        await req.server.app.cache.del(sid);
        req.cookieAuth.clear('authCookie');
        await ViyaLogout(); 
        debug(req.state);
            return h.response('Server session cleared').unstate('authCookie');
	} else {
            return h.response('Server session cleared');
	}
}
async function ViyaLogout () {
    let p = {
        method: 'GET',
        url   : `${process.env.VIYA_SERVER}/SASLogon/logout`
    };

    let r = await axios(p);
    debug(r);
}
export default logoff;