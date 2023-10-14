"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _setupAuth = _interopRequireDefault(require("./plugins/setupAuth"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
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
var debug = require('debug')('service');
var debug2 = require('debug')('tls');
// let isDocker = require('is-docker');
var Hapi = require('@hapi/hapi');
// const { isSameSiteNoneCompatible } = require('should-send-same-site-none');
var NodeCache = require("node-cache-promise");
var Vision = require('@hapi/vision');
var inert = require('@hapi/inert');
var selfsigned = require('selfsigned');
var os = require('os');
function iService(userRouteTable, useDefault, asset, allAppEnv, serverMode, userInfo) {
  // process.env.APPHOST_ADDR = process.env.APPHOST;
  var init = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
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
              _context.next = 37;
              break;
            }
            _context.next = 37;
            return (0, _setupAuth["default"])(hapiServer, options);
          case 37:
            hapiServer.log('Plugin', process.env.PLUGIN);
            if (!(process.env.PLUGIN === 'hapi-swagger' && serverMode !== null)) {
              _context.next = 46;
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
            _context.next = 44;
            return hapiServer.register({
              plugin: serverMode,
              options: swaggerOptions
            });
          case 44:
            _context.next = 47;
            break;
          case 46:
            if (process.env.PLUGIN == 'hapi-openapi' && serverMode !== null) {
              console.log('hapi-openapi', 'coming soon');
            }
          case 47:
            //
            // Start server
            //
            // eslint-disable-next-line no-unused-vars
            allRoutes = hapiServer.table();
            _context.next = 50;
            return hapiServer.start();
          case 50:
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
          case 60:
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
  _getCertificates = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
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
  _getTls = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
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
var _default = iService;
exports["default"] = _default;