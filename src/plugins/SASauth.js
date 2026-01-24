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

let uuid = require('uuid');
let debug = require('debug')('sasauth');

async function SASauth(server, options) {
  debug('in iSASauth');
  debug('options', options);
  let bellAuthOptions;
  let provider;
  // test for k8s deployment
  let host = options.host + '/SASLogon';


  if (options.ns != null) {
    host = `https://sas-logon-app.${options.ns}.svc.cluster.local`;
  } else if (options.nsHost != null) {
    host = options.nsHost;
  }
  // ...
  debug(host);
  provider = {
    name: 'sas',
    protocol: 'oauth2',
    useParamsAuth: false,
    auth: host + '/oauth/authorize',
    token: host + '/oauth/token',

    profileMethod: 'get',

    profile: async function (credentials, params, get) {
      server.log('SASAuth profile', credentials);
      debug('credentials', credentials);
    }


  };

  bellAuthOptions = {
    provider: provider,
    password: uuid.v4(),
    clientId: options.clientId,
    clientSecret: options.clientSecret,
    //   isSameSite  : options.isSameSite,
    isSecure: options.isSecure
  };

  debug('belloptions', bellAuthOptions);

  server.auth.strategy('sas', 'bell', bellAuthOptions);

}
export default SASauth;