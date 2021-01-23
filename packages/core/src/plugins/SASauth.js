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


let bell = require('@hapi/bell');
let uuid = require('uuid');   
let debug = require('debug')('SASauth');

exports.plugin = {
    name    : 'SASauth',
    version : '1.0.0',
    register: iSASauth
};

async function iSASauth (server, options) {

    let bellAuthOptions,
        provider;

        provider = {
			name         : 'sas',
			protocol     : 'oauth2',
			useParamsAuth: false,
			auth         : options.host + '/SASLogon/oauth/authorize',
            token        : options.host + '/SASLogon/oauth/token',

            profileMethod: 'get',
            
            profile: async function (credentials, params, get) {           
                debug(credentials);
            }
        };
        
        bellAuthOptions = {
            provider    : provider,
            password    : uuid.v4(),
            clientId    : options.clientId,
            clientSecret: options.clientSecret,  
            isSecure    : options.isSecure,
            location    : () => { 
                debugger;
                debug(`Redirect set to: ${options.redirect}`);
                
                return (options.redirect == null) ? '' : options.redirect;
            }
        
        };
        await server.register(bell);
        server.auth.strategy('sas', 'bell', bellAuthOptions);
        
    }