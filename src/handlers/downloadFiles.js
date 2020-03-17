/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

import { REPL_MODE_SLOPPY } from 'repl';

const fs = require('fs').promises;

async function downloadFiles (req, h) {
    let dir = (process.env.DATALOC != null) ? process.env.DATALOC : process.env.APPLOC;
	let loc = `${dir}/${req.params.param}`;
	console.log(loc);
    let d = await fs.readFile(loc, 'UTF8');

    let f = req.params.param.split('.');
    let fileExt = f[f.length - 1];
    let contentType = getContentType(fileExt);
    console.log(contentType);
    
    let response =
        h.response(d)
	     .encoding('binary')
            .header('content-type', contentType)
            .header('type', fileExt);
	return response;
}

function getContentType (fileExt) {
    let contentType = 'application/octet-stream';
    switch (fileExt) {
        case 'pdf':
            contentType = 'application/pdf';
            break;
        case 'ppt':
            contentType = 'application/vnd.ms-powerpoint';
            break;
        case 'pptx':
            contentType = 'application/vnd.openxmlformats-officedocument.preplyentationml.preplyentation';
            break;
        case 'xls':
            contentType = 'application/vnd.ms-excel';
            break;
        case 'xlsx':
            contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            break;
        case 'doc':
            contentType = 'application/msword';
            break;
        case 'docx':
            contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            break;
        case 'csv':
            contentType = 'application/octet-stream';
            break;
        case 'xml':
            contentType = 'application/xml';
            break;
    }
    return contentType;
}
export default downloadFiles;