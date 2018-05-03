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
// proxy server

let  Hapi  = require('hapi'),
    inert  = require('inert'),
    hapiServer;
import SASauth from './SASauth';


module.exports = function (userRouterTable, asset, rootHandler) {
 
    process.env.APPHOST_ADDR = process.env.APPHOST;
    

    let sConfig = {
        port    : process.env.APPPORT,
        host    : process.env.APPHOST_ADDR,
        
        routes: {
            cors: {
                origin     : [ '*' ],
                credentials: true,

                additionalHeaders       : [ 'accept' ],
                additionalExposedHeaders: [ 'location' ]
            }
        }
    };

    if (asset !== null) {
        console.log(asset);
        sConfig.routes.files = {relativeTo: asset};
    }


    hapiServer = Hapi.server(sConfig);

    if (process.env.OAUTH2 !== 'YES') {
        let info = SASauth(hapiServer);
    }

    const init = async () => {
        await hapiServer.register(inert);
        await SASauth(hapiServer);
        hapiServer.route(userRouterTable);

        hapiServer.app.cache = hapiServer.cache(
            {
                segment  : 'session',
                expiresIn: 14 * 24 * 60 * 60 * 1000
            });

        await hapiServer.start();
        console.log('--------------------------------------------');
        console.log(JSON.stringify(sConfig, null, 4));
        console.log('--------------------------------------------');
        console.log(` server started at: ${(hapiServer.info.uri)}/${process.env.APPNAME}`);
    }

    process.on('unhandledRejection', (err) => {

        console.log(err);
        process.exit(1);
    });

    init()
    
}