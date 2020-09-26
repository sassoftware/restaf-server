/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

// primarly to do a keepAlive of sasLogon
let debug = require('debug')('keepalive');
async function keepAlive2 (req,h) {
   debug('in keep2');;
   return h.response().code(204);
}
export default keepAlive2;