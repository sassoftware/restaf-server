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
  reactDev,
  proxyMapUri,
} from "../handlers";
let debug = require("debug")("routes");
module.exports = function setDefaultRoutes(server, options) {
  debug("setDefaultRoutes");
  let appName = "/" + options.appName;
  let authDefault = false;
  let authLogon = false;
  if (options.authFlow === "server") {
    authDefault =
      options.serverMode === "app"
        ? false
        : {
            strategies: ["token", "session"],
            mode: "required",
          };

    authLogon = {
      mode: "required",
      strategy: "sas",
    };
  }
  let getAppb = getApp.bind(
    null,
    process.env.USETOKEN === "YES" ? options : null
  );

  console.log("Default strategy", authDefault);
  console.log("Logon strategy", authLogon);
  options.authDefault = authDefault;
  options.authLogon = authLogon;
  debugger;
  console.log(options.userRouteTable);
  let uTable =
    options.userRouteTable !== null
      ? setupUserRoutes(options.userRouteTable, options)
      : null;
  debugger;
  let defaultTable = [
    {
      method: ["GET"],
      path: `/health`,
      options: {
        auth: false,
        handler: async (req, h) => {
          return h.response({ x: 1 }).code(200);
        },
      },
    },
    {
      method: ["GET"],
      path: `${appName}/logon`,
      options: {
        auth: authLogon,
        //https://futurestud.io/tutorials/hapi-redirect-to-previous-page-after-login
        plugins: {
          "hapi-auth-cookie": { redirectTo: false },
        },
        handler: logon,
      },
    },
    {
      method: ["GET"],
      path: `${appName}/{param?}`,
      options: {
        auth: options.serverMode === "app" ? authLogon : authDefault,
        handler: async (req, h) => {
          console.log('++++++++++++++++++++++++', req.param);
          let r = await getAppb(req, h);
					return r;
        },
      },
    },

    {
      method: ["GET"],
      path: `${appName}/api`,
      options: {
        auth: authDefault,
        handler: async (req, h) => {
          return h.redirect(`${appName}/documentation`);
        },
      },
    },
    {
      method: ["GET"],
      path: `/develop`,
      options: {
        auth: false,
        cors: true,
        handler: reactDev,
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
        auth: /*authDefault*/ false,
        handler: (req, h) => {
          let allAppEnv = options.allAppEnv;
          if (options.userInfo != null) {
            let uappenv = options.userInfo("APPENV", options);
            if (uappenv != null) {
              allAppEnv.APPENV = { ...allAppEnv.APPENV, ...uappenv };
            }
          }
          allAppEnv.credentials = options.credentials;

          let s =
            `let LOGONPAYLOAD = ${JSON.stringify(allAppEnv.LOGONPAYLOAD)};` +
            `let APPENV = ${JSON.stringify(allAppEnv.APPENV)};`;
          if (process.env.SHOWENV != null) {
            console.log(options.allAppEnv);
            console.log(s);
          }
          return s;
        },
      },
    },
    {
      method: ["GET"] /* nedd this when running under dev mode in react apps */,
      path: `/appenv`,
      options: {
        auth: /*authDefault*/ false,
        handler: (req, h) => {
          let allAppEnv = options.allAppEnv;
          if (options.userInfo != null) {
            allAppEnv.APPENV = options.userInfo("APPENV", options);
          }

          let s =
            `let LOGONPAYLOAD = ${JSON.stringify(allAppEnv.LOGONPAYLOAD)};` +
            `let APPENV = ${JSON.stringify(allAppEnv.APPENV)};`;
          return s;
        },
      },
    },
		/*
    {
      method: ["GET"],
      path: `${appName}/{param*}`,

      options: {
        auth: authDefault,
        handler: getApp2,
      },
    },
		*/
    {
      method: ["GET"],
      path: `/{param*}`,

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

  if (process.env.PROXYSERVER != null) {
    let pr = {
      method: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      path: `${appName}/proxy/{param*}`,
      //	vhost  : [process.env.PROXYSERVER],
      options: {
        handler: {
          proxy: {
            mapUri: proxyMapUri,
            //uri: process.env.PROXYSERVER + '/' + '{param}',

            xforward: true,
            passThrough: true,
          },
        },
      },
    };
    console.log(pr);
    defaultTable.push(pr);
  }
  /*
  if (uTable !== null) {
		for (let i = 0 ; i < uTable.length; i++) {
			let p = uTable[i];
			if (p.options.auth !== false) {
				p.options.auth = authDefault;	
			} 
		}
	}
	*/
  console.log(uTable);
  let routeTables =
    uTable !== null ? defaultTable.concat(uTable) : defaultTable;
  /*
	server.log('routes', routeTables);
	console.table(routeTables);
	*/
  server.route(routeTables);
};
