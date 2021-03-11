"use strict";

var _handlers = require("../handlers");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = function setDefaultRoutes(server, options) {
  var appName = '/' + options.appName;
  var authDefault = false;
  var authLogon = false;

  if (options.authFlow === 'server') {
    authDefault = {
      strategies: options.serverMode === 'api' ? ['token', 'session'] : ['session'],
      mode: 'required'
    };
    authLogon = {
      mode: 'required',
      strategy: 'sas'
    };
  }

  server.log('Default strategy', authDefault);
  server.log('Logon strategy', authLogon);
  options.authDefault = authDefault;
  options.authLogon = authLogon;
  var uTable = options.userRouteTable !== null ? (0, _handlers.setupUserRoutes)(options.userRouteTable, authDefault) : null;
  var defaultTable = [{
    method: ['GET'],
    path: "".concat(appName),
    options: {
      auth: options.serverMode === 'app' ? authLogon : authDefault,
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
                  return _context.abrupt("return", h.redirect("".concat(appName, "/documentation")));

                case 1:
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
  },
  /*{
  method : ['GET'],
  path   : `/swagger.json`,
  options: {
  auth   : authDefault,
  handler: async (req, h) => {
  	return h.redirect(`${appName}/swagger.json`);
  },
  },
  },*/
  {
    method: ['GET'],
    path: "".concat(appName, "/logon"),
    options: {
      auth: authLogon,
      //https://futurestud.io/tutorials/hapi-redirect-to-previous-page-after-login
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false
        }
      },
      handler: _handlers.logon
    }
  }, {
    method: ['GET'],
    path: "".concat(appName, "/callback"),
    options: {
      auth: authDefault,
      handler: _handlers.appCallback
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
    method: ['GET'],
    path: "".concat(appName, "/appenv"),
    options: {
      auth: authDefault,
      handler: function handler(req, h) {
        var allAppEnv = options.allAppEnv;

        if (options.userInfo != null) {
          allAppEnv.APPENV = options.userInfo(options, 'APPENV');
        }

        var s = "let LOGONPAYLOAD = ".concat(JSON.stringify(allAppEnv.LOGONPAYLOAD), ";") + "let APPENV = ".concat(JSON.stringify(allAppEnv.APPENV), ";");
        return s;
      }
    }
  }, {
    method: ['GET'],
    path: "".concat(appName, "/{param*}"),
    options: {
      auth: authDefault,
      handler: _handlers.getApp2
    }
  }, {
    method: ['GET'],
    path: "/{param*}",
    options: {
      auth: authDefault,
      handler: _handlers.getApp2
    }
  }, {
    method: ['GET'],
    path: "/favicon.ico",
    options: {
      auth: false,
      handler: _handlers.favicon
    }
  }, {
    method: ['GET', 'POST'],
    path: "".concat(appName, "/keepAlive2"),
    options: {
      auth: authDefault,
      handler: _handlers.keepAlive2
    }
  }];
  var routeTables = uTable !== null ? defaultTable.concat(uTable) : defaultTable;
  server.log('routes', routeTables);
  console.table(routeTables);
  server.route(routeTables);
};