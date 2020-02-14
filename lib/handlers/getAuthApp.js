"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
var uuid = require('uuid');

var debug = require('debug');

var debugAuth = debug('auth');

function getAuthApp(_x, _x2, _x3) {
  return _getAuthApp.apply(this, arguments);
}

function _getAuthApp() {
  _getAuthApp = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(rootHandler, req, h) {
    var credentials, sid, indexHTML;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            debugger;
            credentials = req.auth.credentials; //use an unique name for the saved credentials

            sid = uuid.v4();
            _context.next = 5;
            return req.server.app.cache.set(sid, credentials);

          case 5:
            debugAuth(req.auth); //
            // save unique cache segment name in cookieAuth
            // the credentials are never sent back to client
            //

            req.cookieAuth.set({
              JSESSIONID: sid
            }); // Now redirect

            indexHTML = process.env.APPENTRY == null ? 'index.html' : process.env.APPENTRY;
            console.log("redirecting to /".concat(indexHTML));
            return _context.abrupt("return", h.redirect("/".concat(indexHTML)));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getAuthApp.apply(this, arguments);
}

var _default = getAuthApp;
exports["default"] = _default;