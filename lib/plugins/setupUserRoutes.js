"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _setContext = _interopRequireDefault(require("./setContext"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */

function setupUserRoutes(u, options) {
  if (u == null) {
    return [];
  }
  var ux = typeof u === 'function' ? u() : u;
  var routes = ux.map(function (rx) {
    //let rx = {...r};

    if (rx.options.pre == null) {
      rx.options.pre = [{
        method: _setContext["default"],
        assign: 'context'
      }];
    } else {
      rx.options.pre.push([{
        method: _setContext["default"],
        assign: 'context'
      }]);
    }
    console.log(rx.options.pre);
    if (rx.options.auth === true) {
      rx.options.auth = options.authDefault;
    } else if (rx.options.auth === 'logon') {
      rx.options.auth = options.authLogon;
    }
    console.log('route auth', rx.options.auth);
    return rx;
  });
  return routes;
}
var _default = exports["default"] = setupUserRoutes;