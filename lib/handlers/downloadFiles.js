/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _repl = require("repl");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fs = require('fs').promises;

function downloadFiles(_x, _x2) {
  return _downloadFiles.apply(this, arguments);
}

function _downloadFiles() {
  _downloadFiles = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, h) {
    var dir, loc, d, f, fileExt, contentType, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dir = process.env.DATALOC != null ? process.env.DATALOC : process.env.APPLOC;
            loc = "".concat(dir, "/").concat(req.params.param);
            console.log(loc);
            _context.next = 5;
            return fs.readFile(loc, 'UTF8');

          case 5:
            d = _context.sent;
            f = req.params.param.split('.');
            fileExt = f[f.length - 1];
            contentType = getContentType(fileExt);
            console.log(contentType);
            response = h.response(d).encoding('binary').header('content-type', contentType).header('type', fileExt);
            return _context.abrupt("return", response);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _downloadFiles.apply(this, arguments);
}

function getContentType(fileExt) {
  var contentType = 'application/octet-stream';

  switch (fileExt) {
    case 'pdf':
      contentType = 'application/pdf';
      break;

    case 'ppt':
      contentType = 'application/vnd.ms-powerpoint';
      break;

    case 'pptx':
      contentType = 'application/vnd.openxmlformats-officedocument.preplyentationml.preplyentation';
      break;

    case 'xls':
      contentType = 'application/vnd.ms-excel';
      break;

    case 'xlsx':
      contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      break;

    case 'doc':
      contentType = 'application/msword';
      break;

    case 'docx':
      contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      break;

    case 'csv':
      contentType = 'application/octet-stream';
      break;

    case 'xml':
      contentType = 'application/xml';
      break;
  }

  return contentType;
}

var _default = downloadFiles;
exports["default"] = _default;