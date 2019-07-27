/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var debug = require('debug');

var debugProxy = debug('proxy');
var proxyLogger = debug('proxylogger');
var responseLogger = debug('response');

var boom = require('@hapi/boom');

var request = require('request');

function handleProxy(_x, _x2) {
  return _handleProxy.apply(this, arguments);
}

function _handleProxy() {
  _handleProxy = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, h) {
    var token, proxyResponse, response, hkey;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return getToken(req, h);

          case 3:
            token = _context.sent;
            console.log(token);
            _context.next = 7;
            return handleProxyRequest(req, h, token);

          case 7:
            proxyResponse = _context.sent;
            response = h.response(proxyResponse.body);

            for (hkey in proxyResponse.headers) {
              response.header(hkey, proxyResponse.headers[hkey]);
            }

            return _context.abrupt("return", response);

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", boom.unauthorized(_context.t0));

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 13]]);
  }));
  return _handleProxy.apply(this, arguments);
}

function getToken(_x3, _x4) {
  return _getToken.apply(this, arguments);
}

function _getToken() {
  _getToken = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, h) {
    var sid;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(req.auth.credentials !== null)) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", req.auth.credentials.token);

          case 4:
            _context2.next = 6;
            return req.server.app.cache.get(sid);

          case 6:
            sid = _context2.sent;
            return _context2.abrupt("return", sid.credentials);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getToken.apply(this, arguments);
}

function handleProxyRequest(req, h, token) {
  return new Promise(function (resolve, reject) {
    // let uri = `${process.env.SAS_PROTOCOL}${process.env.VIYA_SERVER}/${req.params.params}`;
    var uri = "".concat(process.env.VIYA_SERVER, "/").concat(req.params.params);

    var headers = _objectSpread({}, req.headers);

    delete headers.host;
    delete headers['user-agent'];
    delete headers.origin;
    delete headers.referer;
    delete headers.connection;

    if (headers.cookie) {
      delete headers.cookie;
    }

    var config = {
      url: uri,
      method: req.method,
      headers: headers,
      gzip: true,
      auth: {
        bearer: token
      }
    };

    if (req.payload != null) {
      // debugProxy(headers['content-type']);
      if (headers['content-type'] === 'application/octet-stream') {
        config.body = req.payload;
      } else {
        config.body = _typeof(req.payload) === 'object' ? JSON.stringify(req.payload) : req.payload;
      }
    }

    if (req.query !== null && Object.keys(req.query).length > 0) {
      config.qs = req.query;
    }

    debugProxy(JSON.stringify(config, null, 4));
    proxyLogger(config.url);
    request(config, function (err, response, body) {
      if (err) {
        reject(err);
      } else {
        responseLogger({
          url: "------------------------------------------".concat(config.url)
        });
        responseLogger(req.query);
        responseLogger(typeof body === 'string' ? {
          body: body
        } : body);

        if (response.headers.hasOwnProperty('content-encoding')) {
          delete response.headers['content-encoding'];
        }

        responseLogger(response.headers['content-coding']);
        resolve({
          headers: response.headers,
          body: body
        });
      }
    });
  });
}

var _default = handleProxy;
exports["default"] = _default;