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
import setContext from './setContext';

function setupUserRoutes (u, options) {
    if (u == null) {
        return [];
    }
    debugger;
    let ux = (typeof u === 'function') ? u() : u;
    let routes = ux.map(r => {
        let rx = {...r};
        /* change it to options */
        if (rx.config != null) {
            rx.options = {...rx.config};
            delete rx.config;
        }
        rx.options.pre = [
            {method: setContext, assign: 'context'}
        ];
     
        if (rx.options.auth === true) {
            rx.options.auth = options.authDefault;   
        } else if (rx.options.auth === 'logon') {
            rx.options.auth = options.authLogon;
        } 
       
        return rx;
    });
    return routes;
}
export default setupUserRoutes;