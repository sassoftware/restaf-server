"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _setCookies = _interopRequireDefault(require("./setCookies"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function logon(_x, _x2) {
  return _logon.apply(this, arguments);
}

function _logon() {
  _logon = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, h) {
    var r;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            req.log('in logon');
            req.log('in logon 2');
            _context.next = 4;
            return (0, _setCookies["default"])(req, h, null);

          case 4:
            r = _context.sent;
            req.log('in logon after setcookie', r.redirect);
            return _context.abrupt("return", h.redirect(r.redirect));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _logon.apply(this, arguments);
}

var _default = logon;
exports["default"] = _default;