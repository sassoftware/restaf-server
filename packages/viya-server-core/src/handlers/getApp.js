/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import codeAuth from './codeAuth';

let debug = require('debug')('getapp');

async function getApp (options, req, h) {
    if (process.env.AUTHFLOW === 'implicit') {
        let x = `${process.env.VIYA_SERVER}/SASLogon/oauth/authorize?response_type=token&client_id=${process.env.CLIENTID}`;
        let redirect = `${process.env.APPNAME}/callback`;
        let redirectUri;
        if (process.env.REDIRECT != null) {
            redirect = process.env.REDIRECT.trim();
            if (redirect.indexOf('http') === -1) {
                redirect = `${process.env.APPNAME}/${redirect}`;
                let protocol = process.env.HTTPS === 'true' ? 'https://' : 'http://';
                redirectUri = `${protocol}${process.env.APPHOST}:${process.env.APPPORT}/${redirect}?host=${process.env.VIYA_SERVER}`;
            } else {
                redirectUri = `${redirect}?host=${process.env.VIYA_SERVER}`;
            }
        }
        debug(process.env.REDIRECT);
        let url = `${x}&redirect_uri=${redirectUri}`;
        debug(url);
        return h.redirect(url);
    } else if (process.env.AUTHFLOW === 'server') {
        return codeAuth(req, h, options);

    } else {
        debug('default getapp');
        let indexHTML = process.env.APPENTRY == null ? 'index.html' : process.env.APPENTRY;
        console.log(`Redirecting to default ${indexHTML}`);
        return h.file(indexHTML);
    }
	
}
export default getApp;
