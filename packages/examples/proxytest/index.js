/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
const rafServer = require('@sassoftware/viya-appserverjs');
debugger;
rafServer.icli(null, null, customize);
function customize (key, _options){
    debugger;
    let info = {
        SWAGGEROPTIONS: {},
        APPENV        : null
    };
    return info[key];  
}
