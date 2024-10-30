#!/usr/bin/env node
/*
 *  ------------------------------------------------------------------------------------
 *  * Copyright (c) SAS Institute Inc.
 *  *  Licensed under the Apache License, Version 2.0 (the 'License');
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  * http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an 'AS IS' BASIS,
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
exports.icli = icli;
var _viyaServerCore = _interopRequireDefault(require("@sassoftware/viya-server-core"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var swagger = require('hapi-swagger');

// silly  but a jump point to keep backward compatibility
function icli(uTable, useDefault, userInfo) {
  (0, _viyaServerCore["default"])(uTable, useDefault, swagger, userInfo);
}