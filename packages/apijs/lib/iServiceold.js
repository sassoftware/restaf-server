"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _iService = _interopRequireDefault(require("./iService"));

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

function iService(uTablep, useDefault, asset, allAppEnv, swaggerOptions) {
  process.env.APPHOST = process.env.APPHOST === '*' ? os.hostname() : process.env.APPHOST;
  var appName = '/' + process.env.APPNAME;
  var authDefault = {
    strategies: ['token', 'session'],
    mode: 'required'
  };
  var authLogon = {
    mode: 'required',
    strategy: 'sas'
  };
  var uTable = (0, _handlers.setupUserRoutes)(uTablep, authDefault); //
  // TBD: Move the default route definition into the plugin
  //

  var defaultTable = [{
    method: ['GET'],
    path: "".concat(appName),
    options: {
      auth: authDefault,
      handler: _handlers.getApp
    }
  }, {
    method: ['GET'],
    path: "".concat(appName, "/api"),
    options: {
      auth: authDefault,
      handler: function () {
        var _handler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, h) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  console.log('Logon Successful');
                  return _context.abrupt("return", h.redirect('/documentation'));

                case 2:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function handler(_x, _x2) {
          return _handler.apply(this, arguments);
        }

        return handler;
      }()
    }
  }, {
    method: ['GET'],
    path: "".concat(appName, "/logon"),
    options: {
      auth: authLogon,
      handler: function () {
        var _handler2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, h) {
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
          return _handler2.apply(this, arguments);
        }

        return handler;
      }()
    }
  }, {
    method: ['GET'],
    path: "".concat(appName, "/logout"),
    options: {
      auth: authDefault,
      handler: _handlers.logout
    }
  }, {
    method: ['GET', 'POST'],
    path: "".concat(appName, "/keepAlive"),
    options: {
      auth: authDefault,
      handler: _handlers.keepAlive
    }
  }, {
    method: ['GET', 'POST'],
    path: "".concat(appName, "/keepAlive2"),
    options: {
      auth: authDefault,
      handler: _handlers.keepAlive2
    }
  }];
  var userRouterTable;
  userRouterTable = [].concat(defaultTable, _toConsumableArray(uTable));
  console.table(userRouterTable);
  (0, _iService["default"])(userRouterTable, asset, allAppEnv, swaggerOptions);
}

var _default = iService;
exports["default"] = _default;