/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var debug = require('debug');

var proxyLogger = debug('proxylogger');

function appCallback(_x, _x2) {
  return _appCallback.apply(this, arguments);
}

function _appCallback() {
  _appCallback = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, h) {
    var indexHTML;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            proxyLogger('In callback');
            indexHTML = process.env.APPENTRY == null ? 'index.html' : process.env.APPENTRY;
            return _context.abrupt("return", h.file("".concat(indexHTML)));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _appCallback.apply(this, arguments);
}

var _default = appCallback;
exports["default"] = _default;