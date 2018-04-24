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

var request = require('request').defaults({
    jar: true
}),
    bell = require('bell'),
    debug = require('debug')('auth'),
    qs = require('qs'),
    uuid = require('uuid'),
    authCookie = require('hapi-auth-cookie');

module.exports = function (hapiServer, cb) {
    var authCookieOptions,
        bellAuthOptions,
        provider;

    // TBD: need to add other options like keepalive after initial testing
    authCookieOptions = {
        password: uuid.v4(),
        cookie: 'session',
        domain: process.env.APPHOST,
        isSecure: false

    };

    let authURL = process.env.SAS_PROTOCOL + process.env.VIYA_SERVER;
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
        clientSecret: (process.env.CLIENTSECRET == null) ? ' ' : process.env.CLIENTSECRET,
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