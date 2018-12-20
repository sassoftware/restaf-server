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
'use strict'; // let path = require('path');

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iapp = iapp;
exports.app = app;
exports.service = service;
exports.UIapp = UIapp;

require("babel-polyfill");

var _iService = _interopRequireDefault(require("./iService"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function UIapp(uTable, rootHandler, rafEnv) {
  var asset = setup(rafEnv);
  (0, _iService.default)(uTable, uTable !== null, asset, rootHandler);
}

function service(uTable, rootHandler, rafEnv) {
  var asset = setup(rafEnv);
  (0, _iService.default)(uTable, false, asset, rootHandler);
}

function app(appData) {
  var rafEnv = process.argv.length === 3 ? process.argv[2] : null;
  console.log(rafEnv === null ? 'NOTE: Using settings from environment variables' : "NOTE: env file is: ".concat(rafEnv));
  iapp(appData, rafEnv);
}

function iapp(appData, rafEnv) {
  var appEnvb = getAppEnv.bind(null, appData);
  var asset = setup(rafEnv);
  var uTable = [{
    method: ['GET'],
    path: "/appenv",
    config: {
      auth: false,
      cors: true,
      handler: appEnvb
    }
  }];
  (0, _iService.default)(uTable, uTable !== null, asset, null);
}

function getAppEnv(_x, _x2, _x3) {
  return _getAppEnv.apply(this, arguments);
}

function _getAppEnv() {
  _getAppEnv = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(userData, req, h) {
    var env, l;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (process.env.AUTHFLOW === 'implicit') {
              l = {
                authType: process.env.AUTHFLOW,
                host: process.env.VIYA_SERVER,
                clientID: process.env.CLIENTID,
                redirect: "".concat(process.env.APPNAME, "/").concat(process.env.REDIRECT)
              };
            } else {
              l = {
                authType: process.env.AUTHFLOW,
                passThru: process.env.VIYA_SERVER
              };
            }

            env = "let LOGONPAYLOAD = ".concat(JSON.stringify(l), ";");

            if (userData != null) {
              env += "let APPENV = ".concat(JSON.stringify(userData()), ";");
            }

            console.log(env);
            return _context.abrupt("return", env);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _getAppEnv.apply(this, arguments);
}

function setup(rafEnv) {
  debugger;
  (0, _config.default)(rafEnv);
  var asset = process.env.APPLOC === '.' ? process.cwd() : process.env.APPLOC;
  process.env.APPASSET = asset;
  return asset;
}