/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

import setCookies from './setCookies';
let debug = require('debug')('logon');
async function logon (req, h) {
   debug('in logon');
   req.log('in logon');
   let r = await setCookies(req, h, null);
   debug(r.redirect);
   req.log('in logon after setcookie', r.redirect);
   return h.redirect(r.redirect);
}






export default logon;