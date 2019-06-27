/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
let debug       = require('debug');
let proxyLogger = debug('proxylogger');
async function appCallback (req, h) {
    
    proxyLogger('In callback');
    let indexHTML = (process.env.APPENTRY == null) ? 'index.html' : process.env.APPENTRY;
    return h.file(`${indexHTML}`);
}
export default appCallback;