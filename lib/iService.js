/*
 *  ------------------------------------------------------------------------------------
 *  * Copyright (c) SAS Institute Inc.
 *  *  Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  * http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  limitations under the License.
 * ----------------------------------------------------------------------------------------
 *
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _server = _interopRequireDefault(require("./server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var debug = require('debug');

var debugProxy = debug('proxy');
var proxyLogger = debug('proxylogger');
var responseLogger = debug('response');

var boom = require('boom');

var request = require('request');
/* require( 'request-debug' )( request ); */


var os = require('os');

var uuid = require('uuid');

function iService(uTable, useDefault, asset, rootHandler) {
  debugger;
  process.env.APPHOST = process.env.APPHOST === '*' ? os.hostname() : process.env.APPHOST;
  var appName = '/' + process.env.APPNAME;
  var auth1 = {};
  var auth2 = false;
  var handleOthers;
  var defaultMaxBytes = 10485760;
  var maxBytes;

  if (isNaN(process.env.PAYLOADMAXBYTES)) {
    maxBytes = defaultMaxBytes;
  } else {
    maxBytes = Number(process.env.PAYLOADMAXBYTES);
  }

  if (process.env.PROXYSERVER === 'YES') {
    process.env.OAUTH2 = 'YES';
  }

  console.log("appName ".concat(appName));
  console.log("asset ".concat(asset, " "));
  console.log("uTable ".concat(uTable));

  if (process.env.OAUTH2 === 'YES') {
    auth1 = {
      mode: 'required',
      strategy: 'sas'
    };
  } else {
    auth1 = false;
  }

  var defaultTable = [{
    method: ['GET'],
    path: "".concat(appName),
    config: {
      auth: auth1,
      handler: getApp
    }
  }, {
    method: ['GET'],
    path: "".concat(appName, "/{param*}"),
    config: {
      auth: auth2,
      handler: getApp2
    }
  }, {
    method: ['GET'],
    path: "".concat(appName, "/callback").concat(appName),
    config: {
      handler: AppCallback
    }
  }, {
    method: ['GET'],
    path: "/shared/{param*}",
    config: {
      auth: false,
      handler: getShared
    }
  }, {
    method: ['GET'],
    path: '/favicon.ico',
    config: {
      auth: false,
      handler: getIcon
    }
  }, {
    method: ['GET'],
    path: '/testserver',
    config: {
      handler: testServer
    }
  }]; // Tried payload.parse = false -- way too much code to handle payload

  if (process.env.PROXYSERVER === 'YES') {
    var _handleOthers = [{
      method: ['PUT', 'POST', 'PATCH'],
      path: '/{params*}',
      config: {
        payload: {
          maxBytes: maxBytes
        },
        handler: handleProxy
      }
    }, {
      method: ['GET'],
      path: '/{params*}',
      config: {
        handler: handleProxy
      }
    }];
    defaultTable = [].concat(_toConsumableArray(defaultTable), _handleOthers);
  } else {
    var _handleOthers2 = {
      method: ['GET'],
      path: '/{param*}',
      config: {
        auth: false,
        handler: getApp2
      }
    };
    defaultTable = [].concat(_toConsumableArray(defaultTable), [_handleOthers2]);
  }

  var userRouterTable;

  if (uTable !== null) {
    if (useDefault === true) {
      userRouterTable = [].concat(_toConsumableArray(defaultTable), _toConsumableArray(uTable));
    } else {
      userRouterTable = _toConsumableArray(uTable);
    }
  } else {
    userRouterTable = _toConsumableArray(defaultTable);
  }

  console.log(JSON.stringify(userRouterTable, null, 4));
  (0, _server.default)(userRouterTable, asset);
}

; //
// Had to add cache to handle Edge browser - must be a way not to have to do this.
//

function testServer(_x, _x2) {
  return _testServer.apply(this, arguments);
}

function _testServer() {
  _testServer = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, h) {
    var token, url;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = 'testserver.html';
            console.log(req.auth.credentials);
            return _context.abrupt("return", h.file(url));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _testServer.apply(this, arguments);
}

