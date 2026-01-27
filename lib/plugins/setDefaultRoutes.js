"use strict";

var _handlers = require("../handlers");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } /*
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
var debug = require("debug")("routes");
//import setContext from "./setContext.js";
module.exports = function setDefaultRoutes(server, options) {
  debug("setDefaultRoutes");
  var appName = "/" + options.appName;
  var authDefault = {
    strategy: "session",
    mode: "try"
  };
  var authLogon = {
    strategy: "sas",
    mode: "required"
  };
  var getAppb = _handlers.getApp.bind(null, options // process.env.USETOKEN === "YES" ? options : null
  );
  console.log("Default strategy", authDefault);
  console.log("Logon strategy", authLogon);
  options.authDefault = authDefault;
  options.authLogon = authLogon;
  debug(options.userRouteTable);
  var defaultTable = [{
    method: ["GET"],
    path: "".concat(appName, "/logon"),
    options: {
      auth: options.authFlow === "server" ? {
        mode: "try",
        strategy: "sas"
      } : null,
      //https://futurestud.io/tutorials/hapi-redirect-to-previous-page-after-login
      // set auth to null on all protected routes
      plugins: {
        "hapi-auth-cookie": {
          redirectTo: false
        }
      },
      handler: function () {
        var _handler = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, h) {
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                debug('logonhandler', req.auth.credentials);
                console.log('In logon handler', options.authFlow);
                _context.n = 1;
                return (0, _handlers.logon)(req, h, options);
              case 1:
                return _context.a(2, _context.v);
            }
          }, _callee);
        }));
        function handler(_x, _x2) {
          return _handler.apply(this, arguments);
        }
        return handler;
      }()
    }
  }, {
    method: ["GET"],
    path: "".concat(appName),
    options: {
      // auth: (process.env.USELOGON === 'YES') ? null : options.serverMode === "app" ? authLogon : authDefault,
      auth: authLogon,
      handler: getAppb
    }
  }, {
    method: ["GET"],
    path: "".concat(appName, "/callback"),
    options: {
      auth: authDefault,
      handler: _handlers.appCallback
    }
  }, {
    method: ["GET"],
    path: "".concat(appName, "/logout"),
    options: {
      auth: authDefault,
      handler: _handlers.logout
    }
  }, {
    method: ["GET", "POST"],
    path: "".concat(appName, "/keepAlive"),
    options: {
      auth: authDefault,
      handler: _handlers.keepAlive
    }
  }, {
    method: ["GET"],
    path: "".concat(appName, "/appenv"),
    options: {
      auth: authDefault,
      handler: function () {
        var _handler2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, h) {
          var allAppEnv, s;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                allAppEnv = options.allAppEnv;
                allAppEnv.credentials = options.credentials;
                s = "let LOGONPAYLOAD = ".concat(JSON.stringify(allAppEnv.LOGONPAYLOAD), ";") + "let APPENV = ".concat(JSON.stringify(allAppEnv.APPENV), ";");
                debug(s);
                return _context2.a(2, s);
            }
          }, _callee2);
        }));
        function handler(_x3, _x4) {
          return _handler2.apply(this, arguments);
        }
        return handler;
      }()
    }
  }, {
    method: ["GET"],
    path: "/appenv",
    options: {
      auth: authDefault,
      handler: function () {
        var _handler3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, h) {
          var allAppEnv, s;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                allAppEnv = options.allAppEnv;
                allAppEnv.credentials = options.credentials;
                s = "let LOGONPAYLOAD = ".concat(JSON.stringify(allAppEnv.LOGONPAYLOAD), ";") + "let APPENV = ".concat(JSON.stringify(allAppEnv.APPENV), ";");
                return _context3.a(2, s);
            }
          }, _callee3);
        }));
        function handler(_x5, _x6) {
          return _handler3.apply(this, arguments);
        }
        return handler;
      }()
    }
  }, {
    method: ["GET"],
    path: "/assets/{param*}",
    options: {
      auth: authDefault,
      handler: _handlers.getApp2
    }
  }, {
    method: ["GET"],
    path: "/favicon.ico",
    options: {
      auth: false,
      handler: _handlers.favicon
    }
  }, {
    method: ["GET", "POST"],
    path: "".concat(appName, "/keepAlive2"),
    options: {
      auth: authDefault,
      handler: _handlers.keepAlive2
    }
  }, {
    method: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    path: "".concat(appName, "/proxy/{param*}"),
    options: {
      auth: authDefault,
      handler: {
        proxy: {
          mapUri: _handlers.proxyMapUri,
          xforward: true,
          passThrough: true
        }
      }
    }
  }];
  var uTable = options.userRouteTable == null ? [] : options.userRouteTable();
  var routeTables0 = options.userRouteTable !== null ? defaultTable.concat(uTable) : defaultTable;
  var routeTables = (0, _handlers.setupUserRoutes)(routeTables0, options);
  server.route(routeTables);
};