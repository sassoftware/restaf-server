"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _jwtDecode = _interopRequireDefault(require("jwt-decode"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

function decodeJwt(token) {
  var jwt = (0, _jwtDecode["default"])(token);
  return jwt;
}
var _default = exports["default"] = decodeJwt;