function getApp(_x3, _x4) {
  return _getApp.apply(this, arguments);
}

function _getApp() {
  _getApp = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, h) {
    var indexHTML;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            debugger;

            if (!(process.env.OAUTH2 === 'YES')) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", getAuthApp(null, req, h));

          case 5:
            indexHTML = process.env.APPENTRY == null ? 'index.html' : process.env.APPENTRY;
            return _context2.abrupt("return", h.file(indexHTML));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _getApp.apply(this, arguments);
}

function getAuthApp(_x5, _x6, _x7) {
  return _getAuthApp.apply(this, arguments);
}

function _getAuthApp() {
  _getAuthApp = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(rootHandler, req, h) {
    var sid, indexHTML;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            sid = uuid.v4();
            debugger;
            _context3.next = 4;
            return req.server.app.cache.set(sid, req.auth.credentials);

          case 4:
            if (process.env.PROXYSERVER === 'YES') {
              req.cookieAuth.set({
                sid: sid
              });
            }

            debugger;
            indexHTML = process.env.APPENTRY == null ? 'index.html' : process.env.APPENTRY;
            return _context3.abrupt("return", h.file("".concat(indexHTML)));

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _getAuthApp.apply(this, arguments);
}

function handleProxy(_x8, _x9) {
  return _handleProxy.apply(this, arguments);
}

function _handleProxy() {
  _handleProxy = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, h) {
    var token, proxyResponse, response, hkey;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return getToken(req, h);

          case 3:
            token = _context4.sent;
            _context4.next = 6;
            return handleProxyRequest(req, h, token);

          case 6:
            proxyResponse = _context4.sent;
            response = h.response(proxyResponse.body);

            for (hkey in proxyResponse.headers) {
              response.header(hkey, proxyResponse.headers[hkey]);
            }

            return _context4.abrupt("return", response);

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", boom.unauthorized(_context4.t0));

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 12]]);
  }));
  return _handleProxy.apply(this, arguments);
}

function getToken(_x10, _x11) {
  return _getToken.apply(this, arguments);
}

function _getToken() {
  _getToken = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, h) {
    var sid;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            debugger;

            if (!(req.auth.credentials !== null)) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt("return", req.auth.credentials.token);

          case 5:
            _context5.next = 7;
            return req.server.app.cache.get(sid);

          case 7:
            sid = _context5.sent;
            return _context5.abrupt("return", sid.credentials);

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
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

function AppCallback(_x12, _x13) {
  return _AppCallback.apply(this, arguments);
} //
// get app server files
//


function _AppCallback() {
  _AppCallback = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, h) {
    var indexHTML;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            proxyLogger('In callback');
            indexHTML = process.env.APPENTRY == null ? 'index.html' : process.env.APPENTRY;
            return _context6.abrupt("return", h.file("".concat(indexHTML)));

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));
  return _AppCallback.apply(this, arguments);
}

function getIcon(_x14, _x15) {
  return _getIcon.apply(this, arguments);
}

function _getIcon() {
  _getIcon = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(req, h) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", h.file('favicon.ico'));

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));
  return _getIcon.apply(this, arguments);
}

function getApp2(_x16, _x17) {
  return _getApp2.apply(this, arguments);
}

function _getApp2() {
  _getApp2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(req, h) {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt("return", h.file(req.params.param));

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));
  return _getApp2.apply(this, arguments);
}

function getShared(_x18, _x19) {
  return _getShared.apply(this, arguments);
}

function _getShared() {
  _getShared = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(req, h) {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            return _context9.abrupt("return", h.file("shared/".concat(req.params.param)));

          case 1:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));
  return _getShared.apply(this, arguments);
}

function appdata(_x20, _x21) {
  return _appdata.apply(this, arguments);
}

function _appdata() {
  _appdata = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10(req, h) {
    var f, js;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            f = process.env.APPDATAJS;
            js = fs.readFileSync(f, 'utf8');
            return _context10.abrupt("return", js);

          case 3:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));
  return _appdata.apply(this, arguments);
}

var _default = iService;
exports.default = _default;