"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _setupAuth = _interopRequireDefault(require("./plugins/setupAuth"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var debug = require('debug')('service');
var debug2 = require('debug')('tls');
// let isDocker = require('is-docker');
var Hapi = require('@hapi/hapi');
var H202 = require('@hapi/h2o2');
// const { isSameSiteNoneCompatible } = require('should-send-same-site-none');
var NodeCache = require("node-cache-promise");
var Vision = require('@hapi/vision');
var inert = require('@hapi/inert');
var selfsigned = require('selfsigned');
var os = require('os');
function iService(userRouteTable, useDefault, asset, allAppEnv, serverMode, userInfo) {
  // process.env.APPHOST_ADDR = process.env.APPHOST;
  var init = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var defaultMaxBytes, maxBytes, isSameSite, isSecure, _process$env$SAMESITE, _process$env$SAMESITE2, s1, s2, sConfig, hapiServer, nodeCacheOptions, storeCache, visionOptions, options, swaggerOptions, override, allRoutes, hh, msg;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
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
              _context.n = 2;
              break;
            }
            _context.n = 1;
            return getCertificates();
          case 1:
            sConfig.tls = _context.v;
            debug('Setup of SSL certificates completed');
            _context.n = 3;
            break;
          case 2:
            debug('Running with no SSL certificates');
          case 3:
            if (asset !== null) {
              sConfig.routes.files = {
                relativeTo: asset
              };
            }
            debug2("Application information: \n\t\tAPPLOC  : ".concat(process.env.APPLOC, "\n\t\tAPPENTRY: ").concat(process.env.APPENTRY, "\n"));
            hapiServer = Hapi.server(sConfig);
            /*
            const cache = hapiServer.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });
            hapiServer.app.cache = cache;
            */
            nodeCacheOptions = {
              stdTTL: 24 * 60 * 60 * 1000,
              checkPeriod: 3600,
              errorOnMissing: true,
              useClones: false,
              deleteOnExpire: true
            };
            storeCache = new NodeCache(nodeCacheOptions);
            hapiServer.app.cache = storeCache;

            // common plugins
            visionOptions = {
              engines: {
                html: require('handlebars')
              },
              relativeTo: __dirname,
              path: '.'
            };
            _context.n = 4;
            return hapiServer.register(Vision);
          case 4:
            hapiServer.views(visionOptions);
            _context.n = 5;
            return hapiServer.register(inert);
          case 5:
            if (!(process.env.HTTPS === 'true')) {
              _context.n = 6;
              break;
            }
            _context.n = 6;
            return hapiServer.register({
              plugin: require('hapi-require-https'),
              options: {}
            });
          case 6:
            _context.n = 7;
            return hapiServer.register(H202);
          case 7:
            /*
            await hapiServer.register({
            	plugin : require('hapi-pino'),
            	options: {
            		prettyPrint: process.env.NODE_ENV !== 'production',
            		level      : process.env.LOGLEVEL == null ? 'silent' : process.env.LOGLEVEL,
            	},
            });
            */
            //
            // setup authentication related plugins
            options = {
              serverMode: serverMode,
              authFlow: process.env.AUTHFLOW,
              host: process.env.VIYA_SERVER,
              useLogon: process.env.USELOGON != null && process.env.USELOGON.toUpperCase() === 'FALSE' ? false : true,
              isSameSite: isSameSite,
              isSecure: isSecure,
              ns: allAppEnv.LOGONPAYLOAD != null ? allAppEnv.LOGONPAYLOAD.ns : null,
              nsHost: allAppEnv.LOGONPAYLOAD != null ? allAppEnv.LOGONPAYLOAD.nsHost : null,
              redirect: process.env.REDIRECT,
              clientId: process.env.CLIENTID,
              clientSecret: process.env.CLIENTSECRET,
              pkce: allAppEnv.LOGONPAYLOAD.pkce,
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
              authLogon: false /* set later in setDefaultRoutes */
            };
            debug2('Options', options);
            if (!(process.env.AUTHFLOW != null)) {
              _context.n = 9;
              break;
            }
            _context.n = 8;
            return (0, _setupAuth["default"])(hapiServer, options);
          case 8:
            if (process.env.PREAUTH === 'YES') {
              console.log('Preauth enabled');
              hapiServer.ext('onPreAuth', function (request, h) {
                debugger;
                if (!request.auth.isAuthenticated && !request.path.startsWith("/login")) {
                  var redirectTo = "".concat(request.path, "?").concat(new URLSearchParams(request.query).toString());
                  console.log('Redirect to login', {
                    redirectTo: redirectTo
                  });
                  debugger;
                  return h.redirect("/login").takeover();
                }
                return h["continue"];
              });
            }
          case 9:
            console.log('Plugin', process.env.PLUGIN);
            if (!(process.env.PLUGIN === 'hapi-swagger' && serverMode === 'api')) {
              _context.n = 11;
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
            _context.n = 10;
            return hapiServer.register({
              plugin: serverMode,
              options: swaggerOptions
            });
          case 10:
            _context.n = 12;
            break;
          case 11:
            if (process.env.PLUGIN == 'hapi-openapi' && serverMode === 'api') {
              console.log('hapi-openapi', 'coming soon');
            }
          case 12:
            //
            // Start server
            //
            // eslint-disable-next-line no-unused-vars
            allRoutes = hapiServer.table();
            _context.n = 13;
            return hapiServer.start();
          case 13:
            hh = hapiServer.info.uri;
            hh = hh.replace(/0.0.0.0/, 'localhost');
            console.log('====================================================================================');
            console.log('Server Start Time: ', Date());
            msg = options.serverMode === 'app' ? "Visit ".concat(hh, "/").concat(process.env.APPNAME, " to access application") : "Visit ".concat(hh, "/").concat(process.env.APPNAME, "/api to access swagger");
            console.log('\x1b[1m%s\x1b[0m', msg);
            console.log('NOTE: If running in container use the exported port');
            process.env.APPSERVER = "".concat(hh, "/").concat(process.env.APPNAME);
            process.env.HEALTH = 'true';
            console.log('====================================================================================');
          case 14:
            return _context.a(2);
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
  _getCertificates = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var options, tlsdir;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          options = null;
          tlsdir = process.env.SSLCERT;
          console.log('Reading SSL certificates from ', tlsdir);
          if (!(tlsdir != null && tlsdir.trim().length > 0)) {
            _context2.n = 1;
            break;
          }
          options = readTLS(tlsdir);
          options.rejectUnauthorized = true;
          _context2.n = 3;
          break;
        case 1:
          console.log('No SSL certificates found, generating self-signed certificates');
          _context2.n = 2;
          return getTls();
        case 2:
          options = _context2.v;
          options.rejectUnauthorized = false;
        case 3:
          return _context2.a(2, options);
      }
    }, _callee2);
  }));
  return _getCertificates.apply(this, arguments);
}
function readTLS(tlsdir) {
  console.log("[Note] Using TLS dir: " + tlsdir);
  if (fs.existsSync(tlsdir) === false) {
    console.log("[Warning] Specified TLS dir does not exist: " + tlsdir);
    return null;
  }
  var listOfFiles = fs.readdirSync(tlsdir);
  console.log("[Note] TLS/SSL files found: " + listOfFiles);
  var options = {};
  for (var i = 0; i < listOfFiles.length; i++) {
    var fname = listOfFiles[i];
    var name = tlsdir + '/' + listOfFiles[i];
    var key = fname.split('.')[0];
    options[key] = fs.readFileSync(name, {
      encoding: 'utf8'
    });
  }
  console.log('TLS FILES', Object.keys(options));
  return options;
}
function getTls() {
  return _getTls.apply(this, arguments);
}
function _getTls() {
  _getTls = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var options, subjt, subj, d, attr, pems, tls;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
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
          });

          //  TLS_CREATE=C:US,ST:NC,L:Cary,O:SAS Institute,OU:STO,CN:localhost,ALT:na.sas.com
          attr = [{
            name: 'commonName',
            value: d.CN /*process.env.APPHOST*/
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
          /*
          	options.extensions.altNames = [
          		//	{ type: 6, value: `http://${process.env.APPHOST}:${process.env.APPPORT}/${process.env.APPNAME}` },
          		{ type: 6, value: `https://${process.env.APPHOST}:${process.env.APPPORT}/${process.env.APPNAME}` },
          		{ type: 6, value: `https://${process.env.APPHOST}:${process.env.APPPORT}/${process.env.APPNAME}/api` },
          		{ type: 6, value: `https://${process.env.APPHOST}:${process.env.APPPORT}/${process.env.APPNAME}/logon` },
          		{ type: 6, value: `https://${process.env.APPHOST}/${process.env.APPNAME}` },
          		{ type: 6, value: `https://${process.env.APPHOST}/${process.env.APPNAME}/api` },
          		{ type: 6, value: `https://${process.env.APPHOST}/${process.env.APPNAME}/logon` },
          	];
          	
          	options.extensions.altNames = [
          		  { type: 2, value: 'localhost' },     // DNS
          		  { type: 7, ip: '127.0.0.1' },        // IPv4
          		  { type: 7, ip: '::1' }               // IPv6
          		];
          */
          options.extensions = [{
            name: 'subjectAltName',
            altNames: [{
              type: 2,
              value: 'localhost'
            },
            // DNS
            {
              type: 7,
              ip: '127.0.0.1'
            },
            // IPv4
            {
              type: 7,
              ip: '::1'
            } // IPv6
            ]
          }];
          console.log('tls options ', JSON.stringify(options, null, 4));
          pems = selfsigned.generate(attr, options);
          tls = {
            cert: pems.cert,
            key: pems["private"]
          };
          return _context3.a(2, tls);
      }
    }, _callee3);
  }));
  return _getTls.apply(this, arguments);
}
var _default = exports["default"] = iService;