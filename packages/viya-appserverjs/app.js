/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
let rafServer = require('./lib/index.js');
debugger;
rafServer.icli(null, true, customize);
function customize (key, _options){
    let info = {
        APPENV: {
            x: 1,
            y: 2
        },
        SWAGGEROPTIONS: {}
    };
    return info[key];
}