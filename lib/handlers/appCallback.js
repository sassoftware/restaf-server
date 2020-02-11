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

var uuid = require('uuid'); // handles all callbacks


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
            ;
            console.log("..... AUTHFLOW: ".concat(process.env.AUTHFLOW));

            if (!(process.env.AUTHFLOW === 'authorization_code' || process.env.AUTHFLOW === 'code')) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", getAuthApp(null, req, h));

          case 6:
            indexHTML = process.env.APPENTRY == null ? 'index.html' : process.env.APPENTRY;
            console.log("Successful Authentication(implicit). Redirecting to /".concat(indexHTML));
            return _context.abrupt("return", h.file(indexHTML));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _appCallback.apply(this, arguments);
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
            ;
            sid = uuid.v4();
            credentials = req.auth.credentials;
            _context2.next = 5;
            return req.server.app.cache.set(sid, credentials);

          case 5:
            req.cookieAuth.set({
              JSESSIONID: sid
            });
            indexHTML = process.env.APPENTRY == null ? 'index.html' : process.env.APPENTRY;
            console.log("Successful Authentication(authorization_code). Redirecting to /".concat(indexHTML));
            return _context2.abrupt("return", h.redirect("/".concat(indexHTML)));

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getAuthApp.apply(this, arguments);
}

var _default = appCallback;
exports["default"] = _default;