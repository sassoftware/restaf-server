
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
// let debugSetup     = debug('setup');

import server from './server';
import {getApp, handleProxy, keepAlive, appCallback, logon} from './handlers'
let os = require('os');
let Joi = require('@hapi/joi');

function iService (uTable, useDefault, asset, allAppEnv) {
    debugger;
    process.env.APPHOST = (process.env.APPHOST === '*') ? os.hostname() : process.env.APPHOST;
    let appName = '/' + process.env.APPNAME;
    let auth1 = {};
    let auth2 = false;
    let defaultMaxBytes = 10485760; 

    let maxBytes;
    if (isNaN(process.env.PAYLOADMAXBYTES)) {
        maxBytes = defaultMaxBytes;
    } else {
        maxBytes = Number(process.env.PAYLOADMAXBYTES);
    }

    if (process.env.PROXYSERVER === 'YES') {
        process.env.OAUTH2 = 'YES';
    }
    console.log(`
      appName  : ${appName}
      asset    : ${asset}
      uTable   : ${uTable}
      appenv   : 
    `);

    console.log(JSON.stringify(allAppEnv, null,4));

    let getAppEnv = async (req, h) => {
        return allAppEnv;
    }

    if (process.env.OAUTH2 === 'YES') {
        auth1 = {
            mode    : 'required',
            strategy: 'sas'
        }; 
    }
    else {
        auth1 = false;
    }

    // see if appenv was overridden
    
    let hasAppEnv = null;
    debugger;
    if (uTable !== null) {
        hasAppEnv = uTable.find(u => u.path === '/appenv');
    }
    

    // end temp patch
    let defaultTable =
        [
        {
            method: [ 'GET' ],
            path  : `${appName}`,
            config: {
                description: 'Start the Application',
                notes      : [ 'Invoke this end point to start your application',
                               'Will redirect to asset named in APPENTRY',
                               'If logging on with authentication make sure you have set the following in the configuration files',
                                'VIYA_SERVER to your Viya Server url',
                                'AUTHFLOW to implicit or authorization_code',
                                'CLIENTID to your client ID',
                                'CLIENTSECRET if you are using authorization_code',
                                'APPENTRY to the apps main html'
                             ],
                tags: [ 'api', 'Application' ],

                auth   : auth1,
                handler: getApp
            }
        },  {
            method: [ 'GET' ],
            path  : `${appName}/{param*}`,
            config: {
                description: 'Returns the specified asset',
                validate   : {
                    params: Joi.object({
                        param: Joi.string().required()
                    })
                },
                tags: [ 'api', 'Assets' ],

                auth   : auth2,
                handler: getApp2
            }

        }, {
            method: [ 'GET' ],
            path  : `/callback`,
            config: {
               
                description: 'This is used by the /logon - do not call this directly',
        
                auth   : false,
                handler: appCallback
                
            }

        },  {
            method: [ 'GET', 'POST' ],
            path  : `/keepAlive`,
            config: {
                description: 'Keeps the session active',
                notes      : [ 'Place holder waiting for authorization_code support'
                            ],
                auth   : false,
                handler: keepAlive
            }
            
        }
    
        ];

    if (hasAppEnv == null){
       defaultTable.push({
        method: [ 'GET' ],
        path  : '/appenv',
        config: {
            description: 'Returns APPENV and LOGONPAYLOAD',
            notes      : [ 'Returns application specific information'
                            ],
            tags: [ 'api', 'Configuration' ],
            
            auth   : false,
            handler: getAppEnv
        }
        });
    };

    // Tried payload.parse = false -- way too much code to handle payload
    if (process.env.PROXYSERVER === 'YES') {
        let handleOthers = [
            {
            method: [ 'PUT', 'POST', 'PATCH' ],
            path  : '/{params*}',
            config: {
                auth   : auth1,
                payload: {
                    maxBytes: maxBytes
                 },
                handler: handleProxy
                }
            }, {
            method: [ 'GET' ],
            path  : '/{params*}',
            config: {
                auth   : auth1,
                handler: handleProxy
            }
        }
        ];
        defaultTable = [ ...defaultTable, ...handleOthers ];
    } else {
        let handleOthers = {
            method: [ 'GET' ],
            path  : '/{param*}',
            config: {
                description: 'Return specified static asset',
                tags       : [ 'api', 'Assets' ], 


                auth   : false,
                handler: getApp2
            }
        };
        defaultTable = [ ...defaultTable, handleOthers ];
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
    
    console.log(JSON.stringify(userRouterTable, null, 4));
    server(userRouterTable, asset);

}

//
// get app server files - too small 
//

async function getIcon (req, h) {
    return h.file('favicon.ico');
}

async function getApp2 (req, h) {
    return h.file(`${req.params.param}`);
}

async function getShared (req, h) {
    return h.file(`shared/${req.params.param}`);
}


export default iService;

