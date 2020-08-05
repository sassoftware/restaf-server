"use strict";

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
function SASauth(_x, _x2) {
  return _SASauth.apply(this, arguments);
}

function _SASauth() {
  _SASauth = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(hapiServer, options) {
    var bell, uuid, debug, debugAuth, bellAuthOptions, provider, authURL;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            bell = require('@hapi/bell');
            uuid = require('uuid');
            debug = require('debug');
            debugAuth = debug('auth');

            if (!(process.env.AUTHFLOW == 'authorization_code' || process.env.AUTHFLOW === 'code')) {
              _context2.next = 11;
              break;
            }

            authURL = process.env.VIYA_SERVER;
            provider = {
              name: 'sas',
              protocol: 'oauth2',
              useParamsAuth: false,
              auth: authURL + '/SASLogon/oauth/authorize',
              token: authURL + '/SASLogon/oauth/token',
              profileMethod: 'get',
              profile: function () {
                var _profile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(credentials, params, get) {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          debugAuth(credentials);
                          debugAuth(params);
                          debug(get);

                        case 3:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                function profile(_x3, _x4, _x5) {
                  return _profile.apply(this, arguments);
                }

                return profile;
              }()
            };
            bellAuthOptions = {
              provider: provider,
              password: uuid.v4(),
              clientId: process.env.CLIENTID.trim(),
              clientSecret: process.env.CLIENTSECRET == null ? ' ' : process.env.CLIENTSECRET,
              // location    : getLocation,
              isSecure: false
            };
            _context2.next = 10;
            return hapiServer.register(bell);

          case 10:
            hapiServer.auth.strategy('sas', 'bell', bellAuthOptions);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _SASauth.apply(this, arguments);
}

module.exports = SASauth;