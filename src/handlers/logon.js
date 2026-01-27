/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

// import setCookies from './setCookies';
import codeAuth from './codeAuth.js';
let debug = require('debug')('logon');
async function logon (req, h, options) {
   debugger;
     
   debug('calling codeauth');
   let r = codeAuth(req, h, options);
   // r = await setCookies(req, h, options);
   debug(r.redirect);
   return h.redirect(r.redirect);
}

export default logon;