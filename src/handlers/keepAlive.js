/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

// primarly to do a keepAlive of sasLogon
let debug = require('debug')('keepalive');
async function keepAlive (req,h) {
   let SASLogon = `${process.env.VIYA_SERVER}/SASLogon/oauth/authorize?client_id=${process.env.CLIENTID}&redirect_uri=${process.env.APPSERVER}/keepAlive2&response_type=code`;
  // let SASLogon = `${process.env.VIYA_SERVER}/SASLogon/`;
   debug(SASLogon);
   return h.response().redirect(SASLogon).code(302);
}
export default keepAlive;