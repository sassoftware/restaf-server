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


async function setContext (req,h){
   let credentials = req.auth.credentials;
   
   let context = {
        path   : req.path,
        params : req.params,
        query  : req.query,
        payload: req.payload,
        token  : (credentials != null) ? `bearer ${credentials.token}` : null,
        host   : process.env.VIYA_SERVER
        };
    return context;
}
export default setContext;