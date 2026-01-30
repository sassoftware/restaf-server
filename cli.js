#!/usr/bin/env node
/*
* Copyright © 2025, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

import api from './lib/index.js';
import autoStart from './autoStart.js';

console.log('Starting the cli for @sassoftware/viya-serverjs');
let userCache = {};

api.asyncCore(null, true, 'app', null, userCache)
.then ((r) => {
    console.log('core returned', r);
    if (process.env.AUTOSTART && process.env.AUTOSTART.toUpperCase() === 'TRUE'){
        console.log('Auto-starting the server as per AUTOSTART env variable');
        autoStart(r).catch((err) => {
            console.log('Error in autoStart', err);
        });
    }
    return r;
})
.catch((err) => {
    console.log('Error in core', err);
});


