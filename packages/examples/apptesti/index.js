/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
const api = require('./api');
let server = require('@sassoftware/viya-apiserverjs');
server.icli (api);
