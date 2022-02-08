"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _setContext = _interopRequireDefault(require("./setContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function setupUserRoutes(u, auth) {
  if (u == null) {
    return [];
  }

  var ux = typeof u === 'function' ? u() : u;
  var routes = ux.map(function (r) {
    var rx = _objectSpread({}, r);
    /* change it to options */


    if (rx.config != null) {
      rx.options = _objectSpread({}, rx.config);
      delete rx.config;
    }

    rx.options.pre = [{
      method: _setContext["default"],
      assign: 'context'
    }];

    if (rx.options.auth == null) {
      rx.options.auth = auth;
    }

    return rx;
  });
  return routes;
}

var _default = setupUserRoutes;
exports["default"] = _default;