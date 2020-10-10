/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

// primarly to do a keepAlive of sasLogon
let debug = require('debug')('keepAlive');
async function keepAlive2 (req, h) {
   console.log('in keepAlive2');
   let SASLogon = `${process.env.VIYA_SERVER}/SASLogon/`;
   return h.redirect(SASLogon).code(302);
}
export default keepAlive2;