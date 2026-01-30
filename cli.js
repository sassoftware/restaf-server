#!/usr/bin/env node
/*
* Copyright © 2025, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

let core = require('./lib/index.js');
console.log('Starting the cli for @sassoftware/viya-serverjs');
let userCache = {};
let r = core(null, true, 'app', null, userCache);
console.log('core returned', r);
