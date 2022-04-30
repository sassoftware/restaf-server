"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
var SASauth = require('./SASauth');

var appCookie = require('./appCookie');

var token = require('./token');

var setDefaultRoutes = require('./setDefaultRoutes');
/** Notes:
 * I api then register sasAuth and token - no cookies
 * If app, then register sasAuth and cookie(session) but no token 
 */


function setupAuth(_x, _x2) {
  return _setupAuth.apply(this, arguments);
}

function _setupAuth() {
  _setupAuth = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(server, options) {
    var def;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(options.authFlow === 'server')) {
              _context.next = 12;
              break;
            }

            _context.next = 3;
            return server.register({
              plugin: SASauth,
              options: options
            });

          case 3:
            _context.next = 5;
            return appCookie(server, options);

          case 5:
            def = 'session';

            if (!(options.serverMode === 'api')) {
              _context.next = 10;
              break;
            }

            _context.next = 9;
            return server.register({
              plugin: token
            });

          case 9:
            def = 'token';

          case 10:
            server.log('***********************Default auth', def);
            server.auth["default"](def); // console.log(server.registerations);

          case 12:
            setDefaultRoutes(server, options);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _setupAuth.apply(this, arguments);
}

;
var _default = setupAuth;
exports["default"] = _default;