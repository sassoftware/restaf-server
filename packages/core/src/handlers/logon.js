/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

let debug = require('debug')('logon');
import setCookies from './setCookies';
async function logon (req, h) {
   let r = await setCookies(req, h);
   req.log('in logon');
   req.log(r);
   return h.redirect(r.redirect);
}





export default logon;