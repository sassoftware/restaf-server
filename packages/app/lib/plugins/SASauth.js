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
let bell = require('@hapi/bell'),
    // eslint-disable-next-line no-unused-vars
uuid = require('uuid');

let debug = require('debug')('SASauth');

exports.plugin = {
  name: 'SASauth',
  version: '1.0.0',
  register: iSASauth
};

async function iSASauth(hapiServer, options) {
  let bellAuthOptions, provider;

  if (process.env.AUTHFLOW == 'authorization_code' || process.env.AUTHFLOW === 'code') {
    let authURL = process.env.VIYA_SERVER;
    provider = {
      name: 'sas',
      protocol: 'oauth2',
      useParamsAuth: false,
      auth: authURL + '/SASLogon/oauth/authorize',
      token: authURL + '/SASLogon/oauth/token',
      profileMethod: 'get',
      profile: async function (credentials, params, get) {
        debug(credentials);
      }
    };
    bellAuthOptions = {
      provider: provider,
      password: uuid.v4(),
      clientId: process.env.CLIENTID.trim(),
      clientSecret: process.env.CLIENTSECRET == null ? ' ' : process.env.CLIENTSECRET,
      isSecure: options.isSecure,
      location: () => {
        debug(`Redirect set to: ${process.env.REDIRECT}`);
        return process.env.REDIRECT == null ? '' : process.env.REDIRECT;
      }
    };
    debug(bellAuthOptions);
    await hapiServer.register(bell);
    hapiServer.auth.strategy('sas', 'bell', bellAuthOptions);
  }
}