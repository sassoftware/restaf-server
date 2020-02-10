/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
let uuid = require('uuid');
import logon from './logon.js';

async function getApp (req, h) {
    ;
    if (process.env.AUTHFLOW === 'authorization_code' || process.env.AUTHFLOW === 'code') {
        return getAuthApp(null, req, h)
    } else {
        return logon(req,h);
    }
}

async function getAuthApp (rootHandler, req, h) {
    ;
    const sid = uuid.v4();
    let credentials = req.auth.credentials;
    await req.server.app.cache.set(sid, credentials);
    req.cookieAuth.set({JSESSIONID: sid});
    
    let indexHTML = (process.env.APPENTRY == null) ? 'index.html' : process.env.APPENTRY;
    console.log(`redirecting to /${indexHTML}`);
    
    return h.redirect(`/${indexHTML}`);
}
export default getApp;