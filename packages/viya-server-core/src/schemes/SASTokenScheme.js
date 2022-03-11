/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */
// lean code to handle of incoming tokens if present
// designed to used with appCookie and SASauth

const Boom = require('@hapi/boom');

module.exports = function SASTokenScheme (server, options) {
 
    const scheme = {
        authenticate: async function (request, h) {
            const authorization = request.headers.authorization;
            server.log('SASToken', authorization);
        
            if (!authorization) {
               throw Boom.unauthorized(null, 'session');
            }
            const [tokenType, token] = authorization.split(' ');
            let credentials = {
                token    : token,
                tokenType: tokenType
            };
            return h.authenticated({credentials: credentials});
        }
    };

    return scheme;
};
