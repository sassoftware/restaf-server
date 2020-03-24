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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var inert = require('@hapi/inert'),
    vision = require('@hapi/vision'); //  WebpackPlugin = require('hapi-webpack-plugin'),/* for hot restart */


exports.plugin = {
  name: 'restafServer',
  version: '1.0.0',
  register: appServer
};

function appServer(_x, _x2) {
  return _appServer.apply(this, arguments);
}

function _appServer() {
  _appServer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(server, options) {
    var routes;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            routes = options.routes;
            process.env.APPHOST_ADDR = process.env.APPHOST;

            if (!(process.env.AUTHFLOW === 'authorization_code' || process.env.AUTHFLOW === 'code')) {
              _context.next = 5;
              break;
            }

            _context.next = 5;
            return server.register(require('./SASauth'));

          case 5:
            _context.next = 7;
            return server.register([inert, vision]);

          case 7:
            server.route(routes); // eslint-disable-next-line require-atomic-updates

            server.app.cache = server.cache({
              segment: 'session',
              expiresIn: 14 * 24 * 60 * 60 * 1000
            });

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _appServer.apply(this, arguments);
}

;