/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _logon = _interopRequireDefault(require("./logon.js"));

var _getAuthApp = _interopRequireDefault(require("./getAuthApp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var debug = require('debug')('getapp');

function getApp(_x, _x2) {
  return _getApp.apply(this, arguments);
}

function _getApp() {
  _getApp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, h) {
    var authCred;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            debug(req.state);
            authCred = req.auth.credentials;
            debug(authCred);

            if (!(process.env.AUTHFLOW === 'authorization_code' || process.env.AUTHFLOW === 'code')) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", (0, _getAuthApp["default"])(null, req, h));

          case 7:
            debugger;
            return _context.abrupt("return", (0, _logon["default"])(req, h));

          case 9:
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