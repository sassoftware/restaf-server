/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _decodeJwt = _interopRequireDefault(require("./decodeJwt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// primarly to do a keepAlive of sasLogon
var qs = require('qs');

var debug = require('debug')('keepalive');

function keepAlive(_x, _x2) {
  return _keepAlive.apply(this, arguments);
}

function _keepAlive() {
  _keepAlive = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, h) {
    var SASLogon;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            refreshToken(req, h); // let SASLogon = `${process.env.VIYA_SERVER}/SASLogon/oauth/authorize?client_id=${process.env.CLIENTID}&redirect_uri=${process.env.APPSERVER}/keepAlive2&response_type=code`;

            SASLogon = "".concat(process.env.VIYA_SERVER, "/SASLogon/");
            debug(SASLogon);
            return _context.abrupt("return", h.redirect(SASLogon).code(302));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _keepAlive.apply(this, arguments);
}

function refreshToken(_x3, _x4) {
  return _refreshToken.apply(this, arguments);
}

function _refreshToken() {
  _refreshToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, h) {
    var sid, credentials, config, r;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(req.state.ocookie == null)) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", false);

          case 2:
            sid = req.state.ocookie.sid;
            debug(sid);
            _context2.next = 6;
            return req.server.app.cache.get(sid);

          case 6:
            credentials = _context2.sent;
            config = {
              url: "".concat(process.env.VIYA_SERVER, "/SASLogon/oauth/token"),
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: qs.stringify({
                grant_type: 'refresh_token',
                refresh_token: credentials.refreshToken,
                client_id: process.env.CLIENTID,
                client_secret: process.env.CLIENTSECRET
              })
            };
            _context2.next = 10;
            return (0, _axios["default"])(config);

          case 10:
            r = _context2.sent;
            credentials = {
              token: r.data.access_token,
              refreshToken: r.data.refresh_token,
              sid: sid
            };
            _context2.next = 14;
            return req.server.app.cache.set(sid, credentials);

          case 14:
            h.state('ocookie', {
              "sid": sid
            });
            return _context2.abrupt("return", credentials);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _refreshToken.apply(this, arguments);
}

var _default = keepAlive;
exports["default"] = _default;