/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
let uuid = require('uuid');

async function getApp (req, h) {
    debugger;
    if (process.env.OAUTH2 === 'YES') {
        return getAuthApp(null, req, h)
    } else {
        let indexHTML = (process.env.APPENTRY == null) ? 'index.html' : process.env.APPENTRY;
        return h.file(indexHTML);
    }
}

async function getAuthApp (rootHandler, req, h) {
    debugger;
    const sid = uuid.v4();
    let credentials = req.auth.credentials;
    await req.server.app.cache.set(sid, credentials);
    req.cookieAuth.set({sid});
    /*
    if (process.env.PROXYSERVER === 'YES'){
       req.cookieAuth.set({sid});
    } 
    */
    let indexHTML = (process.env.APPENTRY == null) ? 'index.html' : process.env.APPENTRY;
    return h.file(`${indexHTML}`);
}
export default getApp;