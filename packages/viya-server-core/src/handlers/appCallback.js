/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";

import codeAuth from "./codeAuth";

// handle all callback
let debug = require("debug")("callback");
debugger;
async function appCallback (req, h) {
  debug("in callback");
  console.log(`..... AUTHFLOW: ${process.env.AUTHFLOW}`);
  if (process.env.AUTHFLOW === "server") {
    return codeAuth(req, h);
  } else {
    let indexHTML =
      process.entry.REDIRECT_ENTRY != null
        ? process.entry.REDIRECT_ENTRY
        : process.env.APPENTRY == null
        ? "index.html"
        : process.env.APPENTRY;
    console.log(`Redirecting to default ${indexHTML}`);
    return h.file(`${indexHTML}`);
  }
}

export default appCallback;
