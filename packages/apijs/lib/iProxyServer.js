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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// proxy server
var os = require('os');

var Hapi = require('@hapi/hapi'),
    h2o2 = require('@hapi/h2o2');

function iProxyServer() {
  //let host = (process.env.VHOST === '*') ? os.hostname() : process.env.VHOST;
  var sConfig = {
    port: process.env.APPPORT,
    host: process.env.APPHOST,
    routes: {
      cors: {
        origin: ['*'],
        credentials: true,
        additionalHeaders: ['multipart/form-data', 'content-disposition'],
        additionalExposedHeaders: ['location']
      }
    }
  };
  var hapiServer = Hapi.server(sConfig);

  var init = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var routes, uri;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return hapiServer.register([h2o2]);

            case 2:
              // let protocol = process.env.IAPPHOST.indexOf('https') !== -1 ? 'https' : 'http';
              routes = [{
                method: '*',
                path: '/{param*}',
                options: {
                  handler: checkAuth
                }
              }, {
                method: '*',
                path: '/callback',
                options: {
                  handler: callback
                }
              }];
              console.log(routes);
              hapiServer.route(routes);
              _context.next = 7;
              return hapiServer.start();

            case 7:
              console.log("Visit ".concat(hapiServer.info.uri, "/documentation for documentation on the API"));
              uri = hapiServer.info.uri; // Need to do this for docker deployment

              if (hapiServer.info.host === '0.0.0.0') {
                uri = "".concat(hapiServer.info.protocol, "://localhost:").concat(hapiServer.info.port);
              }

              console.log("To access application visit ".concat(uri, "/").concat(process.env.APPNAME));

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function init() {
      return _ref.apply(this, arguments);
    };
  }();

  process.on('unhandledRejection', function (err) {
    console.log(err);
    console.log('unhandled exception');
    process.exit(2);
  });
  init();

  function checkAuth(_x, _x2) {
    return _checkAuth.apply(this, arguments);
  }

  function _checkAuth() {
    _checkAuth = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, h) {
      var head, resp, k;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              head = _objectSpread({}, req.headers);

              if (head.cookie != null) {
                delete head.cookie;
              }

              resp = h.redirect("".concat(process.env.VIYA_SERVER, "/SASLogon/oauth/authorize?client_id=").concat(process.env.CLIENTID, "&redirect_uri=http://localhost:3000/api/callback&response_type=code"));

              for (k in head) {
                resp.header(k, head[k]);
              }

              ;
              return _context2.abrupt("return", resp.code(302));

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _checkAuth.apply(this, arguments);
  }

  function callback(_x3, _x4) {
    return _callback.apply(this, arguments);
  }

  function _callback() {
    _callback = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, h) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              console.log(req.headers);
              return _context3.abrupt("return", true);

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _callback.apply(this, arguments);
  }
}

var _default = iProxyServer;
exports["default"] = _default;