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

var bell = require('@hapi/bell'),
    // eslint-disable-next-line no-unused-vars
uuid = require('uuid'),
    cookie = require('@hapi/cookie');

function SASauth(_x) {
  return _SASauth.apply(this, arguments);
}

function _SASauth() {
  _SASauth = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(hapiServer) {
    var authCookieOptions, bellAuthOptions, provider, isSameSite, getLocation, authURL;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            isSameSite = process.env.SAMESITE;
            isSameSite = isSameSite == null ? 'Strict' : isSameSite === 'none' ? false : isSameSite;
            authCookieOptions = {
              cookie: {
                password: uuid.v4(),
                name: 'JSESSIONID',
                domain: process.env.APPHOST,
                isSecure: false,
                isSameSite: isSameSite
              },
              validateFunc: function () {
                var _validateFunc = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee(req, session) {
                  var credentials;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          ;

                          if (!(process.env.AUTHFLOW === 'authorizaton_code' || process.env.AUTHFLOW === 'code')) {
                            _context.next = 8;
                            break;
                          }

                          _context.next = 4;
                          return req.server.app.cache.get(session.JSESSIONID);

                        case 4:
                          credentials = _context.sent;
                          return _context.abrupt("return", {
                            valid: true,
                            credentials: credentials
                          });

                        case 8:
                          return _context.abrupt("return", {
                            valid: true,
                            credentials: req.auth.credentials
                          });

                        case 9:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                function validateFunc(_x2, _x3) {
                  return _validateFunc.apply(this, arguments);
                }

                return validateFunc;
              }()
            };

            getLocation = function getLocation(req) {
              var route = process.env.REDIRECT == null ? '/callback' : '/' + process.env.REDIRECT;
              var info = req.server.info;
              var location = info.uri + route; // Need to do this for docker deployment

              if (info.host === '0.0.0.0') {
                location = "".concat(info.protocol, "://localhost:").concat(info.port).concat(route);
              }

              console.log("redirect set to: ".concat(location));
              return location;
            };

            if (!(process.env.AUTHFLOW == 'authorization_code' || process.env.AUTHFLOW === 'code')) {
              _context2.next = 18;
              break;
            }

            authURL = process.env.VIYA_SERVER;
            provider = {
              name: 'sas',
              protocol: 'oauth2',
              useParamsAuth: false,
              auth: authURL + '/SASLogon/oauth/authorize',
              token: authURL + '/SASLogon/oauth/token'
            };

            if (!(process.env.CLIENTID == null)) {
              _context2.next = 9;
              break;
            }

            throw 'Error: Please specify CLIENTID';

          case 9:
            bellAuthOptions = {
              provider: provider,
              password: uuid.v4(),
              clientId: process.env.CLIENTID.trim(),
              clientSecret: process.env.CLIENTSECRET == null ? ' ' : process.env.CLIENTSECRET,
              location: getLocation,
              isSecure: false
            };
            console.log("Bell Options\n                ".concat(JSON.stringify(bellAuthOptions, null, 4), "\n                "));
            _context2.next = 13;
            return hapiServer.register(bell);

          case 13:
            _context2.next = 15;
            return hapiServer.register(cookie);

          case 15:
            hapiServer.auth.strategy('sas', 'bell', bellAuthOptions);
            hapiServer.auth.strategy('session', 'cookie', authCookieOptions);
            hapiServer.auth["default"]('session');

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _SASauth.apply(this, arguments);
}

module.exports = SASauth;