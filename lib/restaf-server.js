(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("debug"), require("qs"), require("request"), require("uuid"), require("babel-polyfill"), require("bell"), require("boom"), require("fs"), require("hapi"), require("hapi-auth-cookie"), require("inert"), require("os"), require("path"), require("v8"));
	else if(typeof define === 'function' && define.amd)
		define("restaf-server", ["debug", "qs", "request", "uuid", "babel-polyfill", "bell", "boom", "fs", "hapi", "hapi-auth-cookie", "inert", "os", "path", "v8"], factory);
	else if(typeof exports === 'object')
		exports["restaf-server"] = factory(require("debug"), require("qs"), require("request"), require("uuid"), require("babel-polyfill"), require("bell"), require("boom"), require("fs"), require("hapi"), require("hapi-auth-cookie"), require("inert"), require("os"), require("path"), require("v8"));
	else
		root["restaf-server"] = factory(root["debug"], root["qs"], root["request"], root["uuid"], root["babel-polyfill"], root["bell"], root["boom"], root["fs"], root["hapi"], root["hapi-auth-cookie"], root["inert"], root["os"], root["path"], root["v8"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_16__, __WEBPACK_EXTERNAL_MODULE_17__, __WEBPACK_EXTERNAL_MODULE_18__) {
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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



var request = __webpack_require__(3).defaults({
    jar: true
}),
    bell = __webpack_require__(10),
    debug = __webpack_require__(1)('auth'),
    qs = __webpack_require__(2),
    uuid = __webpack_require__(4),
    authCookie = __webpack_require__(14);

module.exports = function (hapiServer, cb) {
    var authCookieOptions, bellAuthOptions, provider;

    // TBD: need to add other options like keepalive after initial testing
    authCookieOptions = {
        password: uuid.v4(),
        cookie: 'session',
        domain: process.env.APPHOST,
        isSecure: false

    };

    var authURL = process.env.SAS_PROTOCOL + process.env.VIYA_SERVER;
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

    debug('Enabling authentication');
    hapiServer.register([bell, authCookie], function (err) {
        debugger;
        if (err) {
            cb(err);
        }
        /* set the cookie strategy */
        debugger;
        hapiServer.auth.strategy('session', 'cookie', true, authCookieOptions);
        /* now set the SAS strategy */
        debug(bellAuthOptions);
        hapiServer.auth.strategy('sas', 'bell', false, bellAuthOptions);

        cb(null);
    });
};
/*
validateFunc: function( req, session, callback ) {
    callback( null, true, session );
}
*/

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("qs");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ }),
/* 5 */
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
var path = __webpack_require__(17);
var iService = __webpack_require__(8);
var config = __webpack_require__(7);

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
/* 6 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 7 */
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



var fs = __webpack_require__(12);

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
    } catch (err) {
        console.log(err);
        process.exit(0);
    }
};

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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var debug = __webpack_require__(1);
var debugProxy = debug('proxy');
var debugRouter = debug('router');
var proxyLogger = debug('proxylogger');
var responseLogger = debug('response');
var server = __webpack_require__(9);
var boom = __webpack_require__(11);
var request = __webpack_require__(3);
/* require( 'request-debug' )( request ); */
var os = __webpack_require__(16);
var v8 = __webpack_require__(18);
var SASauth = __webpack_require__(0);
var qs = __webpack_require__(2);
var uuid = __webpack_require__(4);

module.exports = function iService(uTable, useDefault, asset, rootHandler) {

    //
    // By default only the main entry is authenticated.
    // This is because EDGE seems to have some strange policies - it does not return authenticated info on
    // subsequent calls to the server. Cannot figure out why.
    // I also added caching of token - should not really need it once I figure out the EDGE use case.
    //
    function customConfig(a) {
        var config = { handler: a };
        if (process.env.hasOwnProperty('SECONDARYROUTEOAUTH2') === false || process.env.SECONDARYROUTEOAUTH2 === 'NO') {
            config.auth = false;
        }
        return config;
    }

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

    if (process.env.OAUTH2 === 'YES') {
        auth1 = {
            mode: 'required',
            strategy: 'sas'
        };
        auth2 = {
            mode: 'try',
            strategy: 'session'
        };
    } else {
        auth1 = false;
        auth2 = false;
    }

    var defaultTable = [{
        method: ['GET'],
        path: '' + appName,
        config: {
            auth: auth1,
            handler: process.env.OAUTH2 === 'YES' ? getAuthApp.bind(null, rootHandler) : getApp
        }
    }, {
        method: ['GET'],
        path: appName + '/{param*}',
        config: customConfig(getApp2)

    }, {
        method: ['GET'],
        path: appName + '/callback',
        handler: AppCallback

    }, {
        method: ['GET'],
        path: '/shared/{param*}',
        config: customConfig(getShared)
    }, {
        method: ['GET'],
        path: '/restafServerInfo',
        config: customConfig(serverInfo)
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
                handler: handleProxy,
                auth: auth2
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

//
// Had to add cache to handle Edge browser - must be a way not to have to do this.
//
function testServer(req, reply) {
    debugger;
    if (process.env.OAUTH2 === 'YES') {
        getToken(req, reply, function (err, token) {
            if (err) {
                reply(boom.unauthorized(err));
            } else {
                reply.file('testserver.html');
            }
        });
    } else {
        reply.file('testservernoauth.html');
    }
}

function getToken(req, reply, cb) {
    debugger;
    if (req.auth.credentials !== null) {
        cb(null, req.auth.credentials.session);
    } else {
        req.server.app.cache.get('edge', function (err, credentials) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, credentials.token);
            }
        });
    }
}
function handleProxy(req, reply) {
    debugger;
    getToken(req, reply, function (err, token) {
        if (err) {
            reply(boom.unauthorized(err));
        } else {
            handleProxyRequest(req, reply, token);
        }
    });
}

