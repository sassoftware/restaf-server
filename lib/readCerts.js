"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * Copyright © 2025, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

function getCerts(tlsdir) {
  if (tlsdir == null || tlsdir === 'NONE') {
    return null;
  }
  console.log("[Note] Reading certs from directory: " + tlsdir);
  if (_fs["default"].existsSync(tlsdir) === false) {
    console.error("[Warning] Specified cert dir does not exist: " + tlsdir);
    return null;
  }
  var listOfFiles = _fs["default"].readdirSync(tlsdir);
  console.log("[Note] TLS/SSL files found: " + listOfFiles);
  var options = {};
  for (var i = 0; i < listOfFiles.length; i++) {
    var fname = listOfFiles[i];
    var name = tlsdir + '/' + listOfFiles[i];
    var key = fname.split('.')[0];
    console.log('Reading TLS file: ' + name + ' as key: ' + key);
    options[key] = _fs["default"].readFileSync(name, {
      encoding: 'utf8'
    });
  }
  console.log('cert files', Object.keys(options));
  return options;
}
var _default = exports["default"] = getCerts;