/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';


import codeAuth from './codeAuth';

// handle all callback

async function appCallback (req, h) {
    
    console.log(`..... AUTHFLOW: ${process.env.AUTHFLOW}`);
    if (process.env.AUTHFLOW === 'server') {
        return codeAuth(req, h);
    } else {
        let indexHTML = process.env.APPENTRY == null ? 'index.html' : process.env.APPENTRY;
        console.log(`Redirecting to default ${indexHTML}`);
        return h.file(`${indexHTML}`);
    }
}

export default appCallback;