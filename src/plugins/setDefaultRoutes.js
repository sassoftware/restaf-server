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

import {
  getApp,
  getApp2,
  appCallback,
  favicon,
  keepAlive,
  keepAlive2,
  logout,
  logon,
  setupUserRoutes,
  proxyMapUri,
} from "../handlers";
let debug = require("debug")("routes");
import setContext from "./setContext.js";
module.exports = function setDefaultRoutes(server, options) {
  debug("setDefaultRoutes");
  let appName = "/" + options.appName;

  let authDefault = {
    strategy: "session",
    mode: "try",
  };
  let authLogon = {
    strategy: "sas",
    mode: "required"
  };

  console.log("Auth Flow", options.authFlow);

  let getAppb = getApp.bind(
    null,
    options // process.env.USETOKEN === "YES" ? options : null
  );

  console.log("Default strategy", authDefault);
  console.log("Logon strategy", authLogon);
  options.authDefault = authDefault;
  options.authLogon = authLogon;

  debug(options.userRouteTable);
  let uTable =
    options.userRouteTable !== null
      ? setupUserRoutes(options.userRouteTable, options)
      : null;

  let defaultTable = [
    {
      method: ["GET"],
      path: `${appName}/logon`,
      options: {

        auth: (options.authFlow === "server") ?
          { mode: "try", strategy: "sas" } : null,
        //https://futurestud.io/tutorials/hapi-redirect-to-previous-page-after-login
        // set auth to null on all protected routes
        plugins: {
          "hapi-auth-cookie": { redirectTo: false },
        },
        handler: async (req, h) => {
          debug('logonhandler', req.auth.credentials);
          console.log('In logon handler', options.authFlow);
          return await logon(req, h, options);
        }
      },
    },
    {
      method: ["GET"],
      path: `${appName}`,

      options: {
        // auth: (process.env.USELOGON === 'YES') ? null : options.serverMode === "app" ? authLogon : authDefault,
        auth: authLogon,
        handler: getAppb,
      },
    },

    {
      method: ["GET"],
      path: `${appName}/callback`,
      options: {
        auth: authDefault,
        handler: appCallback,
      },
    },
    {
      method: ["GET"],
      path: `${appName}/logout`,
      options: {
        auth: authDefault,
        handler: logout,
      },
    },
    {
      method: ["GET", "POST"],
      path: `${appName}/keepAlive`,

      options: {
        auth: authDefault,
        handler: keepAlive,
      },
    },
    {
      method: ["GET"],
      path: `${appName}/appenv`,
      options: {
        auth: authDefault,
        handler: async (req, h) => { 
          let allAppEnv = options.allAppEnv;
          allAppEnv.credentials = options.credentials;

          let s =
            `let LOGONPAYLOAD = ${JSON.stringify(allAppEnv.LOGONPAYLOAD)};` +
            `let APPENV = ${JSON.stringify(allAppEnv.APPENV)};`;
          if (process.env.SHOWENV != null) {
            console.log(s);
          }
          debug(s);
          return s;
        },
      },
    },
    {
      method: ["GET"],
      path: `/appenv`,
      options: {
        auth: authDefault,
        handler: async (req, h) => {
          let allAppEnv = options.allAppEnv;
          allAppEnv.credentials = options.credentials;

          let s =
            `let LOGONPAYLOAD = ${JSON.stringify(allAppEnv.LOGONPAYLOAD)};` +
            `let APPENV = ${JSON.stringify(allAppEnv.APPENV)};`;
          if (process.env.SHOWENV != null) {
            debug(options.allAppEnv);

          }
        
          return s;
        },
      },
    },

    {
      method: ["GET"],
      path: `/assets/{param*}`,
      options: {
        auth: authDefault,
        handler: getApp2,
      },
    },
    {
      method: ["GET"],
      path: `/favicon.ico`,
      options: {
        auth: false,
        handler: favicon,
      },
    },
    {
      method: ["GET", "POST"],
      path: `${appName}/keepAlive2`,
      options: {
        auth: authDefault,
        handler: keepAlive2,
      },
    },
  ];

  let pr = {
    method: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    path: `${appName}/proxy/{param*}`,

    options: {
      auth: authDefault,
      handler: {
        proxy: {
          mapUri: proxyMapUri,
          xforward: true,
          passThrough: true,
        },
      },
    },
  };
  debug(pr);
  defaultTable.push(pr);

  let routeTables0= uTable !== null ? defaultTable.concat(uTable) : defaultTable;
  let routeTables = setupUserRoutes(routeTables0, options);

  server.route(routeTables);
};
