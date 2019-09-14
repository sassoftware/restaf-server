/*
 *  ------------------------------------------------------------------------------------
 *  * Copyright (c) SAS Institute Inc.
 *  *  Licensed under the Apache License, Version 2.0 (the 'License');
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  * http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an 'AS IS' BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  limitations under the License.
 * ----------------------------------------------------------------------------------------
 *
 */

'use strict';

import '@babel/polyfill';
import fs from 'fs';
import iService from './iService';
import config from './config';

function icli (uTable, useDefault){
  let argv      = require('yargs').argv;
  let env       = argv.env == null ? null : argv.env;
  let appenv    = argv.appenv == null ? null : argv.appenv;
  let docker    = argv.docker == null ? null : argv.docker;
  
  if (useDefault == null) {
     useDefault = true;
  }
  console.log(`docker: ${docker}`);
  console.log(`env: ${env}`);
  console.log(`appenv: ${appenv}`);
  iapp(appenv, env, docker, uTable, useDefault);
}


function iapp (appSrc, rafEnv, dockerFile, uTable, useDefault) {
  let asset = setup(rafEnv, dockerFile);
  if (appSrc === null) {
    appSrc = (process.env.APPENV == null) ? null: process.env.APPENV;
  }
  if (appSrc !== null) {
    createPayload(appSrc, (err, appEnv) => {
      if (err) {
        console.log(err);
        process.exit(1);
      } else {
        iService(uTable, useDefault, asset, appEnv);
      }
    });
  } else {
    let appEnv = getAllEnv(null);
    iService(uTable, useDefault, asset, appEnv);
  }
}

function setup (rafEnv, dockeFile) {
  config(rafEnv, dockeFile);
  let asset = process.env.APPLOC === '.' ? process.cwd() : process.env.APPLOC;
  process.env.APPASSET = asset;
  return asset;
}

function createPayload (srcName, cb) {
  let src = fs.readFileSync(srcName, 'utf8');
  if (src === null) {
    cb(`Error: ${srcName} was not found. `); 
  }
  try {
    // console.log(src);
    let f = new Function(src);
    console.log(`${srcName} compile completed`);
    let r = f();
    f = null;
    let ar = getAllEnv(r);
    cb(null, ar);
  } catch (err) {
    console.log(`${srcName} compile failed`);
    cb(err);
  }
}
function getAllEnv (userData) {
  let env;
  let l = null;
  let authflow = trimit('AUTHFLOW');
  if (authflow === 'authorization_code') {
    authflow = 'server';
  }

  if (authflow === 'implicit') {
    l = {
      authType: authflow,
      host    : trimit('VIYA_SERVER'),
      clientID: trimit('CLIENTID'),
      redirect: (process.env.REDIRECT != null) ? `${trimit('APPNAME')}/${trimit('REDIRECT')}` : null,
      appName : trimit('APPNAME'),
      
    };
  } else {
    l = {
      authType : authflow,
      host     : trimit('VIYA_SERVER'),
      appName  : trimit('APPNAME'),
      passThru : trimit('VIYA_SERVER'),
      keepAlive: null /*`http://${process.env.APPHOST}:${process.env.APPPORT}/keepAlive`*/
    };

  }

  env =
    l !== null
      ? `let LOGONPAYLOAD = ${JSON.stringify(l)};`
      : `let LOGONPAYLOAD=null;`;

  if (userData !== null) {
    env += `let APPENV = ${JSON.stringify(userData)};`;
  } else {
    env += `let APPENV = {none: 'none'};`;
  }
  return env;
}

function trimit (e) {
  let a = process.env[e];
  return a == null ? null : a.trim();
}
export { iapp,  icli };
