"use strict";

require("core-js/stable");

require("regenerator-runtime/runtime");

var _fs = _interopRequireDefault(require("fs"));

var _iService = _interopRequireDefault(require("./iService"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
module.exports = function core(uTable, useDefault, serverMode, customize) {
  var argv = require('yargs').argv;

  var env = argv.env == null ? null : argv.env;
  var appenv = argv.appenv == null ? null : argv.appenv;
  var docker = argv.docker == null ? null : argv.docker;
  process.env.SERVERMODE = serverMode;

  if (useDefault == null) {
    useDefault = true;
  }

  console.log('Initialization started ============================================================');
  console.log('version: 1.3.7');
  console.log("\nConfiguration:\n          Dockerfile: ".concat(docker, "\n          env file  : ").concat(env, "\n          appenv    : ").concat(appenv, "\n          customize : ").concat(customize != null, "\n          "));
  iapp(appenv, env, docker, uTable, useDefault, serverMode, customize);
};

function iapp(appSrc, rafEnv, dockerFile, uTable, useDefault, serverMode, customize) {
  var asset = setup(rafEnv, dockerFile);

  if (appSrc === null) {
    appSrc = process.env.APPENV == null ? null : process.env.APPENV;
  }

  if (appSrc != null) {
    createPayload(appSrc, function (err, r) {
      if (err) {
        console.log(err);
        console.log('createPayload failed');
        process.exit(1);
      } else {
        (0, _iService["default"])(uTable, useDefault, asset, r, serverMode, customize);
      }
    });
  } else {
    var appEnv = getAllEnv({});
    (0, _iService["default"])(uTable, useDefault, asset, appEnv, serverMode, customize);
  }
}

function setup(rafEnv, dockerFile) {
  (0, _config["default"])(rafEnv, dockerFile);
  var asset = process.env.APPLOC === '.' ? process.cwd() : process.env.APPLOC;
  process.env.APPASSET = asset;
  return asset;
}

function createPayload(srcName, cb) {
  var src = _fs["default"].readFileSync(srcName, 'utf8');

  if (src === null) {
    cb("Error: ".concat(srcName, " was not found. "));
  }

  try {
    // console.log(src);
    var f = new Function(src);
    console.log("".concat(srcName, " compile completed"));
    var r = f();
    f = null;
    var ar = getAllEnv(r);
    cb(null, ar);
  } catch (err) {
    console.log("".concat(srcName, " compile failed"));
    cb(err);
  }
}

function getAllEnv(userData) {
  var env;
  var l = null;
  var authflow = trimit('AUTHFLOW');

  if (authflow === 'authorization_code' || authflow === 'code') {
    authflow = 'server';
  }

  process.env.AUTHFLOW = authflow;
  var redirect = process.env.REDIRECT != null ? process.env.REDIRECT : null;
  var host = trimit('VIYA_SERVER');
  var clientID = trimit('CLIENTID'); // eslint-disable-next-line no-unused-vars

  var clientSecret = trimit('CLIENTSECRET');
  var keepAlive = trimit('KEEPALIVE');
  var appName = trimit('APPNAME');
  var ns = trimit('NAMESPACE');

  if (authflow === 'server' || authflow === 'implicit') {
    if (authflow === 'implicit') {
      redirect = trimit('REDIRECT');

      if (redirect === null) {
        redirect = "".concat(appName, "/callback");
        process.env.REDIRECT = 'callback';
      } else {
        redirect = redirect.indexOf('http') != -1 ? redirect : "".concat(process.env.APPNAME, "/").concat(redirect);
      }
    }

    ;
    l = {
      authType: authflow,
      redirect: redirect,
      host: host,
      clientID: clientID,
      appName: appName,
      keepAlive: null,
      useToken: process.env.USETOKEN,
      ns: ns
    };

    if (authflow === 'server' && keepAlive === 'YES') {
      var protocol = process.env.HTTPS === 'true' ? 'https://' : 'http://';
      l.keepAlive = "".concat(protocol).concat(process.env.APPHOST, ":").concat(process.env.APPPORT, "/").concat(appName, "/keepAlive");
      l.keepAlive = l.keepAlive.replace(/0.0.0.0/, 'localhost');
    }

    ;

    if (process.env.TIMERS != null) {
      l.timers = process.env.TIMERS;
    }
  }

  env = {
    LOGONPAYLOAD: l,
    APPENV: userData
  };
  console.log('Configurations');
  console.log(JSON.stringify(env, null, 4));
  return env;
}

function trimit(e) {
  var a = process.env[e];
  return a == null ? null : a.trim();
}