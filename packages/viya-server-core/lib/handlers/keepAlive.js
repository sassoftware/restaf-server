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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Boom = require('@hapi/boom'); // primarly to do a keepAlive of sasLogon


var qs = require('qs');

function keepAlive(_x, _x2) {
  return _keepAlive.apply(this, arguments);
} // let SASLogon = `${process.env.VIYA_SERVER}/SASLogon/oauth/authorize?client_id=${process.env.CLIENTID}&redirect_uri=${process.env.APPSERVER}/keepAlive2&response_type=code`;


function _keepAlive() {
  _keepAlive = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, h) {
    var SASLogon;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            refreshToken(req, h);
            SASLogon = "".concat(process.env.VIYA_SERVER, "/SASLogon/");
            return _context.abrupt("return", h.redirect(SASLogon).code(302));

          case 3:
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
    var credentials, sid, config, r, newcred, error;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            credentials = req.auth.credentials;
            sid = credentials.sid;
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
            _context2.prev = 3;
            _context2.next = 6;
            return (0, _axios["default"])(config);

          case 6:
            r = _context2.sent;
            newcred = _objectSpread({}, credentials);
            newcred.token = r.data.access_token;
            newcred.refreshToken = r.data.refresh_token;
            _context2.next = 12;
            return req.server.app.cache.set(sid, credentials);

          case 12:
            return _context2.abrupt("return", credentials);

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](3);
            error = Boom.badRequest('Unable to refresh tokens in KeepAlive', JSON.stringify(_context2.t0, null, 4));
            throw error;

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 15]]);
  }));
  return _refreshToken.apply(this, arguments);
}

var _default = keepAlive;
exports["default"] = _default;