function handleProxyRequest(req, reply, token) {
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
            console.log('Request failed');
            console.log(err);
            console.log(JSON.stringify(err, null, 4));
            reply(err);
        } else {
            debugger;
            responseLogger({ url: '------------------------------------------' + config.url });
            responseLogger(req.query);
            responseLogger(typeof body === 'string' ? { body: body } : body);
            var _headers = _extends({}, response.headers);
            if (_headers.hasOwnProperty('content-encoding')) {
                delete _headers['content-encoding'];
            }
            responseLogger(response.headers['content-coding']);
            reply(body).headers = _extends({}, _headers);
        }
    });
}

function getApp(req, reply) {
    debugger;
    var path = 'index.html';
    reply.file(path);
}

function getIcon(req, reply) {
    reply.file('favicon.ico');
}

function getAuthApp(rootHandler, req, reply) {
    debugger;
    if (!req.auth.isAuthenticated) {
        reply(boom.unauthorized(req.auth.error.message));
    } else {
        debugger;
        debugRouter('Logged on successfully');

        req.cookieAuth.set({ session: req.auth.credentials.token });

        req.server.app.cache.set('edge', req.auth.credentials);

        if (rootHandler !== null) {
            rootHandler(req, reply);
        } else {
            debugger;
            var indexHTML = process.env.APPENTRY == null ? 'index.html' : process.env.APPENTRY;
            reply.file('' + indexHTML);
        }
    }
}

function AppCallback(req, reply) {
    proxyLogger('In callback');
    reply.file(process.env.CALLBACK + '.html');
}

function getApp2(req, reply) {
    reply.file(req.params.param);
}

function getShared(req, reply) {
    reply.file('shared/' + req.params.param);
}
function serverInfo(req, reply) {
    debugger;
    var js = 'let VIYA_HOST   = "' + process.env.VIYA_SERVER + '";\n              let SSL_ENABLED = "' + process.env.SAS_SSL_ENABLED + '";';
    reply.response(js);
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

var Hapi = __webpack_require__(13),
    inert = __webpack_require__(15),
    SASauth = __webpack_require__(0),
    hapiServer = new Hapi.Server();

module.exports = function (userRouterTable, asset, rootHandler) {
    debugger;

    process.env.APPHOST_ADDR = process.env.APPHOST;
    startServer(userRouterTable, asset);

    function startServer(userRouterTable, asset) {
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

        console.log(JSON.stringify(sConfig, null, 4));
        hapiServer.connection(sConfig);
        // hapiServer.cache( {segment: 'credentials', expiresIn: 24*60*60*1000 } );


        // TBD: need to fix this async call for inert - ok for now
        // probably make them into promises

        hapiServer.register(inert, function () {});

        if (process.env.OAUTH2 !== 'YES') {
            console.log('setting route');
            hapiServer.route(userRouterTable);
            hapiServer.start(function (err) {
                if (err) {
                    throw err;
                }
                console.log('Server started at: ' + hapiServer.info.uri + '/' + process.env.APPNAME);
            });
        } else {
            SASauth(hapiServer, function (err) {
                if (err) {
                    console.log(err);
                    process.exit(1);
                } else {
                    hapiServer.route(userRouterTable);
                    //noinspection JSUnusedLocalSymbols
                    hapiServer.on('request-error', function (request, err) {
                        console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode);
                    });
                    hapiServer.ext('onPreResponse', function (request, reply) {
                        var response = request.response;
                        if (!response.isBoom) {
                            return reply.continue();
                        }

                        // log 400 and above
                        //noinspection JSUnresolvedVariable
                        if (response.output.statusCode >= 400 && response.output.statusCode < 500) {

                            console.log('Client error');
                            console.log({
                                response: response,
                                requestData: request.orig,
                                path: request.path
                            });
                        }

                        reply.continue();
                    });
                    process.env.HEALTH = 'OK';
                    hapiServer.app.cache = hapiServer.cache({ segment: 'edge', expiresIn: 14 * 24 * 60 * 60 * 1000 });
                    debugger;
                    hapiServer.start(function (err) {
                        if (err) {
                            throw err;
                        }
                        console.log('Server started at: ' + hapiServer.info.uri + '/' + process.env.APPNAME);
                    });
                }
            });
        }
    }
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("bell");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("boom");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("hapi");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("hapi-auth-cookie");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("inert");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("v8");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(6);
module.exports = __webpack_require__(5);


/***/ })
/******/ ]);
});