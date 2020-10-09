/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

// primarly to do a keepAlive of sasLogon
let debug = require('debug')('keepAlive');
async function keepAlive2 (req,h) {
   debug('in keep2');;
   return h.response().code(200);
}
export default keepAlive2;