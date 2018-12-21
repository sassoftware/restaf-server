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

let fs = require('fs');
debugger;
let rafServer = require ('./lib/index.js');
let argv      = require('yargs').argv;
let env       = ( argv.env == null ) ? null : argv.env;
let appenv    = ( argv.appenv == null ) ? null : argv.appenv;

console.log(`env: ${env}`);
console.log(`env: ${appenv}`);

if ( appenv !== null ) {
   createPayload( appenv, ((err, appEnvSrc) => {
      if ( err ) {
          console.log(err);
          process.exit(1);
      } else {
        debugger;
        console.log(appEnvSrc);
        rafServer.iapp(appEnvSrc, env);
      }

   }) )
} else {
    rafServer.iapp( null, env)
}


function createPayload( srcName, cb ) {
    fs.readFile(srcName, 'utf8', (err, src) => {
        if ( err ) {
            console.log(`Failed to read ${srcName}`);
            cb(err);
        } else {
            try {
                console.log(src);
                let f = new Function( src );
                console.log('compile completed');
                cb( null, f);
            }
            catch ( err ) {
               console.log(' Failed to parse the javascript file');
               cb(err);
            }
        }
    })
}

