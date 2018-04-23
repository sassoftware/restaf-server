(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("restaf-server", [], factory);
	else if(typeof exports === 'object')
		exports["restaf-server"] = factory();
	else
		root["restaf-server"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 *  ------------------------------------------------------------------------------------
 *  * Copyright (c) SAS Institute Inc.
 *  *  Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  * http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  limitations under the License.
 * ----------------------------------------------------------------------------------------
 *
 */



Object.defineProperty(exports, "__esModule", {
    value: true
});

var SASauth = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(hapiServer) {
        var authCookieOptions, bellAuthOptions, provider, authURL;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        authCookieOptions = void 0, bellAuthOptions = void 0, provider = void 0;

                        // TBD: need to add other options like keepalive after initial testing

                        authCookieOptions = {
                            password: uuid.v4(),
                            cookie: 'session',
                            domain: process.env.APPHOST,
                            isSecure: false

                        };

                        if (!(process.env.OAUTH2 === 'YES')) {
                            _context.next = 12;
                            break;
                        }

                        authURL = process.env.SAS_PROTOCOL + process.env.VIYA_SERVER;

                        provider = {
                            name: 'sas',
                            protocol: 'oauth2',
                            useParamsAuth: false,
                            auth: authURL + '/SASLogon/oauth/authorize',
                            token: authURL + '/SASLogon/oauth/token'
                        };

                        bellAuthOptions = {
                            provider: provider,
                            password: uuid.v4(),
                            clientId: process.env.CLIENTID,
                            clientSecret: process.env.CLIENTSECRET == null ? ' ' : process.env.CLIENTSECRET,
                            isSecure: false
                        };

                        if (process.env.BELL_LOCATION != null) {
                            bellAuthOptions.location = process.env.BELL_LOCATION;
                        }

                        debugger;
                        _context.next = 10;
                        return hapiServer.register(bell);

                    case 10:

                        // hapiServer.auth.strategy('session', 'authCookie', authCookieOptions);

                        debug(bellAuthOptions);
                        //hapiServer.auth.default(bell);
                        hapiServer.auth.strategy('sas', 'bell', bellAuthOptions);

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function SASauth(_x) {
        return _ref.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var bell = __webpack_require__(10),
    debug = __webpack_require__(0)('auth'),
    qs = __webpack_require__(2),
    uuid = __webpack_require__(3),
    authCookie = __webpack_require__(11);

exports.default = SASauth;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("qs");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(5);
module.exports = __webpack_require__(6);


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 *  ------------------------------------------------------------------------------------
 *  * Copyright (c) SAS Institute Inc.
 *  *  Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  * http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  limitations under the License.
 * ----------------------------------------------------------------------------------------
 *
 */



Object.defineProperty(exports, "__esModule", {
    value: true
});
var path = __webpack_require__(7);
var iService = __webpack_require__(8);
var config = __webpack_require__(19);

debugger;
function UIapp(uTable, rootHandler, rafEnv) {
    debugger;
    var asset = setup(rafEnv);
    iService(uTable, uTable !== null, asset, rootHandler);
}

function service(uTable, rootHandler, rafEnv) {
    var asset = setup(rafEnv);
    iService(uTable, false, asset, rootHandler);
}

function setup(rafEnv) {
    debugger;
    console.log(rafEnv);
    config(rafEnv);
    var asset = process.env.APPLOC === '.' ? process.cwd() : process.env.APPLOC;
    process.env.APPASSET = asset;
    return asset;
}
exports.service = service;
exports.UIapp = UIapp;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 *  ------------------------------------------------------------------------------------
 *  * Copyright (c) SAS Institute Inc.
 *  *  Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  * http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  limitations under the License.
 * ----------------------------------------------------------------------------------------
 *
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
// Had to add cache to handle Edge browser - must be a way not to have to do this.
//
var testServer = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, h) {
        var token, url;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        debugger;
                        token = void 0;
                        url = 'testserver.html';

                        if (!(process.env.OAUTH2 === 'YES')) {
                            _context.next = 9;
                            break;
                        }

                        _context.next = 6;
                        return getToken(req, h);

                    case 6:
                        token = _context.sent;
                        _context.next = 10;
                        break;

                    case 9:
                        url = 'testservernoauth.html';

                    case 10:
                        return _context.abrupt('return', h.file(url));

                    case 11:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function testServer(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var getToken = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, h) {
        var credentials;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        debugger;

                        if (!(req.auth.credentials !== null)) {
                            _context2.next = 5;
                            break;
                        }

                        return _context2.abrupt('return', req.auth.credentials.session);

                    case 5:
                        _context2.next = 7;
                        return req.server.app.cache.get('edge');

                    case 7:
                        credentials = _context2.sent;

                        debugger;
                        return _context2.abrupt('return', credentials.token);

                    case 10:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function getToken(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var handleProxy = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, h) {
        var token, proxyResponse, response, hkey;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        debugger;
                        token = void 0;
                        _context3.prev = 2;
                        _context3.next = 5;
                        return getToken(req, h);

                    case 5:
                        token = _context3.sent;

                        debugger;
                        _context3.next = 9;
                        return handleProxyRequest(req, h, token);

                    case 9:
                        proxyResponse = _context3.sent;
                        response = h.response(proxyResponse.body);

                        for (hkey in proxyResponse.headers) {
                            response.header(hkey, proxyResponse.headers[hkey]);
                        }
                        return _context3.abrupt('return', response);

                    case 15:
                        _context3.prev = 15;
                        _context3.t0 = _context3['catch'](2);
                        return _context3.abrupt('return', boom.unauthorized(_context3.t0));

                    case 18:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[2, 15]]);
    }));

    return function handleProxy(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

var getApp = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, h) {
        var path;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        debugger;
                        console.log('in getApp');
                        path = process.env.APPENTRY;
                        return _context4.abrupt('return', h.file(path));

                    case 4:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function getApp(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

var getIcon = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, h) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        debugger;
                        return _context5.abrupt('return', h.file('favicon.ico'));

                    case 2:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function getIcon(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();

var getAuthApp = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(rootHandler, req, h) {
        var indexHTML;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        debugger;
                        req.server.app.cache.set('edge', req.auth.credentials);
                        indexHTML = process.env.APPENTRY == null ? 'index.html' : process.env.APPENTRY;
                        return _context6.abrupt('return', h.file('' + indexHTML));

                    case 4:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));

    return function getAuthApp(_x11, _x12, _x13) {
        return _ref6.apply(this, arguments);
    };
}();

var AppCallback = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, h) {
        var indexHTML;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        proxyLogger('In callback');
                        indexHTML = process.env.APPENTRY == null ? 'index.html' : process.env.APPENTRY;
                        return _context7.abrupt('return', h.file('' + indexHTML));

                    case 3:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, this);
    }));

    return function AppCallback(_x14, _x15) {
        return _ref7.apply(this, arguments);
    };
}();

