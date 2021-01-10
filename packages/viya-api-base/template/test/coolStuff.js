/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
const setupTest = require('./setupTest');
module.exports = async function coolStuff () {
   let {store, token} = await setupTest();
   let payload = {
       method : 'POST',
       url    : 'http://localhost:8080/myapi/coolstuff',
       headers: {
          authorization: 'bearer ' + token
       },
       data: {
        input: {cols: 5}
        }
   };

   let r = await store.request(payload);
   console.log(r.data);
   return 'done';

};