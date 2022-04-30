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

var debug = require('debug')('setcookies');

function setCookies(_x, _x2, _x3) {
  return _setCookies.apply(this, arguments);
}

function _setCookies() {
  _setCookies = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, h, options) {
    var credentials, sid, redirect;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            credentials = req.auth.credentials;
            req.log('setcookie', credentials);

            if (!(credentials != null && req.auth.error != null)) {
              _context.next = 5;
              break;
            }

            debug('logon failed');
            return _context.abrupt("return", {
              status: false,
              error: req.auth.error
            });

          case 5:
            // create a cookie(sid) and save credentials in cache
            sid = uuid.v4();
            credentials.sid = sid;

            if (options != null) {
              options.allAppEnv.LOGONPAYLOAD.token = credentials.token;
              options.allAppEnv.LOGONPAYLOAD.tokenType = 'bearer';
              debug(options.allAppEnv.LOGONPAYLOAD);
            }

            _context.next = 10;
            return req.server.app.cache.set(sid, credentials, 0);

          case 10:
            // Can we get away without setting cookie for this session?
            // Need to also modify keepAlive
            if (process.env.COOKIES !== 'NO') {
              req.cookieAuth.set({
                sid: sid
              });
            }

            ;
            req.log('setcookie', credentials.query);
            redirect = credentials.query != null && credentials.query.next != null ? credentials.query.next : null;
            req.server.log('setcookie-redirect', redirect);
            return _context.abrupt("return", {
              status: true,
              error: null,
              redirect: redirect
            });

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _setCookies.apply(this, arguments);
}

var _default = setCookies;
/* 
 save for future reference - not used at this time
async function getCredentials (req) {
    let route = process.env.REDIRECT == null ? `/callback` : '/' + process.env.REDIRECT;
    let info = req.server.info;
    let location = info.uri + route;
    if (info.host === '0.0.0.0') {
        location = `${info.protocol}://${process.env.APPHOST}:${info.port}${route}`;
    };

    let payload = {
		url   : `${process.env.VIYA_SERVER}/SASLogon/oauth/token`,
		method: 'POST',

		headers: {
			// 'Authorization': 'Basic ' + Buffer.from(`${process.env.CLIENTID}:${process.env.CLIENTSECRET}`).toString('base64'),
			'Accept'      : 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
        data: qs.stringify({
            client_id    : `${process.env.CLIENTID}`,
            client_secret: `${process.env.CLIENTSECRET}`,
            redirect_uri : `${location}`,

			'grant_type': 'authorization_code',
			code        : req.query.code
		})
	};
    try {
        let r = await axios(payload);
        return r.data;
    } catch (err) {
        console.log(err);

    }
}
*/

exports["default"] = _default;