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
'use strict'; // proxy server

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _SASauth = _interopRequireDefault(require("./SASauth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fs = require('fs');

var isDocker = require('is-docker');

var Hapi = require('@hapi/hapi'),
    inert = require('@hapi/inert'),
    vision = require('@hapi/vision'),
    HapiSwagger = require('hapi-swagger'),
    //  WebpackPlugin = require('hapi-webpack-plugin'),/* for hot restart */
hapiServer;

function server(userRouterTable, asset, rootHandler) {
  process.env.APPHOST_ADDR = process.env.APPHOST;
  var tls = null;
  var sConfig = {
    port: process.env.APPPORT,
    host: process.env.APPHOST_ADDR,

    /* debug   : {request: ['*']},*/
    routes: {
      cors: {
        origin: ['*'],
        credentials: true,
        additionalHeaders: ['multipart/form-data', 'content-disposition'],
        additionalExposedHeaders: ['location']
      }
    }
  };

  if (process.env.TLS != null) {
    var inp = process.env.TLS.split(' ');
    var tlsInfo = inp.filter(function (t) {
      return t.length > 0;
    }); //  console.log(tlsInfo);

    sConfig.tls = {
      key: fs.readFileSync(tlsInfo[1]),
      cert: fs.readFileSync(tlsInfo[0]),
      passphrase: tlsInfo[2]
    };
  }

  var fullpath = require('path').resolve(asset);

  console.log(fullpath);

  if (asset !== null) {
    sConfig.routes.files = {
      relativeTo: asset
    };
  }

  console.log(sConfig);
  hapiServer = Hapi.server(sConfig);

  var init = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var info, swaggerOptions, uri;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(process.env.AUTHFLOW === 'authorization_code' || process.env.AUTHFLOW === 'code')) {
                _context.next = 4;
                break;
              }

              _context.next = 3;
              return (0, _SASauth["default"])(hapiServer);

            case 3:
              info = _context.sent;

            case 4:
              ;
              swaggerOptions = {
                info: {
                  title: "API Documentation for ".concat(process.env.APPNAME),
                  version: process.env.APPVERSION == null ? '1.0.0' : process.env.APPVERSION
                },
                grouping: 'tags'
              };
              _context.next = 8;
              return hapiServer.register([inert, vision, {
                plugin: HapiSwagger,
                options: swaggerOptions
              }]);

            case 8:
              hapiServer.route(userRouterTable); // eslint-disable-next-line require-atomic-updates

              hapiServer.app.cache = hapiServer.cache({
                segment: 'session',
                expiresIn: 14 * 24 * 60 * 60 * 1000
              });
              _context.next = 12;
              return hapiServer.start();

            case 12:
              console.log("Visit ".concat(hapiServer.info.uri, "/documentation for documentation on the API"));
              uri = hapiServer.info.uri; // Need to do this for docker deployment

              if (hapiServer.info.host === '0.0.0.0') {
                uri = "".concat(hapiServer.info.protocol, "://localhost:").concat(hapiServer.info.port);
              }

              console.log("To access application visit ".concat(uri, "/").concat(process.env.APPNAME));

              if (isDocker() === true) {
                console.log("\n\t\t\t   Application is running in Docker\n\t\t\t\t  Use the port in your docker run command or docker compose file");
              }

            case 17:
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
    process.exit(1);
  });
  init();
}

var _default = server;
exports["default"] = _default;