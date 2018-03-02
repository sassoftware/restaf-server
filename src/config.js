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

let fs = require( 'fs' );

module.exports = function config ( appEnv ) {
    debugger;
    try {
        let data = fs.readFileSync( appEnv, 'utf8' );
        let d = data.split( /\r?\n/ );
        console.log( 'Configuration specified via raf.env' );
        d.forEach( l => {
            if ( l.length > 0 && l.indexOf( '#' ) === -1 ) {
                let la = l.split( '=' );
                if ( la.length > 0 ) {
                    if ( la[1] === '' ) {
                        delete process.env[la[1]]
                    } else {
                        process.env[la[0]] = la[1];
                    }
                    console.log( `${la[0]}=${la[1]}` )
                }
            }
        } );
        process.env.SAS_PROTOCOL = ( process.env.SAS_SSL_ENABLED === 'YES' ) ? 'https://' : 'http://';
    }
    catch ( err ) {
        console.log( err );
        process.exit( 0 );
    }
};