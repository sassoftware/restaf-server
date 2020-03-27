"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
var mongoP = require('./index');

var createClient = mongoP.createClient;
runtest().then(function (r) {
  return console.log(r);
})["catch"](function (e) {
  return console.log(e);
});

function runtest() {
  return _runtest.apply(this, arguments);
}

function _runtest() {
  _runtest = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var client;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return createClient('localhost', 27017);

          case 2:
            client = _context.sent;
            console.log('...');
            console.log(client); // const col = client.db('cache').collection('scores');
            // console.log(col);

            client.close();
            return _context.abrupt("return", 'done');

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _runtest.apply(this, arguments);
}