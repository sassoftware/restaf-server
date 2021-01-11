/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

// primarly to do a keepAlive of sasLogon
let debug = require('debug')('keepAlive');
async function keepAlive2 (req, h) {
   console.log('in keepAlive2');
   let SASLogon = `${process.env.VIYA_SERVER}/SASLogon/timedout`;
   console.log(SASLogon);
   if (req.state.ocookie != null) {
      let sid = req.state.ocookie.sid;
      h.state('ocookie', { "sid": sid });
   }
   return h.redirect(SASLogon).header('accept', 'text/html').code(302);
}
export default keepAlive2;