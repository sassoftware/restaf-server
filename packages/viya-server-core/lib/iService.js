"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _setupAuth = _interopRequireDefault(require("./plugins/setupAuth"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
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
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var defaultMaxBytes, maxBytes, isSameSite, isSecure, _process$env$SAMESITE, _process$env$SAMESITE2, s1, s2, sConfig, hapiServer, nodeCacheOptions, storeCache, visionOptions, options, swaggerOptions, override, allRoutes, hh, msg;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
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
            debug2("Application information: \n\t\tAPPLOC  : ".concat(process.env.APPLOC, "\n\t\tAPPENTRY: ").concat(process.env.APPENTRY, "\n"));
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
            hapiServer.app.cache = storeCache;

            // common plugins
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
            return hapiServer.register(H202);
          case 34:
            /*
            await hapiServer.register({
            	plugin : require('hapi-pino'),
            	options: {
            		prettyPrint: process.env.NODE_ENV !== 'production',
            		level      : process.env.LOGLEVEL == null ? 'silent' : process.env.LOGLEVEL,
            	},
            });
            */
            // setup authentication related plugins
            options = {
              serverMode: serverMode === null ? 'app' : 'api',
              /* api or app */
              authFlow: process.env.AUTHFLOW,
              host: process.env.VIYA_SERVER,
              isSameSite: isSameSite,
              isSecure: isSecure,
              ns: allAppEnv.LOGONPAYLOAD != null ? allAppEnv.LOGONPAYLOAD.ns : null,
              nsHost: allAppEnv.LOGONPAYLOAD != null ? allAppEnv.LOGONPAYLOAD.nsHost : null,
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
              authLogon: false /* set later in setDefaultRoutes */
            };
            debug2('Options', options);
            if (!(process.env.AUTHFLOW != null)) {
              _context.next = 39;
              break;
            }
            _context.next = 39;
            return (0, _setupAuth["default"])(hapiServer, options);
          case 39:
            hapiServer.log('Plugin', process.env.PLUGIN);
            if (!(process.env.PLUGIN === 'hapi-swagger' && serverMode !== null)) {
              _context.next = 48;
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
            _context.next = 46;
            return hapiServer.register({
              plugin: serverMode,
              options: swaggerOptions
            });
          case 46:
            _context.next = 49;
            break;
          case 48:
            if (process.env.PLUGIN == 'hapi-openapi' && serverMode !== null) {
              console.log('hapi-openapi', 'coming soon');
            }
          case 49:
            //
            // Start server
            //
            // eslint-disable-next-line no-unused-vars
            allRoutes = hapiServer.table();
            _context.next = 52;
            return hapiServer.start();
          case 52:
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
          case 62:
          case "end":
            return _context.stop();
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
  _getCertificates = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var tls;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          tls = {};
          debug2('Getting tls certificates');
          debug2('tls.crt', process.env['tls.crt'] != null);
          debug2('tls.key', process.env['tls.key'] != null);
          debug2('TLS_PFX', process.env.TLS_PFX != null);
          debug2('TLS_PW', process.env.TLS_PW != null);
          debug2('TLS_CERT', process.env.TLS_CERT != null);
          debug2('TLS_CRT', process.env.TLS_CRT != null);
          debug2('TLS_CREATE', process.env.TLS_CREATE != null);
          if (!(process.env.TLS_CERT != null)) {
            _context2.next = 15;
            break;
          }
          /* backward compatability */
          debug2('TLS set: TLS_CERT');
          tls.cert = fs.readFileSync(process.env.TLS_CERT);
          tls.key = fs.readFileSync(process.env.TLS_KEY);
          _context2.next = 37;
          break;
        case 15:
          if (!(process.env.TLS_PFX != null)) {
            _context2.next = 21;
            break;
          }
          debug2('TLS set: PFX');
          tls.pfx = fs.readFileSync(process.env.TLS_PFX);
          if (process.env.TLS_PW != null) {
            tls.passphrase = process.env.TLS_PW;
          }
          _context2.next = 37;
          break;
        case 21:
          if (!(process.env.TLS_CRT != null)) {
            _context2.next = 27;
            break;
          }
          /* new key names to conform to k8s*/
          debug2('TLS set: TLS_CRT');
          tls.cert = process.env.TLS_CRT;
          tls.key = process.env.TLS_KEY;
          _context2.next = 37;
          break;
        case 27:
          if (!(process.env['tls.crt'] != null)) {
            _context2.next = 32;
            break;
          }
          tls.cert = process.env['tls.crt'];
          tls.key = process.env['tls.key'];
          _context2.next = 37;
          break;
        case 32:
          if (!(process.env.TLS_CREATE != null)) {
            _context2.next = 37;
            break;
          }
          /* unsigned certificate */
          debug2('TLS set: TLS_CREATE=', process.env.TLS_CREATE);
          _context2.next = 36;
          return getTls();
        case 36:
          tls = _context2.sent;
        case 37:
          if (process.env.TLS_CABUNDLE != null) {
            tls.CA = fs.readFileSync(process.env.TLS_CABUNDLE);
          }
          debug2('TLS', tls);
          if (!(Object.keys(tls).length > 0)) {
            _context2.next = 43;
            break;
          }
          return _context2.abrupt("return", tls);
        case 43:
          console.log('Warning: The current host protocol is https: No TLS certificate information has been specified.');
          return _context2.abrupt("return", tls);
        case 45:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _getCertificates.apply(this, arguments);
}
function getTls() {
  return _getTls.apply(this, arguments);
}
function _getTls() {
  _getTls = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var options, subjt, subj, d, attr, pems, tls;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
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
          options.extensions.altNames = [
          //	{ type: 6, value: `http://${process.env.APPHOST}:${process.env.APPPORT}/${process.env.APPNAME}` },
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
    }, _callee3);
  }));
  return _getTls.apply(this, arguments);
}
var _default = exports["default"] = iService;