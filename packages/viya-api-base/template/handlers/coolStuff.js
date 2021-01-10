/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

let restaflib = require('@sassoftware/restaflib');
let setupConnection    = require('../lib/setupConnection');   
let fs = require('fs').promises;
module.exports = async function coolstuff (req,h) {
    return run(req,h) 
        .then (r => {return r;})
        .catch(err => {
            return err;/* need to add Boom support */
        });
};
async function run (req,h) {
    debugger;
    let { computeSetup, computeRun } = restaflib;
    let context = req.pre.context;
    let store = await setupConnection(context);
	let computeSession = await computeSetup(store, null, null);
    debugger;
    console.log(context.path);
    let f = context.path.split('/');

    let fname = `./pgm/${f[2]}.sas`;
    let src = await fs.readFile(fname, 'utf8');
    let computeSummary = await computeRun(
        store,
        computeSession,
        src,
        context.payload.input,
        15,2  /* just a place holder values for checking job status */
    );
    debugger;
    let log = await restaflib.computeResults(store, computeSummary, 'log');
    await store.apiCall(computeSession.links('delete'));
    // just return log for the example
    return log;

};
