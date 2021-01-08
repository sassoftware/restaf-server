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

function setupAuth(_x, _x2) {
  return _setupAuth.apply(this, arguments);
}

function _setupAuth() {
  _setupAuth = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(server, options) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return server.register({
              plugin: SASauth,
              options: options
            });

          case 2:
            _context.next = 4;
            return server.register({
              plugin: appCookie,
              options: options
            });

          case 4:
            _context.next = 6;
            return server.register({
              plugin: token
            });

          case 6:
            server.auth["default"]('token');

          case 7:
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