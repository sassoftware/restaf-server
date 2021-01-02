"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _server = _interopRequireDefault(require("./server"));

var _handlers = require("./handlers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var os = require('os');

var debug = require('debug')('appenv');

function iService(uTablep, useDefault, asset, allAppEnv) {
  process.env.APPHOST = process.env.APPHOST === '*' ? os.hostname() : process.env.APPHOST;
  var appName = '/' + process.env.APPNAME;
  var auth1 = false;
  var auth2 = false;
  var authLogon = false;

  if (process.env.AUTHFLOW === 'authorization_code' || process.env.AUTHFLOW === 'code') {
    auth1 = {
      mode: 'required'
    };
    authLogon = {
      mode: 'required',
      strategy: 'sas'
    };
    auth2 = false;
  } else {
    auth1 = false;
    auth2 = false;
  }

  var getAppEnv = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, h) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              debug(allAppEnv);
              return _context.abrupt("return", allAppEnv);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getAppEnv(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(); // see if appenv was overridden


  var uTable = (0, _handlers.setupUserRoutes)(uTablep, auth2);
  var hasAppEnv = null;

  if (uTable !== null) {
    hasAppEnv = uTable.find(function (u) {
      return u.path === '/appenv';
    });
  } // end temp patch
  //
  // TBD: Move route definition into the plugin
  //


  var defaultTable = [{
    method: ['GET'],
    path: "".concat(appName),
    options: {
      auth: auth1,
      handler: _handlers.getApp
    }
  }, {
    method: ['GET'],
    path: "".concat(appName, "/logon"),
    options: {
      auth: authLogon,
      handler: function () {
        var _handler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, h) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt("return", (0, _handlers.logon)(req, h));

                case 1:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function handler(_x3, _x4) {
          return _handler.apply(this, arguments);
        }

        return handler;
      }()
    }
  }, {
    method: ['GET'],
    path: "".concat(appName, "/appenv"),
    options: {
      auth: auth1,
      handler: getAppEnv
    }
  }, {
    method: ['GET'],
    path: "/appenv",
    options: {
      auth: auth1,
      handler: getAppEnv
    }
  }, {
    method: ['GET'],
    path: "".concat(appName, "/callback"),
    options: {
      auth: auth1,
      handler: _handlers.appCallback
    }
  }, {
    method: ['GET'],
    path: "".concat(appName, "/{param*}"),
    options: {
      auth: auth1,
      handler: getApp2
    }
  }, {
    method: ['GET'],
    path: "".concat(appName, "/logout"),
    options: {
      auth: auth1,
      handler: _handlers.logout
    }
  }, {
    method: ['GET', 'POST'],
    path: "".concat(appName, "/keepAlive"),
    options: {
      auth: auth1,
      handler: _handlers.keepAlive
    }
  }, {
    method: ['GET', 'POST'],
    path: "".concat(appName, "/keepAlive2"),
    options: {
      auth: auth1,
      handler: _handlers.keepAlive2
    }
  }, {
    method: ['GET', 'POST'],
    path: "/{param*}",
    options: {
      auth: auth1,
      handler: getApp2
    }
  }, {
    method: ['GET'],
    path: "".concat(appName, "/user"),
    options: {
      auth: auth1,
      handler: _handlers.getUser
    }
  }];
  var userRouterTable;

  if (uTable !== null) {
    if (useDefault === true) {
      userRouterTable = [].concat(defaultTable, _toConsumableArray(uTable));
    } else {
      userRouterTable = _toConsumableArray(uTable);
    }
  } else {
    userRouterTable = [].concat(defaultTable);
  }

  console.table(userRouterTable);
  (0, _server["default"])(userRouterTable, asset, allAppEnv);
} //
// get app server files - too small
//


function getIcon(_x5, _x6) {
  return _getIcon.apply(this, arguments);
}

function _getIcon() {
  _getIcon = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, h) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", h.file('favicon.ico'));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getIcon.apply(this, arguments);
}

function getApp2(_x7, _x8) {
  return _getApp.apply(this, arguments);
}

function _getApp() {
  _getApp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, h) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", h.file("".concat(req.params.param)));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getApp.apply(this, arguments);
}

var _default = iService;
exports["default"] = _default;