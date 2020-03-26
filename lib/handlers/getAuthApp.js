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

var axios = require('axios');

var qs = require('qs');

function getAuthApp(_x, _x2, _x3) {
  return _getAuthApp.apply(this, arguments);
} //
// Note: do not understand why bell.js is not calling oauth/token or if it called it why the result 
// is not set in req.auth.
// so patching it here 


function _getAuthApp() {
  _getAuthApp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(rootHandler, req, h) {
    var credentials, sid, indexHTML;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            debugger; // let credentials = req.auth.credentials;

            _context.next = 3;
            return getCredentials(req);

          case 3:
            credentials = _context.sent;
            //use an unique name for the saved credentials
            sid = uuid.v4();
            _context.next = 7;
            return req.server.app.cache.set(sid, credentials);

          case 7:
            console.log(credentials);
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

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getAuthApp.apply(this, arguments);
}

function getCredentials(_x4) {
  return _getCredentials.apply(this, arguments);
}

function _getCredentials() {
  _getCredentials = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req) {
    var q, route, info, location, payload, r;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            q = req.query;
            route = process.env.REDIRECT == null ? "/callback" : '/' + process.env.REDIRECT;
            info = req.server.info;
            location = info.uri + route;

            if (info.host === '0.0.0.0') {
              location = "".concat(info.protocol, "://").concat(process.env.APPHOST, ":").concat(info.port).concat(route);
            }

            ;
            payload = {
              url: "".concat(process.env.VIYA_SERVER, "/SASLogon/oauth/token"),
              method: 'POST',
              headers: {
                // 'Authorization': 'Basic ' + Buffer.from(`${process.env.CLIENTID}:${process.env.CLIENTSECRET}`).toString('base64'),
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: qs.stringify({
                client_id: "".concat(process.env.CLIENTID),
                client_secret: "".concat(process.env.CLIENTSECRET),
                redirect_uri: "".concat(location),
                'grant_type': 'authorization_code',
                code: req.query.code
              })
            };
            console.log(payload);
            debugger;
            _context2.prev = 9;
            _context2.next = 12;
            return axios(payload);

          case 12:
            r = _context2.sent;
            return _context2.abrupt("return", r.data);

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](9);
            console.log(_context2.t0);

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[9, 16]]);
  }));
  return _getCredentials.apply(this, arguments);
}

var _default = getAuthApp;
exports["default"] = _default;