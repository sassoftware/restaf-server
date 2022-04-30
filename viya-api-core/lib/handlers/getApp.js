"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _codeAuth = _interopRequireDefault(require("./codeAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var debug = require('debug')('getapp');

function getApp(_x, _x2, _x3) {
  return _getApp.apply(this, arguments);
}

function _getApp() {
  _getApp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options, req, h) {
    var x, redirect, redirectUri, protocol, url, indexHTML;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(process.env.AUTHFLOW === 'implicit')) {
              _context.next = 10;
              break;
            }

            x = "".concat(process.env.VIYA_SERVER, "/SASLogon/oauth/authorize?response_type=token&client_id=").concat(process.env.CLIENTID);
            redirect = "".concat(process.env.APPNAME, "/callback");

            if (process.env.REDIRECT != null) {
              redirect = process.env.REDIRECT.trim();

              if (redirect.indexOf('http') === -1) {
                redirect = "".concat(process.env.APPNAME, "/").concat(redirect);
                protocol = process.env.HTTPS === 'true' ? 'https://' : 'http://';
                redirectUri = "".concat(protocol).concat(process.env.APPHOST, ":").concat(process.env.APPPORT, "/").concat(redirect, "?host=").concat(process.env.VIYA_SERVER);
              } else {
                redirectUri = "".concat(redirect, "?host=").concat(process.env.VIYA_SERVER);
              }
            }

            debug(process.env.REDIRECT);
            url = "".concat(x, "&redirect_uri=").concat(redirectUri);
            debug(url);
            return _context.abrupt("return", h.redirect(url));

          case 10:
            if (!(process.env.AUTHFLOW === 'server')) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", (0, _codeAuth["default"])(req, h, options));

          case 14:
            debug('default getapp');
            indexHTML = process.env.APPENTRY == null ? 'index.html' : process.env.APPENTRY;
            console.log("Redirecting to default ".concat(indexHTML));
            return _context.abrupt("return", h.file(indexHTML));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getApp.apply(this, arguments);
}

var _default = getApp;
exports["default"] = _default;