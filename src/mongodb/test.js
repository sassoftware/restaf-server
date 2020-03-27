/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

let mongoP = require('./index');
let { createClient } = mongoP;

runtest()
    .then(r => console.log(r))
    .catch(e => console.log(e));


async function runtest () {

    let client = await createClient('localhost', 27017);
    console.log('...');
    console.log(client);
    // const col = client.db('cache').collection('scores');
    // console.log(col);
    client.close();
    return 'done';
}