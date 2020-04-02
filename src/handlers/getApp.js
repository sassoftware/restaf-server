/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

import logon from './logon.js';
import getAuthApp from './getAuthApp';
let debug = require('debug')('getapp');

async function getApp (req, h) {
    debug(req.state);
    let authCred = req.auth.credentials;
    debug(authCred);
    if (process.env.AUTHFLOW === 'authorization_code' || process.env.AUTHFLOW === 'code') {
        return getAuthApp(null, req, h);
    } else {
        debugger;
        return logon(req,h);
    }
}
export default getApp;