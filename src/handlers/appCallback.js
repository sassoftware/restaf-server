/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
let uuid = require('uuid');
import getAuthApp from './getAuthApp';
// handles all callbacks

async function appCallback (req, h) {
    console.log(`..... AUTHFLOW: ${process.env.AUTHFLOW}`);
    if (process.env.AUTHFLOW === 'authorization_code' || process.env.AUTHFLOW === 'code') {
        return getAuthApp(null, req, h);
    } else {
        let indexHTML = (process.env.APPENTRY == null) ? 'index.html' : process.env.APPENTRY;
        console.log(`Successful Authentication(implicit). Redirecting to /${indexHTML}`);
        return h.file(indexHTML);
    }
}
export default appCallback;