/* #!/usr/bin/env node*/
/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
let rafServer = require('./lib/index.js');
rafServer.icli(null, true, customize);

function customize (key){
    let info = {
        swaggerOptions: {}
    };
    console.log('+++++++++++++++++++', key);
    return info(key);
}