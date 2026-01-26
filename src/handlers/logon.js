/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

import setCookies from '../plugins/setCookies';
let debug = require('debug')('logon');
async function logon (req, h, options) {
   debugger;
   let r = await setCookies(req, h, options);
   debug(r.redirect);
   debug('in logon after setcookie', r.redirect);
   return h.redirect(r.redirect);
}

export default logon;