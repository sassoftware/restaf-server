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

var debug = require('debug')('user');

function getUser(_x, _x2) {
  return _getUser.apply(this, arguments);
}

function _getUser() {
  _getUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, h) {
    var name, sid, credentials;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            debug(req.state);
            name = 'SAS User';

            if (!(req.state.ocookie != null)) {
              _context.next = 9;
              break;
            }

            sid = req.state.ocookie.sid;
            debug(sid);
            _context.next = 7;
            return req.server.app.cache.get(sid);

          case 7:
            credentials = _context.sent;
            name = credentials.user_name;

          case 9:
            debug(name);
            return _context.abrupt("return", "let USER_NAME='".concat(name, "'"));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getUser.apply(this, arguments);
}

var _default = getUser;
exports["default"] = _default;