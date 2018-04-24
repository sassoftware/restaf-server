
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

'use strict';

let debug          = require('debug');
let debugProxy     = debug('proxy');
let debugRouter    = debug('router');
let proxyLogger    = debug('proxylogger');
let responseLogger = debug('response');
let server       = require('./server');
let boom         = require('boom');
let request      = require('request');
/* require( 'request-debug' )( request ); */
let os           = require('os');
let v8           = require('v8');
let SASauth      = require('./SASauth');
let qs           = require('qs');
let uuid         = require('uuid');

module.exports = function iService (uTable, useDefault , asset, rootHandler){

    process.env.APPHOST = (process.env.APPHOST === '*') ? os.hostname() : process.env.APPHOST;
    let appName = '/' + process.env.APPNAME;
    let auth1 = {};
    let auth2 = {};
    let handleOthers;

    if (process.env.PROXYSERVER === 'YES'){
        process.env.OAUTH2='YES';
    }
    console.log(`appName ${appName}`);
    console.log(`asset ${asset} `);
    console.log(`uTable ${uTable}`);

    if (process.env.OAUTH2 === 'YES') {
        auth1 = {
            mode    : 'required',
            strategy: 'sas'
        };
        auth2 = {
            mode    : 'required',
            strategy: 'session'
        };
        auth2 = false;
    }
    else {
        auth1 = false;
        auth2 = false;
    }
  
    let defaultTable =
            [ {
                method: [ 'GET' ],
                path  : `${appName}`,
                config: {
                    auth   : auth1,
                    handler: getApp
                }
            }, {
                method: [ 'GET' ],
                path  : `${appName}/{param*}`,
                config: {
                    handler: getApp2
                }

            }, {
                method: [ 'GET' ],
                path  : `${appName}/callback${appName}`,
                config: {
                    handler: AppCallback
                }

            }, {
                method: [ 'GET' ],
                path  : `/shared/{param*}`,
                config: {
                    handler: getShared
                }
            }, {
                method: [ 'GET' ],
                path  : `/restafServerInfo`,
                config: {
                    auth   : false,
                    handler: serverInfo
                }
            },{
                method: [ 'GET' ],
                path  : '/favicon.ico',
                config: {
                    auth   : false,
                    handler: getIcon
                }
            }, {
                method: [ 'GET' ],
                path  : '/testserver',
                config: {
                    handler: testServer
                }
            }
            ];

    // Tried payload.parse = false -- way too much code to handle payload
    if (process.env.PROXYSERVER === 'YES') {
        handleOthers = {
            method: [ '*' ],
            path  : '/{params*}',
            config: {
                handler: handleProxy
            }
        };
        defaultTable = [ ...defaultTable, handleOthers ];
    } else {
        handleOthers = {
            method: [ 'GET' ],
            path  : '/{param*}',
            config: {
                auth   : false,
                handler: getApp2
            }
        };
        defaultTable = [ ...defaultTable, handleOthers ] ;
    }

    let userRouterTable;
    if (uTable !== null) {
        if (useDefault === true) {
            userRouterTable = [ ...defaultTable, ...uTable ];
        } else {
            userRouterTable = [ ...uTable ];
        }
    } else {
        userRouterTable = [ ...defaultTable ];
    }
    debugger;
    console.log(JSON.stringify(userRouterTable, null, 4));
    server(userRouterTable, asset);

};

//
// Had to add cache to handle Edge browser - must be a way not to have to do this.
//
async function testServer (req, h) {
    debugger;
    let token ;
    let url = 'testserver.html';
    console.log(req.auth.credentials);
    return h.file(url);
}




async function getApp (req, h) {
    debugger;
    if (process.env.PROXYSERVER === 'YES') {
        return getAuthApp(null, req,h)
    } else { 
        let indexHTML = (process.env.APPENTRY == null) ? 'index.html' : process.env.APPENTRY;
        return h.file(indexHTML);
    }
}

async function getAuthApp (rootHandler, req, h) {
    debugger;
    const sid = uuid.v4();
    await req.server.app.cache.set(sid,  req.auth.credentials) ;
    req.cookieAuth.set({sid});
    let indexHTML = (process.env.APPENTRY == null) ? 'index.html' : process.env.APPENTRY;
    return h.file(`${indexHTML}`);
}

async function handleProxy (req, h) {
    debugger;
    let token;
    try {
        token  = await getToken(req, h);
        debugger;
        let proxyResponse = await handleProxyRequest(req, h, token);
       
        let response = h.response(proxyResponse.body);
        for (let hkey in proxyResponse.headers){
            response.header(hkey, proxyResponse.headers[hkey]);
        }
        return response;
    }
    catch(err) {
        return boom.unauthorized(err)
    }
}
async function getToken (req, h) {
    debugger;
    if (req.auth.credentials !== null) {
        debugger;
        return req.auth.credentials.token;

    } else {
        debugger;
        let sid = await req.server.app.cache.get(sid);
        debugger;
        return sid.credentials;
    }
}
function handleProxyRequest (req, h, token) {
    return new Promise((resolve, reject) => {
        debugger;
        let uri   = `${process.env.SAS_PROTOCOL}${process.env.VIYA_SERVER}/${req.params.params}`;
        let headers = { ...req.headers };
        delete headers.host;
        delete headers[ 'user-agent' ];
        delete headers.origin;
        delete headers.referer;
        delete headers.connection;
        if (headers.cookie) {
            delete headers.cookie;
        }
        debugger;
        let config = {
            url    : uri,
            method : req.method,
            headers: headers,
            gzip   : true,
            auth   : {
                bearer: token
            }
        };


        if (req.payload != null) {
            debugProxy(console.log(headers['content-type']));
            if (headers['content-type'] === 'application/octet-stream') {
                config.body = req.payload;
            } else {
                config.body = (typeof req.payload === 'object') ? JSON.stringify(req.payload) : req.payload;
            }
        }

        if (req.query !== null && Object.keys(req.query).length > 0) {
            config.qs = req.query;
        }

        debugProxy(JSON.stringify(config, null, 4));
        proxyLogger(config.url);
        request(config, (err, response, body) =>  {
            debugger;
            if (err) {
                reject(err); 
            } else {
                debugger;
                responseLogger({url: `------------------------------------------${config.url}`});
                responseLogger(req.query);
                responseLogger((typeof body === 'string' ? {body: body} : body));
                if (response.headers.hasOwnProperty('content-encoding')) {
                    delete response. headers['content-encoding'];
                }
                responseLogger(response.headers['content-coding']);
                debugger;
                resolve({headers: response.headers, body: body});
        
            }
        });
    });
}






async function AppCallback (req, h) {
    proxyLogger('In callback');
    let indexHTML = (process.env.APPENTRY == null) ? 'index.html' : process.env.APPENTRY;
    return h.file(`${indexHTML}`);
}

//
// get app server files
//

async function getIcon (req, h) {
    debugger;
    return h.file('favicon.ico');
}

async function getApp2 (req, h) {
    return h.file(req.params.param);
}

async function getShared (req, h) {
    debugger;
    return h.file(`shared/${req.params.param}`);
}
async function serverInfo (req, h) {
    debugger;
    let protocol = (process.env.SAS_SSL_ENABLED === 'YES') ? 'https://' :'http://';
    let js = `let VIYA_HOST   = "${protocol}${process.env.VIYA_SERVER}";`;
    return js;
}

