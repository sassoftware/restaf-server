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
      var defaultMaxBytes, maxBytes, isSameSite, isSecure, _process$env$SAMESITE, _process$env$SAMESITE2, s1, s2, sConfig, tls, hapiServer, nodeCacheOptions, storeCache, visionOptions, options, swaggerOptions, js, hh, msg;

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
              }

              sConfig = {
                port: process.env.APPPORT,
                host: process.env.APPHOST,
                debug: {
                  request: '*'
                },
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
              tls = {};

              if (!(process.env.HTTPS === 'YES')) {
                _context2.next = 19;
                break;
              }

              if (!(process.env.TLS_CREATE != null)) {
                _context2.next = 13;
                break;
              }

              _context2.next = 12;
              return getTls();

            case 12:
              tls = _context2.sent;

            case 13:
              if (process.env.TLS_CERT != null) {
                tls.cert = fs.readFileSync(process.env.TLS_CERT);
              }

              if (process.env.TLS_CERT != null) {
                tls.key = fs.readFileSync(process.env.TLS_KEY);
              }

              if (process.env.TLS_CABUNDLE != null) {
                tls.CA = fs.readFileSync(process.env.TLS_CABUNDLE);
              }

              if (process.env.TLS_PFX != null) {
                tls.pfx = fs.readFileSync(process.env.TLS_PFX);
              }

              if (process.env.TLS_PW != null) {
                tls.passphrase = process.env.TLS_PW;
              }

              if (Object.keys(tls).length > 0) {
                sConfig.tls = tls;
              }

            case 19:
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
              _context2.next = 28;
              return hapiServer.register(Vision);

            case 28:
              hapiServer.views(visionOptions);
              _context2.next = 31;
              return hapiServer.register(inert);

            case 31:
              _context2.next = 33;
              return hapiServer.register({
                plugin: require('hapi-require-https'),
                options: {}
              });

            case 33:
              _context2.next = 35;
              return hapiServer.register({
                plugin: require('hapi-pino'),
                options: {
                  prettyPrint: process.env.NODE_ENV !== 'production',
                  level: process.env.PINOLEVEL == null ? 'silent' : process.env.PINOLEVEL
                }
              });

            case 35:
              // setup authentication related plugins
              options = {
                serverMode: serverMode,
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
                userRouteTable: userRouteTable,
                useDefault: useDefault
                /* not used - left here for potential reuse */

              };
              hapiServer.log(options);

              if (process.env.HTTPS === 'YES') {
                hapiServer.log("tls \n\t\t\t".concat(process.env.TLS_CREATE, "\n\t\t\t").concat(tls));
              }

              ;
              _context2.next = 41;
              return (0, _setupAuth["default"])(hapiServer, options);

            case 41:
              if (!(process.env.PLUGIN == 'hapi-swagger' && serverMode === 'api')) {
                _context2.next = 49;
                break;
              }

              swaggerOptions = {
                info: {
                  title: "API for ".concat(process.env.APPNAME),
                  description: 'This document was auto-generated at run time'
                },
                auth: 'session'
              };
              js = fs.readFileSync(process.env.SWAGGER, 'utf8');
              swaggerOptions = JSON.parse(js);
              _context2.next = 47;
              return hapiServer.register({
                plugin: HapiSwagger,
                options: swaggerOptions
              });

            case 47:
              _context2.next = 50;
              break;

            case 49:
              if (process.env.PLUGIN == 'hapi-openapi' && serverMode === 'api') {
                console.log('coming soon');
              }

            case 50:
              _context2.next = 52;
              return hapiServer.start();

            case 52:
              hh = hapiServer.info.uri.replace(/0.0.0.0/, 'localhost');
              console.log('Server Start Time: ', Date());
              msg = options.serverMode === 'app' ? "Visit ".concat(hh, "/").concat(process.env.APPNAME, " to access application") : "Visit ".concat(hh, "/").concat(process.env.APPNAME, "/api to access swagger");
              console.log(msg);
              console.log('NOTE: If running in container then use the port number you mapped to');
              process.env.APPSERVER = "".concat(hh, "/").concat(process.env.APPNAME);

            case 58:
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