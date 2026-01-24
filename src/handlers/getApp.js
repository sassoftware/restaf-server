/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import codeAuth from './codeAuth';

let debug = require('debug')('getapp');

async function getApp (options, req, h) {
    debug('In getApp handler', options);
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
        
        debug('calling codeauth');
        let r = codeAuth(req, h, options);
        return r;

    } else {
        debug('default processing in  getapp');
        debug('Processing non authenticated use case');
      
        let indexHTML = process.env.APPENTRY == null ? 'index.html' : process.env.APPENTRY;
        if (process.env.REDIRECT != null) {
            indexHTML = process.env.REDIRECT;
        }
       debug('redirecting to ', indexHTML);
        if (indexHTML.startsWith('/')) {
            indexHTML = `/${process.env.APPNAME}${indexHTML}`;
            return h.redirect(indexHTML);
        } else {
            return h.file(indexHTML);
        }
        
    }
	
}
export default getApp;
