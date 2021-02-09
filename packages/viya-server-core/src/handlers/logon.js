/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

import setCookies from './setCookies';
async function logon (req, h) {
   req.log('in logon');
   debugger;
   req.log('in logon 2');
   let r = await setCookies(req, h);
   req.log('in logon after setcookie', r.redirect);debugger;
   return h.redirect(r.redirect);
}






export default logon;