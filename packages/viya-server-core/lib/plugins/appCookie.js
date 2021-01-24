"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var uuid = require('uuid');

exports.plugin = {
  name: 'appCookie',
  version: '1.0.0',
  register: iappCookie
};

function iappCookie(_x, _x2) {
  return _iappCookie.apply(this, arguments);
}

function _iappCookie() {
  _iappCookie = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(server, options) {
    var cookieOptions;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return server.register(require('@hapi/cookie'));

          case 2:
            cookieOptions = {
              cookie: {
                name: 'ocookie',
                password: uuid.v4(),
                isSecure: options.isSecure,
                isSameSite: options.isSameSite
              },
              redirectTo: options.redirectTo,
              appendNext: {
                raw: true,
                name: 'next'
              },
              validateFunc: function () {
                var _validateFunc = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, session) {
                  var credentials;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          debugger;

                          if (!(session === null)) {
                            _context.next = 4;
                            break;
                          }

                          console.log('session is null');
                          return _context.abrupt("return", {
                            valid: false
                          });

                        case 4:
                          _context.next = 6;
                          return req.server.app.cache.get(session.sid);

                        case 6:
                          credentials = _context.sent;
                          server.log('Cookie validateFunc', credentials);
                          return _context.abrupt("return", {
                            valid: true,
                            credentials: credentials
                          });

                        case 9:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                function validateFunc(_x3, _x4) {
                  return _validateFunc.apply(this, arguments);
                }

                return validateFunc;
              }()
            };
            server.log('Cookie Options', cookieOptions);
            server.auth.strategy('session', 'cookie', cookieOptions);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _iappCookie.apply(this, arguments);
}