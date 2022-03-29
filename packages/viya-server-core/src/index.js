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

import "core-js/stable";
import "regenerator-runtime/runtime";
import fs from 'fs';
import iService from './iService';
import config from './config';

module.exports = function core (uTable, useDefault, serverMode, customize) {
  let argv = require('yargs').argv;
  let env = argv.env == null ? null : argv.env;
  let appenv = argv.appenv == null ? null : argv.appenv;
  let docker = argv.docker == null ? null : argv.docker;
  process.env.SERVERMODE=serverMode;
  
  if (useDefault == null) {
    useDefault = true;
  }
  console.log('Initialization started ============================================================');
  console.log('version: 1.3.7');
  console.log(
    `\nConfiguration:
          Dockerfile: ${docker}
          env file  : ${env}
          appenv    : ${appenv}
          customize : ${customize != null}
          `
  );
          
  iapp(appenv, env, docker, uTable, useDefault, serverMode, customize);
};

function iapp (appSrc, rafEnv, dockerFile, uTable, useDefault, serverMode,customize) {
  let asset = setup(rafEnv, dockerFile);
  if (appSrc === null) {
    appSrc = (process.env.APPENV == null) ? null: process.env.APPENV;
  }
  if (appSrc != null) {
    createPayload(appSrc, (err, r) => {
      if (err) {
        console.log(err);
        console.log('createPayload failed');
        process.exit(1);
      } else {
        iService(uTable, useDefault, asset, r, serverMode, customize);
      }
    });
  } else {
    let appEnv = getAllEnv({});
    iService(uTable, useDefault, asset, appEnv,serverMode, customize);
  }
}

function setup (rafEnv, dockerFile) {
  config(rafEnv, dockerFile);
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
  if (authflow === 'authorization_code' ||authflow === 'code') {
    authflow = 'server';
  }
  process.env.AUTHFLOW = authflow;
  let redirect = (process.env.REDIRECT != null) ? process.env.REDIRECT : null;

  let host         = trimit('VIYA_SERVER');
  let clientID     = trimit('CLIENTID');
  // eslint-disable-next-line no-unused-vars
  let clientSecret = trimit('CLIENTSECRET');
  let keepAlive    = trimit('KEEPALIVE');
  let appName = trimit('APPNAME');
  let ns      = trimit('NAMESPACE');
  
  if (authflow === 'server' || authflow === 'implicit') {
    if (authflow === 'implicit') {
      redirect = trimit('REDIRECT');
      if (redirect === null) {
        redirect = `${appName}/callback`;
        process.env.REDIRECT='callback';
      } else {
        redirect = (redirect.indexOf('http') !=- 1) ? redirect : `${process.env.APPNAME}/${redirect}`;
      }
    };

     l = {
      authType : authflow,
      redirect : redirect,
      host     : host,
      clientID : clientID,
      appName  : appName,
      keepAlive: null,
      useToken : process.env.USETOKEN,
      ns       : ns
    };
   
    if (authflow === 'server' && keepAlive === 'YES') {
      let protocol = (process.env.HTTPS === 'true') ? 'https://' : 'http://';
      l.keepAlive = `${protocol}${process.env.APPHOST}:${process.env.APPPORT}/${appName}/keepAlive`;
      l.keepAlive = l.keepAlive.replace(/0.0.0.0/, 'localhost');
    } ;
    if (process.env.TIMERS != null) {
      l.timers = process.env.TIMERS;
    }
  }

  env = {
    LOGONPAYLOAD: l,
    APPENV      : userData
  };
  console.log('Configurations');
  console.log(JSON.stringify(env, null,4));

  return env;
}

function trimit (e) {
  let a = process.env[e];
  return a == null ? null : a.trim();
}
