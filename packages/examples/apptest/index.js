/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
const rafServer = require("@sassoftware/viya-appserverjs");
debugger;
rafServer.icli(getCustomHandler, true, customize);
function customize(key, _options) {
  debugger;
  let info = {
    SWAGGEROPTIONS: {},
    APPENV: null,
  };
  return info[key];
}
function getCustomHandler() {
  let appName = `/${process.env.APPNAME}`; /* does not have to be this - your choice */
  let routes = [
    {
      method: ["GET"],
      path: `${appName}/app`,
      options: {
        handler: async (req, h) => {
          debugger;
          console.log("++++++++++++++++++++++ entering app");
          let context = req.pre.context;
          let hh = `<h1>` + ` Hello World ${process.env.APPNAME}` + `</h1>`;
          return hh;
        },
        auth: false,
        description: "Test get Route",
        notes: "Echo context",
        tags: ["app"],
      },
    },
    {
      method: ["GET"],
      path: `${appName}/design`,
      options: {
        handler: async (req, h) => {
          debugger;
          console.log("++++++++++++++++++++++ entering design");
          let indexHTML = 'design.html';
          console.log(`Design html is ${indexHTML}`);
          return h.file(indexHTML);
        },
        auth: false,
        description: "Design Route",
        notes: "Default Design Route",
        tags: ["app"],
      },
    },
    {
      method: ["POST"],
      path: `${appName}/testpost`,
      options: {
        handler: async (req, h) => {
          debugger;
          console.log("++++++++++++++++++++++ in post");
          let context = req.pre.context;
          return context;
        },
        auth: false,
        description:
          "Create a dataset with specified nummber of columns and rows",
        notes: "Uses restaf",
        tags: ["api"],
      },
    },
  ];
  return routes;
}
function customize(key, options) {
  let info = {
    swaggerOptions: {
      info: {
        title: "Test API",
        version: "0.0.1",
        description: "This document was auto-generated at run time",
      },
      documentationPage: true,
      documentationPath: `/${process.env.APPNAME}/documentation`,
      swaggerUI: true,
      swaggerUIPath: `/${process.env.APPNAME}/swaggerui`,
      schemes: ["https", "http"],
      cors: true,
      auth: options.authDefault,
    },
    APPENV: {
      x: 1,
      y: 2,
    },
  };
  let r = info[key];
  return r == null ? {} : r;
}
