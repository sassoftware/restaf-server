"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _setupAuth = _interopRequireDefault(require("./plugins/setupAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
var fs = require('fs');

var debug = require('debug')('iservice'); // let isDocker = require('is-docker');


var Hapi = require('@hapi/hapi'); // const { isSameSiteNoneCompatible } = require('should-send-same-site-none');


var NodeCache = require("node-cache-promise");

var Vision = require('@hapi/vision');

var inert = require('@hapi/inert'); // let HapiSwagger = require('hapi-swagger');


var selfsigned = require('selfsigned');

var os = require('os');

function iService(userRouteTable, useDefault, asset, allAppEnv, serverMode, userInfo) {
  // process.env.APPHOST_ADDR = process.env.APPHOST;
  var init = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var defaultMaxBytes, maxBytes, isSameSite, isSecure, _process$env$SAMESITE, _process$env$SAMESITE2, s1, s2, sConfig, hapiServer, nodeCacheOptions, storeCache, visionOptions, options, swaggerOptions, override, allRoutes, hh, msg;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (process.env.APPHOST === '*') {
                process.env.APPHOST = os.hostname();
              }

              defaultMaxBytes = 10485760;

              if (isNaN(process.env.PAYLOADMAXBYTES)) {
                maxBytes = defaultMaxBytes;
              } else {
                maxBytes = Number(process.env.PAYLOADMAXBYTES);
              }

              isSameSite = 'None';
              isSecure = false;

              if (process.env.SAMESITE != null) {
                _process$env$SAMESITE = process.env.SAMESITE.split(','), _process$env$SAMESITE2 = _slicedToArray(_process$env$SAMESITE, 2), s1 = _process$env$SAMESITE2[0], s2 = _process$env$SAMESITE2[1];
                isSameSite = s1;
                isSecure = s2 === 'secure' ? true : false;

                if (process.env.HTTPS !== 'true') {
                  isSecure = false;
                }
              }

              sConfig = {
                port: process.env.APPPORT,
                host: process.env.APPHOST,
                state: {
                  isSameSite: isSameSite,
                  isSecure: isSecure
                },
                routes: {
                  payload: {
                    maxBytes: maxBytes
                  },
                  cors: {
                    origin: ['*'],
                    credentials: true,
                    "headers": ["Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"]
                    /*
                    'Access-Control-Allow-Methods': ['GET', 'POST', 'OPTIONS'],
                    additionalHeaders             : ['multipart/form-data', 'content-disposition'],
                    additionalExposedHeaders      : ['location'],
                    */

                  }
                }
              };

              if (process.env.HAPIDEBUG === 'YES') {
                sConfig.debug = {
                  request: '*'
                };
              }

              debug(JSON.stringify(sConfig, null, 4));

              if (!(process.env.HTTPS === 'true')) {
                _context.next = 16;
                break;
              }

              _context.next = 12;
              return getCertificates();

            case 12:
              sConfig.tls = _context.sent;
              debug('Setup of SSL certificates completed');
              _context.next = 17;
              break;

            case 16:
              debug('Running with no SSL certificates');

            case 17:
              if (asset !== null) {
                sConfig.routes.files = {
                  relativeTo: asset
                };
              }

              debug("Application information: \n\t\tAPPLOC  : ".concat(process.env.APPLOC, "\n\t\tAPPENTRY: ").concat(process.env.APPENTRY, "\n"));
              hapiServer = Hapi.server(sConfig);
              /*
              const cache = hapiServer.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });
              hapiServer.app.cache = cache;
              */

              nodeCacheOptions = {
                stdTTL: 36000,
                checkPeriod: 3600,
                errorOnMissing: true,
                useClones: false,
                deleteOnExpire: true
              };
              storeCache = new NodeCache(nodeCacheOptions);
              hapiServer.app.cache = storeCache; // common plugins

              visionOptions = {
                engines: {
                  html: require('handlebars')
                },
                relativeTo: __dirname,
                path: '.'
              };
              _context.next = 26;
              return hapiServer.register(Vision);

            case 26:
              hapiServer.views(visionOptions);
              _context.next = 29;
              return hapiServer.register(inert);

            case 29:
              if (!(process.env.HTTPS === 'true')) {
                _context.next = 32;
                break;
              }

              _context.next = 32;
              return hapiServer.register({
                plugin: require('hapi-require-https'),
                options: {}
              });

            case 32:
              _context.next = 34;
              return hapiServer.register({
                plugin: require('hapi-pino'),
                options: {
                  prettyPrint: process.env.NODE_ENV !== 'production',
                  level: process.env.LOGLEVEL == null ? 'silent' : process.env.LOGLEVEL
                }
              });

            case 34:
              // setup authentication related plugins
              options = {
                serverMode: serverMode,

                /* api or app */
                authFlow: process.env.AUTHFLOW,
                host: process.env.VIYA_SERVER,
                isSameSite: isSameSite,
                isSecure: isSecure,
                ns: allAppEnv.LOGONPAYLOAD != null ? allAppEnv.LOGONPAYLOAD.ns : null,
                redirect: process.env.REDIRECT,
                clientId: process.env.CLIENTID,
                clientSecret: process.env.CLIENTSECRET,
                redirectTo: "/".concat(process.env.APPNAME, "/logon"),
                allAppEnv: allAppEnv,
                useHapiCookie: true,
                appName: process.env.APPNAME,
                appHost: process.env.APPHOST,
                appPort: process.env.APPPORT,
                userRouteTable: userRouteTable,
                useDefault: useDefault,

                /* not used - left here for potential reuse */
                userInfo: userInfo,
                https: process.env.HTTPS,
                authDefault: false,

                /* set later in setDefaultRoutes */
                authLogon: false
                /* set later in setDefaultRoutes */

              };
              debug('Options', options);
              _context.next = 38;
              return (0, _setupAuth["default"])(hapiServer, options);

            case 38:
              hapiServer.log('Plugin', process.env.PLUGIN);

              if (!(process.env.PLUGIN === 'hapi-swagger' && serverMode === 'api')) {
                _context.next = 47;
                break;
              }

              swaggerOptions = {
                "info": {
                  "title": "API for ".concat(process.env.APPNAME),
                  "version": "0.0.1",
                  "description": "This document was auto-generated at run time"
                },
                "schemes": ["http", "https"],
                "cors": true,
                "debug": true,
                "jsonPath": "/".concat(options.appName, "/swagger.json"),
                "jsonRoutePath": "/".concat(options.appName, "/swagger.json"),
                "documentationPage": true,
                "documentationPath": "/".concat(options.appName, "/documentation"),
                "swaggerUI": true,
                "swaggerUIPath": "/".concat(options.appName, "/swaggerui"),
                auth: options.authDefault
              };

              if (userInfo != null) {
                override = userInfo(options, 'SWAGGEROPTIONS');
                swaggerOptions = _objectSpread(_objectSpread({}, swaggerOptions), override);
              }

              debug('Swagger Options:', swaggerOptions);
              _context.next = 45;
              return hapiServer.register({
                plugin: require('hapi-swagger'),
                options: swaggerOptions
              });

            case 45:
              _context.next = 48;
              break;

            case 47:
              if (process.env.PLUGIN == 'hapi-openapi' && serverMode === 'api') {
                console.log('hapi-openapi', 'coming soon');
              }

            case 48:
              //
              // Start server
              //
              allRoutes = hapiServer.table();
              debug(allRoutes);
              _context.next = 52;
              return hapiServer.start();

            case 52:
              hh = hapiServer.info.uri;
              hh = hh.replace(/0.0.0.0/, 'localhost');
              console.log('Server Start Time: ', Date());
              msg = options.serverMode === 'app' ? "Visit ".concat(hh, "/").concat(process.env.APPNAME, " to access application") : "Visit ".concat(hh, "/").concat(process.env.APPNAME, "/api to access swagger");
              console.log(msg);
              console.log('NOTE: If running in container then use the port number you mapped to');
              process.env.APPSERVER = "".concat(hh, "/").concat(process.env.APPNAME);
              process.env.HEALTH = 'true';
              console.log('Initialization completed ============================================================');

            case 61:
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

function getCertificates() {
  return _getCertificates.apply(this, arguments);
}

function _getCertificates() {
  _getCertificates = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var tls;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            tls = {};

            if (!(process.env.TLS_CERT != null)) {
              _context2.next = 7;
              break;
            }

            /* backward compatability */
            debug('TLS set: TLS_CERT');
            tls.cert = fs.readFileSync(process.env.TLS_CERT);
            tls.key = fs.readFileSync(process.env.TLS_KEY);
            _context2.next = 25;
            break;

          case 7:
            if (!(process.env.TLS_PFX != null)) {
              _context2.next = 13;
              break;
            }

            debug('TLS set: PFX');
            tls.pfx = fs.readFileSync(process.env.TLS_PFX);

            if (process.env.TLS_PW != null) {
              tls.passphrase = process.env.TLS_PW;
            }

            _context2.next = 25;
            break;

          case 13:
            if (!(process.env.TLS_CRT != null)) {
              _context2.next = 19;
              break;
            }

            /* new key names to conform to k8s*/
            debug('TLS set: TLS_CRT');
            tls.cert = process.env.TLS_CRT;
            tls.key = process.env.TLS_KEY;
            _context2.next = 25;
            break;

          case 19:
            if (!(process.env.TLS_CREATE != null)) {
              _context2.next = 25;
              break;
            }

            /* unsigned certificate */
            debug('TLS set: TLS_CREATE=', process.env.TLS_CREATE);
            _context2.next = 23;
            return getTls();

          case 23:
            tls = _context2.sent;
            debug(tls);

          case 25:
            if (process.env.TLS_CABUNDLE != null) {
              tls.CA = fs.readFileSync(process.env.TLS_CABUNDLE);
            }

            if (!(Object.keys(tls).length > 0)) {
              _context2.next = 30;
              break;
            }

            return _context2.abrupt("return", tls);

          case 30:
            debug('Warning: The current protocol is https: No TLS certificate information has been specified.');
            return _context2.abrupt("return", tls);

          case 32:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getCertificates.apply(this, arguments);
}

function getTls() {
  return _getTls.apply(this, arguments);
}

function _getTls() {
  _getTls = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var options, subjt, subj, d, attr, pems, tls;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            options = {
              keySize: 2048,
              days: 360,
              algorithm: "sha256",
              clientCertificate: true,
              extensions: {}
            };
            subjt = process.env.TLS_CREATE.replaceAll('"', '').trim();
            subj = subjt.split(',');
            d = {};
            subj.map(function (c) {
              var r = c.split(':');
              d[r[0]] = r[1];
              return {
                value: r[1]
              };
            }); //  TLS_CREATE=C:US,ST:NC,L:Cary,O:SAS Institute,OU:STO,CN:localhost,ALT:na.sas.com

            attr = [{
              name: 'commonName',
              value: d.CN
              /*process.env.APPHOST*/

            }, {
              name: 'countryName',
              value: d.C
            }, {
              shortName: 'ST',
              value: d.ST
            }, {
              name: 'localityName',
              value: d.L
            }, {
              name: 'organizationName',
              value: d.O
            }, {
              shortName: 'OU',
              value: d.OU
            }];
            options.extensions.altNames = [//	{ type: 6, value: `http://${process.env.APPHOST}:${process.env.APPPORT}/${process.env.APPNAME}` },
            {
              type: 6,
              value: "https://".concat(process.env.APPHOST, ":").concat(process.env.APPPORT, "/").concat(process.env.APPNAME)
            }, {
              type: 6,
              value: "https://".concat(process.env.APPHOST, ":").concat(process.env.APPPORT, "/").concat(process.env.APPNAME, "/api")
            }, {
              type: 6,
              value: "https://".concat(process.env.APPHOST, ":").concat(process.env.APPPORT, "/").concat(process.env.APPNAME, "/logon")
            }, {
              type: 6,
              value: "https://".concat(process.env.APPHOST, "/").concat(process.env.APPNAME)
            }, {
              type: 6,
              value: "https://".concat(process.env.APPHOST, "/").concat(process.env.APPNAME, "/api")
            }, {
              type: 6,
              value: "https://".concat(process.env.APPHOST, "/").concat(process.env.APPNAME, "/logon")
            }];
            debug('tls options ', JSON.stringify(options, null, 4));
            pems = selfsigned.generate(attr, options);
            tls = {
              cert: pems.cert,
              key: pems["private"]
            };
            return _context3.abrupt("return", tls);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getTls.apply(this, arguments);
}

var _default = iService;
exports["default"] = _default;