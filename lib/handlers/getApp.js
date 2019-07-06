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

var uuid = require('uuid');

function getApp(_x, _x2) {
  return _getApp.apply(this, arguments);
}

function _getApp() {
  _getApp = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, h) {
    var indexHTML;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            debugger;

            if (!(process.env.OAUTH2 === 'YES')) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", getAuthApp(null, req, h));

          case 5:
            indexHTML = process.env.APPENTRY == null ? 'index.html' : process.env.APPENTRY;
            return _context.abrupt("return", h.file(indexHTML));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getApp.apply(this, arguments);
}

function getAuthApp(_x3, _x4, _x5) {
  return _getAuthApp.apply(this, arguments);
}

function _getAuthApp() {
  _getAuthApp = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(rootHandler, req, h) {
    var sid, credentials, indexHTML;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            debugger;
            sid = uuid.v4();
            credentials = req.auth.credentials;
            _context2.next = 5;
            return req.server.app.cache.set(sid, credentials);

          case 5:
            if (process.env.PROXYSERVER === 'YES') {
              req.cookieAuth.set({
                sid: sid
              });
            }

            indexHTML = process.env.APPENTRY == null ? 'index.html' : process.env.APPENTRY;
            return _context2.abrupt("return", h.file("".concat(indexHTML)));

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getAuthApp.apply(this, arguments);
}

var _default = getApp;
exports["default"] = _default;