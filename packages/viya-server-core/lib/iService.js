"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _setupAuth = _interopRequireDefault(require("./plugins/setupAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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
var fs = require('fs'); // let isDocker = require('is-docker');


var Hapi = require('@hapi/hapi');

var _require = require('should-send-same-site-none'),
    isSameSiteNoneCompatible = _require.isSameSiteNoneCompatible;

var NodeCache = require("node-cache-promise");

var Vision = require('@hapi/vision');

var inert = require('@hapi/inert');

var HapiSwagger = require('hapi-swagger');

var selfsigned = require('selfsigned');

var os = require('os');

function iService(userRouteTable, useDefault, asset, allAppEnv, serverMode) {
  // process.env.APPHOST_ADDR = process.env.APPHOST;
  var init = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var defaultMaxBytes, maxBytes, isSameSite, isSecure, _process$env$SAMESITE, _process$env$SAMESITE2, s1, s2, sConfig, tls, hapiServer, nodeCacheOptions, storeCache, visionOptions, options, swaggerOptions, js, allRoutes, hh, msg;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
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
                console.log(process.env.HTTPS);

                if (process.env.HTTPS !== 'true') {
                  isSecure = false;
                }
              }

              sConfig = {
                port: process.env.APPPORT,
                host: process.env.APPHOST,
                state: {
                  isSameSite: isSameSite,
                  isSecure: isSecure,
                  contextualize: function () {
                    var _contextualize = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(definition, request) {
                      var userAgent;
                      return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              userAgent = request.headers['user-agent'] || false;

                              if (userAgent && isSameSiteNoneCompatible(userAgent)) {
                                definition.isSecure = isSecure;
                                definition.isSameSite = isSameSite;
                              }

                              request.response.vary('User-Agent');

                            case 3:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee);
                    }));

                    function contextualize(_x, _x2) {
                      return _contextualize.apply(this, arguments);
                    }

                    return contextualize;
                  }()
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

              tls = {};

              if (!(process.env.HTTPS === 'true')) {
                _context2.next = 18;
                break;
              }

              if (process.env.TLS_CERT != null) {
                console.log('TLS set: TLS_CERT');
                tls.cert = fs.readFileSync(process.env.TLS_CERT);
                tls.key = fs.readFileSync(process.env.TLS_KEY);
              } else if (process.env.TLS_PFX != null) {
                console.log('TLS set: PFX');
                tls.pfx = fs.readFileSync(process.env.TLS_PFX);

                if (process.env.TLS_PW != null) {
                  tls.passphrase = process.env.TLS_PW;
                }
              } else if (process.env.TLS_CRT != null) {
                console.log('TLS set: TLS_CRT');
                tls.cert = process.env.TLS_CRT;
                tls.key = process.env.TLS_KEY;
              }

              if (process.env.TLS_CABUNDLE != null) {
                tls.CA = fs.readFileSync(process.env.TLS_CABUNDLE);
              }

              if (!(Object.keys(tls).length === 0 && process.env.TLS_CREATE != null)) {
                _context2.next = 17;
                break;
              }

              console.log('TLS set: TLS_CREATE');
              _context2.next = 16;
              return getTls();

            case 16:
              tls = _context2.sent;

            case 17:
              if (Object.keys(tls).length > 0) {
                sConfig.tls = tls;
              } else {
                console.log('Warning: No TLS certificate information specified');
              }

            case 18:
              if (asset !== null) {
                sConfig.routes.files = {
                  relativeTo: asset
                };
              }

              console.log("Application information: \n\t\tAPPLOC  : ".concat(process.env.APPLOC, "\n\t\tAPPENTRY: ").concat(process.env.APPENTRY, "\n"));
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
              _context2.next = 27;
              return hapiServer.register(Vision);

            case 27:
              hapiServer.views(visionOptions);
              _context2.next = 30;
              return hapiServer.register(inert);

            case 30:
              _context2.next = 32;
              return hapiServer.register({
                plugin: require('hapi-require-https'),
                options: {}
              });

            case 32:
              _context2.next = 34;
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
                authFlow: process.env.AUTHFLOW,
                host: process.env.VIYA_SERVER,
                isSameSite: isSameSite,
                isSecure: isSecure,
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
                https: process.env.HTTPS
              };
              hapiServer.log('Options', options);

              if (process.env.HTTPS === 'true') {
                hapiServer.log('TLS_CREATE', process.env.TLS_CREATE);
                hapiServer.log('TLS', tls);
              }

              ;
              _context2.next = 40;
              return (0, _setupAuth["default"])(hapiServer, options);

            case 40:
              hapiServer.log('Plugin', process.env.PLUGIN);

              if (!(process.env.PLUGIN === 'hapi-swagger' && serverMode === 'api')) {
                _context2.next = 50;
                break;
              }

              swaggerOptions = {
                "swagger": "2.0",
                "info": {
                  "title": "API for ".concat(process.env.APPNAME),
                  "version": "0.0.1",
                  "description": "This document was auto-generated at run time"
                },
                "schemes": ["https", "http"],
                "cors": true,
                "debug": true,
                "jsonRoutePath": "/".concat(process.env.APPNAME, "/swagger.json"),
                "documentationPage": true,
                "documentationPath": "/".concat(process.env.APPNAME, "/documentation") // auth               : options.defaultStrategy

              };

              if (process.env.SWAGGER != null) {
                js = fs.readFileSync(process.env.SWAGGER, 'utf8');
                swaggerOptions = JSON.parse(js);
              }

              if (process.env.SWAGGERHOST != null) {
                swaggerOptions.host = process.env.SWAGGERHOST;
              }

              hapiServer.log('hapi-swagger', swaggerOptions);
              _context2.next = 48;
              return hapiServer.register({
                plugin: HapiSwagger,
                options: swaggerOptions
              });

            case 48:
              _context2.next = 51;
              break;

            case 50:
              if (process.env.PLUGIN == 'hapi-openapi' && serverMode === 'api') {
                console.log('hapi-openapi', 'coming soon');
              }

            case 51:
              //
              // Start server
              //
              allRoutes = hapiServer.table();
              console.table(allRoutes);
              _context2.next = 55;
              return hapiServer.start();

            case 55:
              hh = hapiServer.info.uri.replace(/0.0.0.0/, 'localhost');
              console.log('Server Start Time: ', Date());
              msg = options.serverMode === 'app' ? "Visit ".concat(hh, "/").concat(process.env.APPNAME, " to access application") : "Visit ".concat(hh, "/").concat(process.env.APPNAME, "/api to access swagger");
              console.log(msg);
              console.log('NOTE: If running in container then use the port number you mapped to');
              process.env.APPSERVER = "".concat(hh, "/").concat(process.env.APPNAME);

            case 61:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
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
/*
function decodeTLS (s) {
	let buff = Buffer.from(s, 'base64');
	let t  = buff.toString();
	console.log(t);
	let at = t.split(' ');
	let f = (at.length > 1) ? at[1] : at[0];
	console.log(f);
	return f;
}
*/


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
              value: process.env.APPHOST
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
            options.extensions.altNames = [{
              type: 6,
              value: "http://".concat(process.env.APPHOST, ":").concat(process.env.APPPORT, "/").concat(process.env.APPNAME)
            }, {
              type: 6,
              value: "https://".concat(process.env.APPHOST, ":").concat(process.env.APPPORT, "/").concat(process.env.APPNAME)
            }, {
              type: 6,
              value: "https://".concat(process.env.APPHOST, ":").concat(process.env.APPPORT, "/").concat(process.env.APPNAME, "/api")
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
            pems = selfsigned.generate(attr, options);
            tls = {
              cert: pems.cert,
              key: pems["private"]
            };
            return _context3.abrupt("return", tls);

          case 10:
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