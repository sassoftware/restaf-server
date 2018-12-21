/*
 *  ------------------------------------------------------------------------------------
 *  * Copyright (c) SAS Institute Inc.
 *  *  Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  * http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  limitations under the License.
 * ----------------------------------------------------------------------------------------
 *
 */

'use strict';

// let path = require('path');

import 'babel-polyfill';
import iService from './iService';
import config from './config';

function UIapp (uTable, rootHandler, rafEnv) {

    let asset = setup(rafEnv);
    iService(uTable, (uTable !== null), asset, rootHandler);
}

function service (uTable, rootHandler, rafEnv) {
    let asset = setup(rafEnv);
    iService(uTable, false, asset, rootHandler);
}


function app (appData) {

    let rafEnv = (process.argv.length === 3) ? process.argv[ 2 ] : null;
    console.log((rafEnv === null) ? 'NOTE: Using settings from environment variables' : `NOTE: env file is: ${rafEnv}`);
    iapp(appData, rafEnv);
}

function iapp (appData, rafEnv) {
    let asset = setup(rafEnv);
    let uTable =
        [
            {
                method: [ 'GET' ],
                path: `/appenv`,
                config: {
                    auth: false,
                    cors: true,
                    handler: getAppEnv.bind(null, appData)

                }
            }

        ];
    iService(uTable, (uTable !== null), asset, null);
}

async function getAppEnv (userData, req, h) {
    let env;
    let l;
    console.log('in appenv');
    let authflow = process.env.AUTHFLOW.trim();
    console.log(authflow);
    if (authflow === 'implicit') {
        l = {
            authType: authflow,
            host    : process.env.VIYA_SERVER.trim(),
            clientID: process.env.CLIENTID.trim(),
            redirect: `${process.env.APPNAME.trim()}/${process.env.REDIRECT.trim()}`
        }
    } else {
        l = {
            authType: authflow,
            passThru: process.env.VIYA_SERVER.trim()
        };
    }
    env = `let LOGONPAYLOAD = ${JSON.stringify(l)};`;
    if (userData != null) {
        env += `let APPENV = ${JSON.stringify(userData())};`;
    }
    console.log(env);
    return env;
}

function setup (rafEnv) {
    debugger;
    config(rafEnv);
    let asset = (process.env.APPLOC === '.') ? process.cwd() : process.env.APPLOC;
    process.env.APPASSET = asset;
    return asset;
}

export { iapp, app, service, UIapp };
