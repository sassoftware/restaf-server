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

var Hapi = require('hapi'),
    inert = require('inert'),
    SASauth = require('./SASauth.js'),
    hapiServer = new Hapi.Server();

module.exports = function (userRouterTable, asset, rootHandler) {
    debugger;

    process.env.APPHOST_ADDR = process.env.APPHOST;
    startServer(userRouterTable, asset);

    function startServer(userRouterTable, asset) {
        let sConfig = {
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

        hapiServer.register(inert, () => {
        });

        if (process.env.OAUTH2 !== 'YES') {
            console.log('setting route');
            hapiServer.route(userRouterTable);
            hapiServer.start(err => {
                if (err) {
                    throw err;
                }
                console.log('Server started at: ' + hapiServer.info.uri + '/' + process.env.APPNAME);
            });
        } else {
            SASauth(hapiServer, (err) => {
                if (err) {
                    console.log(err);
                    process.exit(1);
                } else {
                    hapiServer.route(userRouterTable);
                    //noinspection JSUnusedLocalSymbols
                    hapiServer.on('request-error', (request, err) => {
                        console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' +
                            request.url.path + ' --> ' + request.response.statusCode);
                    });
                    hapiServer.ext('onPreResponse', (request, reply) => {
                        const response = request.response;
                        if (!response.isBoom) {
                            return reply.continue();
                        }

                        // log 400 and above
                        //noinspection JSUnresolvedVariable
                        if (response.output.statusCode >= 400 &&
                            response.output.statusCode < 500) {

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
                    hapiServer.start(err => {
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