var getApp2 = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, h) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        return _context8.abrupt('return', h.file(req.params.param));

                    case 1:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, this);
    }));

    return function getApp2(_x16, _x17) {
        return _ref8.apply(this, arguments);
    };
}();

var getShared = function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, h) {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        debugger;
                        return _context9.abrupt('return', h.file('shared/' + req.params.param));

                    case 2:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee9, this);
    }));

    return function getShared(_x18, _x19) {
        return _ref9.apply(this, arguments);
    };
}();

var serverInfo = function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, h) {
        var protocol, js;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        debugger;
                        protocol = process.env.SAS_SSL_ENABLED === 'YES' ? 'https://' : 'http://';
                        js = 'let VIYA_HOST   = "' + protocol + process.env.VIYA_SERVER + '";';
                        return _context10.abrupt('return', js);

                    case 4:
                    case 'end':
                        return _context10.stop();
                }
            }
        }, _callee10, this);
    }));

    return function serverInfo(_x20, _x21) {
        return _ref10.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var debug = __webpack_require__(0);
var debugProxy = debug('proxy');
var debugRouter = debug('router');
var proxyLogger = debug('proxylogger');
var responseLogger = debug('response');
var server = __webpack_require__(9);
var boom = __webpack_require__(15);
var request = __webpack_require__(16);
/* require( 'request-debug' )( request ); */
var os = __webpack_require__(17);
var v8 = __webpack_require__(18);
var SASauth = __webpack_require__(1);
var qs = __webpack_require__(2);
var uuid = __webpack_require__(3);

module.exports = function iService(uTable, useDefault, asset, rootHandler) {

    process.env.APPHOST = process.env.APPHOST === '*' ? os.hostname() : process.env.APPHOST;
    var appName = '/' + process.env.APPNAME;
    var auth1 = {};
    var auth2 = {};
    var handleOthers = void 0;

    if (process.env.PROXYSERVER === 'YES') {
        process.env.OAUTH2 = 'YES';
    }
    console.log('appName ' + appName);
    console.log('asset ' + asset + ' ');
    console.log('uTable ' + uTable);

    debugger;
    function checkProxy(a) {
        var handler = a;
        if (process.env.PROXYSERVER === 'YES') {
            var proxy = {
                host: '' + process.env.VIYA_SERVER,
                protocol: process.env.HAPI_PROTOCOL
            };
            if (process.env.HAPI_PROTOCOL === 'https') {
                proxy.port = '443';
            }
            handler = {
                proxy: proxy
            };
        }
        return handler;
    }

    if (process.env.OAUTH2 === 'YES') {
        auth1 = {
            mode: 'required',
            strategy: 'sas'
        };
        auth2 = {
            mode: 'try',
            strategy: 'session'
        };
        auth2 = false;
    } else {
        auth1 = false;
        auth2 = false;
    }

    var defaultTable = [{
        method: ['GET'],
        path: '' + appName,
        config: {
            auth: auth1,
            handler: getApp
        }
    }, {
        method: ['GET'],
        path: appName + '/{param*}',
        config: {
            handler: getApp2
        }

    }, {
        method: ['GET'],
        path: appName + '/callback' + appName,
        config: {
            auth: false,
            handler: AppCallback
        }

    }, {
        method: ['GET'],
        path: '/shared/{param*}',
        config: {
            handler: getShared
        }
    }, {
        method: ['GET'],
        path: '/restafServerInfo',
        config: {
            handler: serverInfo
        }
    }, {
        method: ['GET'],
        path: '/favicon.ico',
        config: {
            auth: false,
            handler: getIcon
        }
    }, {
        method: ['GET'],
        path: '/testserver',
        config: {
            auth: auth2,
            handler: testServer
        }
    }];

    // Tried payload.parse = false -- way too much code to handle payload
    if (process.env.PROXYSERVER === 'YES') {
        handleOthers = {
            method: ['*'],
            path: '/{params*}',
            config: {
                handler: checkProxy(handleProxy)
            }
        };
        defaultTable = [].concat(_toConsumableArray(defaultTable), [handleOthers]);
    } else {
        handleOthers = {
            method: ['GET'],
            path: '/{param*}',
            config: {
                handler: getApp2
            }
        };
        defaultTable = [].concat(_toConsumableArray(defaultTable), [handleOthers]);
    }

    var userRouterTable = void 0;
    if (uTable !== null) {
        if (useDefault === true) {
            userRouterTable = [].concat(_toConsumableArray(defaultTable), _toConsumableArray(uTable));
        } else {
            userRouterTable = [].concat(_toConsumableArray(uTable));
        }
    } else {
        userRouterTable = [].concat(_toConsumableArray(defaultTable));
    }
    debugger;
    console.log(JSON.stringify(userRouterTable, null, 4));
    server(userRouterTable, asset);
};

function handleProxyRequest(req, h, token) {
    return new Promise(function (resolve, reject) {
        debugger;
        var uri = '' + process.env.SAS_PROTOCOL + process.env.VIYA_SERVER + '/' + req.params.params;
        var headers = _extends({}, req.headers);
        delete headers.host;
        delete headers['user-agent'];
        delete headers.origin;
        delete headers.referer;
        delete headers.connection;
        if (headers.cookie) {
            delete headers.cookie;
        }
        debugger;
        var config = {
            url: uri,
            method: req.method,
            headers: headers,
            gzip: true,
            auth: {
                bearer: token
            }
        };

        if (req.payload != null) {
            debugProxy(console.log(headers['content-type']));
            if (headers['content-type'] === 'application/octet-stream') {
                config.body = req.payload;
            } else {
                config.body = _typeof(req.payload) === 'object' ? JSON.stringify(req.payload) : req.payload;
            }
        }

        if (req.query !== null && Object.keys(req.query).length > 0) {
            config.qs = req.query;
        }

        debugProxy(JSON.stringify(config, null, 4));
        proxyLogger(config.url);
        request(config, function (err, response, body) {
            debugger;
            if (err) {
                reject(err);
            } else {
                debugger;
                responseLogger({ url: '------------------------------------------' + config.url });
                responseLogger(req.query);
                responseLogger(typeof body === 'string' ? { body: body } : body);
                if (response.headers.hasOwnProperty('content-encoding')) {
                    delete response.headers['content-encoding'];
                }
                responseLogger(response.headers['content-coding']);
                debugger;
                resolve({ headers: response.headers, body: body });
            }
        });
    });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 *  ------------------------------------------------------------------------------------
 *  * Copyright (c) SAS Institute Inc.
 *  *  Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  * http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  limitations under the License.
 * ----------------------------------------------------------------------------------------
 *
 */


// proxy server

var _SASauth = __webpack_require__(1);

var _SASauth2 = _interopRequireDefault(_SASauth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Hapi = __webpack_require__(12),
    inert = __webpack_require__(13),
    h2o2 = __webpack_require__(14),
    hapiServer = void 0;


module.exports = function (userRouterTable, asset, rootHandler) {
    var _this = this;

    debugger;

    process.env.APPHOST_ADDR = process.env.APPHOST;

    var sConfig = {
        port: process.env.APPPORT,
        host: process.env.APPHOST_ADDR,
        routes: {
            cors: {
                origin: ['*'],
                credentials: true,

                additionalHeaders: ['accept'],
                additionalExposedHeaders: ['location']
            }
        }
    };

    if (asset !== null) {
        console.log(asset);
        sConfig.routes.files = { relativeTo: asset };
    }

    hapiServer = Hapi.server(sConfig);

    if (process.env.OAUTH2 !== 'YES') {
        var info = (0, _SASauth2.default)(hapiServer);
    }

    var init = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return hapiServer.register(inert);

                        case 2:
                            _context.next = 4;
                            return (0, _SASauth2.default)(hapiServer);

                        case 4:
                            _context.next = 6;
                            return hapiServer.register(h2o2);

                        case 6:
                            hapiServer.route(userRouterTable);

                            hapiServer.app.cache = hapiServer.cache({
                                segment: 'edge',
                                expiresIn: 14 * 24 * 60 * 60 * 1000
                            });

                            _context.next = 10;
                            return hapiServer.start();

                        case 10:
                            console.log('--------------------------------------------');
                            console.log(JSON.stringify(sConfig, null, 4));
                            console.log('--------------------------------------------');
                            console.log(' server started at: ' + hapiServer.info.uri + '/' + process.env.APPNAME);

                        case 14:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function init() {
            return _ref.apply(this, arguments);
        };
    }();

    process.on('unhandledRejection', function (err) {

        console.log(err);
        process.exit(1);
    });

    init();
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("bell");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("hapi-auth-cookie");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("hapi");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("inert");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("h2o2");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("boom");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("v8");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 *  ------------------------------------------------------------------------------------
 *  * Copyright (c) SAS Institute Inc.
 *  *  Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  * http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  limitations under the License.
 * ----------------------------------------------------------------------------------------
 *
 */



var fs = __webpack_require__(20);

module.exports = function config(appEnv) {
    debugger;
    try {
        var data = fs.readFileSync(appEnv, 'utf8');
        var d = data.split(/\r?\n/);
        console.log('Configuration specified via raf.env');
        d.forEach(function (l) {
            if (l.length > 0 && l.indexOf('#') === -1) {
                var la = l.split('=');
                if (la.length > 0) {
                    if (la[1] === '') {
                        delete process.env[la[1]];
                    } else {
                        process.env[la[0]] = la[1];
                    }
                    console.log(la[0] + '=' + la[1]);
                }
            }
        });
        process.env.SAS_PROTOCOL = process.env.SAS_SSL_ENABLED === 'YES' ? 'https://' : 'http://';
        process.env.HAPI_PROTOCOL = process.env.SAS_SSL_ENABLED === 'YES' ? 'https' : 'http';
    } catch (err) {
        console.log(err);
        process.exit(0);
    }
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ })
/******/ ]);
});