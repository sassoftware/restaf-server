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
var bell = require('@hapi/bell');

var uuid = require('uuid');

var debug = require('debug')('isasauth');

exports.plugin = {
  name: 'SASauth',
  version: '1.0.0',
  register: iSASauth
};

function iSASauth(_x, _x2) {
  return _iSASauth.apply(this, arguments);
}

function _iSASauth() {
  _iSASauth = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(server, options) {
    var bellAuthOptions, provider, host;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            debug(options);
            // test for k8s deployment
            host = options.host;

            if (options.ns != null) {
              host = "https://saslogon.".concat(options.ns, ".svc.cluster.local");
            } // ...


            provider = {
              name: 'sas',
              protocol: 'oauth2',
              useParamsAuth: false,
              auth: host + '/SASLogon/oauth/authorize',
              token: host + '/SASLogon/oauth/token',
              profileMethod: 'get',
              profile: function () {
                var _profile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(credentials, params, get) {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          server.log('SASAuth profile', credentials);

                        case 1:
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
              clientId: options.clientId,
              clientSecret: options.clientSecret,
              //   isSameSite  : options.isSameSite,
              isSecure: options.isSecure
            }; // console.log('SASAuth options', bellAuthOptions);

            server.log('SASAuth', bellAuthOptions);
            _context2.next = 8;
            return server.register(bell);

          case 8:
            server.auth.strategy('sas', 'bell', bellAuthOptions);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _iSASauth.apply(this, arguments);
}