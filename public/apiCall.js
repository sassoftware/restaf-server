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
'use strict';

import iapiCall from './iapiCall';
import ikeepAlive from './ikeepAlive';
import selectLogonInfo from './selectLogonInfo';

import { API_CALL } from '../actionTypes';

const  apiCall =  (store, iroute, payload, delay) => {
    /*
    let logonInfo = selectLogonInfo(store.getState());
    if (logonInfo.keepAlive != null) {
        debugger;
        ikeepAlive(store, logonInfo);
    }
    */
    debugger;
    return iapiCall(store, iroute, API_CALL, payload, delay , null);
};

export default apiCall;