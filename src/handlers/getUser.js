/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
async function getUser (req, h){
    let authCred = req.auth.credentials;
    let user = (authCred != null) ? authCred.user_name : 'User';
    return `let USER_NAME='${user}';`;
}
export default getUser;
