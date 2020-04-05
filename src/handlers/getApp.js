/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

import setCookies from './setCookies';
import codeAuth from './codeAuth';

let debug = require('debug')('getapp');

async function getApp (req, h) {
	console.log(`..... AUTHFLOW(getapp): ${process.env.AUTHFLOW}`);
    debug('passing thru getApp');
    if (process.env.AUTHFLOW === 'implicit') {
        let x = `${process.env.VIYA_SERVER}/SASLogon/oauth/authorize?response_type=token&client_id=${process.env.CLIENTID}`;
        let redirectUri = `http://${process.env.APPHOST}:${process.env.APPPORT}/${process.env.APPNAME}/callback?host=${process.env.VIYA_SERVER}`;
        let url = `${x}&redirect_uri=${redirectUri}`;
        return h.redirect(url);
    } else if (process.env.AUTHFLOW === 'authorization_code' || process.env.AUTHFLOW === 'code') {
        return codeAuth(req, h);
    } else {
        let indexHTML = process.env.APPENTRY == null ? 'index.html' : process.env.APPENTRY;
        console.log(`Redirecting to default ${indexHTML}`);
        return h.file(indexHTML);
    }
	
}
export default getApp;
