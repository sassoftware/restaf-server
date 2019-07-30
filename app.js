#!/usr/bin/env node
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

debugger;
let rafserver = require ('./lib/index.js');
rafserver.icli (getCustomHandler ());

function getCustomHandler () {
    let handler =
    [
        {
            method: [ 'GET' ],
            path  : `/userenv`,
            config: {
                auth   : false,
                cors   : true,
                handler: getCustomAppEnv
            }
       }
    ];
    return handler;
    }

    async function getCustomAppEnv (req, h) {
        let env = `let note = "This is custom user env";`;
    return env;
    }

    function appEnv (req, h) {
        let x = {
            scoreModel: {
                caslib: 'Public',
                name  : 'loanEvaluation',
                z     : 10
            }
        };
        console.log(x);
        return x;
    }
