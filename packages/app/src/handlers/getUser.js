/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
let debug = require('debug')('user');
async function getUser (req, h) {
      
    debug(req.state);
    let name = 'SAS User';
    if (req.state.ocookie != null) {
        let sid = req.state.ocookie.sid;
        debug(sid);
        let credentials = await req.server.app.cache.get(sid);
        name = credentials.user_name;
    }
    debug(name);
    return `let USER_NAME='${name}'`;
}
export default getUser;
