"use strict";

require("core-js/stable");
require("regenerator-runtime/runtime");
var _fs = _interopRequireDefault(require("fs"));
var _iService = _interopRequireDefault(require("./iService"));
var _config = _interopRequireDefault(require("./config"));
var _readCerts = _interopRequireDefault(require("./readCerts"));
var _yargs = _interopRequireDefault(require("yargs"));
var _helpers = require("yargs/helpers");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } /*
 *  ------------------------------------------------------------------------------------
 *  * Copyright (c) SAS Institute Inc.
 *  *  Licensed under the Apache License, Version 2.0 (the 'License');
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  * http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an 'AS IS' BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  limitations under the License.
 * ----------------------------------------------------------------------------------------
 *
 */
var debug = require("debug")("startup");
exports.core = function () {
  icore().then(function (r) {
    console.log('icore returned', r);
    return r;
  })["catch"](function (err) {
    console.log('Error in icore', err);
    return null;
  });
};
exports.asyncCore = icore;
function icore(_x, _x2, _x3, _x4, _x5) {
  return _icore.apply(this, arguments);
}
function _icore() {
  _icore = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(uTable, useDefault, serverMode, customize, userCache) {
    var argv, env, appenv, docker;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          argv = (0, _yargs["default"])((0, _helpers.hideBin)(process.argv)).argv;
          env = argv.env == null ? null : argv.env;
          appenv = argv.appenv == null ? null : argv.appenv;
          docker = argv.docker == null ? null : argv.docker; //process.env.SERVERMODE = serverMode !== null ? "api" : "app";
          if (useDefault == null) {
            useDefault = true;
          }
          console.log("Initialization started ============================================================");
          console.log("version: 2, Build Date: ", Date());
          console.log("\nCommand Line Configuration:\n          Dockerfile: ".concat(docker, "\n          env file  : ").concat(env, "\n          appenv    : ").concat(appenv, "\n          customize : ").concat(customize != null, "\n          "));
          _context.n = 1;
          return iapp(null, env, docker, uTable, useDefault, serverMode, customize, userCache);
        case 1:
          return _context.a(2, _context.v);
      }
    }, _callee);
  }));
  return _icore.apply(this, arguments);
}
;
function iapp(_x6, _x7, _x8, _x9, _x0, _x1, _x10, _x11) {
  return _iapp.apply(this, arguments);
}
function _iapp() {
  _iapp = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(appSrc, rafEnv, dockerFile, uTable, useDefault, serverMode, customize, userCache) {
    var asset, appEnv;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          asset = setup(rafEnv, dockerFile);
          if (appSrc == null) {
            appSrc = process.env.APPENV == null ? null : process.env.APPENV;
          }
          if (!(appSrc != null)) {
            _context3.n = 1;
            break;
          }
          console.log("appSrc", "+".concat(appSrc, "+"));
          createPayload(appSrc, /*#__PURE__*/function () {
            var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(err, r) {
              return _regenerator().w(function (_context2) {
                while (1) switch (_context2.n) {
                  case 0:
                    if (!err) {
                      _context2.n = 1;
                      break;
                    }
                    console.log(err);
                    console.log("createPayload failed");
                    process.exit(1);
                    _context2.n = 3;
                    break;
                  case 1:
                    _context2.n = 2;
                    return (0, _iService["default"])(uTable, useDefault, asset, r, serverMode, customize, userCache);
                  case 2:
                    return _context2.a(2, _context2.v);
                  case 3:
                    return _context2.a(2);
                }
              }, _callee2);
            }));
            return function (_x12, _x13) {
              return _ref.apply(this, arguments);
            };
          }());
          _context3.n = 3;
          break;
        case 1:
          appEnv = getAllEnv({});
          _context3.n = 2;
          return (0, _iService["default"])(uTable, useDefault, asset, appEnv, serverMode, customize, userCache);
        case 2:
          return _context3.a(2, _context3.v);
        case 3:
          return _context3.a(2);
      }
    }, _callee3);
  }));
  return _iapp.apply(this, arguments);
}
function setup(rafEnv, dockerFile) {
  (0, _config["default"])(rafEnv, dockerFile);
  var asset = process.env.APPLOC === "." ? process.cwd() : process.env.APPLOC;
  process.env.APPASSET = asset;
  return asset;
}
function createPayload(srcName, cb) {
  var src = _fs["default"].readFileSync(srcName, "utf8");
  if (src === null) {
    cb("Error: ".concat(srcName, " was not found. "));
  }
  try {
    // console.log(src);
    var f = new Function(src);
    console.log("".concat(srcName, " compile completed"));
    var r = f();
    f = null;
    var ar = getAllEnv(r);
    cb(null, ar);
  } catch (err) {
    console.log("".concat(srcName, " compile failed"));
    cb(err);
  }
}
function getAllEnv(userInfo) {
  var env;
  var l = null;
  var host = trimit("VIYA_SERVER");
  if (host === 'none' || host == null) {
    console.log('Note: setting host to null');
    host = null;
  }

  /*
  if (process.env.AUTHTYPE != null) {
    process.env.AUTHFLOW = process.env.AUTHTYPE;
  }
    */

  var authflow = trimit("AUTHFLOW");
  if (authflow === "authorization_code" || authflow === "code") {
    authflow = "server";
  }
  if (authflow === null) {
    host = null;
  }
  if (host === null) {
    authflow = null;
    console.log('Note: setting authflow to null');
  }
  process.env.AUTHFLOW = authflow;
  // let redirect = (process.env.REDIRECT != null) ? process.env.REDIRECT : null;
  var redirect = trimit("REDIRECT");
  var clientID = trimit("CLIENTID");

  // eslint-disable-next-line no-unused-vars
  var clientSecret = trimit("CLIENTSECRET");
  var keepAlive = trimit("KEEPALIVE");
  var appName = trimit("APPNAME");
  var ns = trimit("NAMESPACE");
  var nsHost = trimit("NSHOST");
  l = {
    authflow: authflow,
    redirect: redirect,
    host: host,
    clientID: clientID,
    appName: appName,
    keepAlive: null,
    useToken: process.env.USETOKEN,
    ns: ns,
    nsHost: nsHost
  };
  if (authflow === "server" || authflow === "implicit") {
    if (authflow === "implicit") {
      if (redirect === null) {
        redirect = "".concat(appName, "/callback");
        process.env.REDIRECT = "callback";
      } else {
        if (redirect !== null && redirect.indexOf("/") !== 0) {
          redirect = redirect.indexOf("http") != -1 ? redirect : "".concat(process.env.APPNAME, "/").concat(redirect);
        }
      }
      l.redirect = redirect;
    }
    if (authflow === "server" && keepAlive === "YES") {
      var protocol = process.env.HTTPS.toUpperCase() === "TRUE" ? "https://" : "http://";
      l.keepAlive = "".concat(protocol).concat(process.env.APPHOST, ":").concat(process.env.APPPORT, "/").concat(appName, "/keepAlive");
      l.keepAlive = l.keepAlive.replace(/0.0.0.0/, "localhost");
    }
    if (process.env.TIMERS != null) {
      l.timers = process.env.TIMERS;
    }
  }
  // allow for no authtype
  l = {
    authType: authflow,
    redirect: redirect,
    host: host,
    clientID: clientID,
    appName: appName,
    keepAlive: null,
    useToken: process.env.USETOKEN,
    ns: ns,
    nsHost: nsHost
  };

  // pick up the app env's - replacement for appenv.js
  // appenv.js still supported for backward compatibility
  for (var key in process.env) {
    debug(key);
    if (key.indexOf("APPENV_") === 0) {
      var k = key.substring(7);
      var v = process.env[key];
      if (v != null && v.trim().length > 0) {
        if (v.startsWith('$')) {
          v = process.env[v.substring(1)];
        }
        userInfo[k] = v != null ? v.trim() : null;
      } else {
        userInfo[k] = null;
      }
    }
  }
  userInfo.viyaCert = (0, _readCerts["default"])(process.env.VIYACERT);
  userInfo.appName = appName;
  env = {
    LOGONPAYLOAD: l,
    APPENV: userInfo
  };
  console.log("Final APPENV configuration for the server");
  console.log(JSON.stringify(env, null, 4));
  console.log(Date());
  return env;
}
function trimit(e) {
  var a = process.env[e];
  if (a == null) {
    return null;
  }
  a = a.trim();
  return a.length === 0 ? null : a;
}