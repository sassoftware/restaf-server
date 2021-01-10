#!/usr/bin/env node --no-warnings
/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

const restaf = require('@sassoftware/restaf');
const restaflib = require('@sassoftware/restaflib');
const vorpal = require('vorpal')();
const fs = require('fs');
const config = require('./lib/config2');

let payload = config();
console.log(payload);
// setup handling of https

let pemFile = process.env.SSL_CERT_FILE;
console.log(`pemfile = ${pemFile}`);
let pem = pemFile != null ? fs.readFileSync(pemFile, 'utf8') : null;
let rejectUnauth = process.NODE_TLS_REJECT_UNAUTHORIZED != null ? process.NODE_TLS_REJECT_UNAUTHORIZED : 0;
let initOpts = { pem: pem, rejectUnauthorized: rejectUnauth };

vorpal.log(initOpts);

let store = restaf.initStore(initOpts);

runCli(store);

function runCli(store) {
	vorpal
		.command('logon')
		.description('Logon to Viya')
		.action((args, cb) => {
			vorpal.activeCommand.prompt(
				{
					type: 'input',
					name: 'user',
					message: 'Enter your userid> ',
				},
				(result) => {
					payload.user = result.user;
					vorpal.activeCommand.prompt(
						{
							type: 'password',
							name: 'password',
							message: 'Enter your password> ',
						},
						(result) => {
							payload.password = result.password;
							logon(store, payload, vorpal)
								.then((r) => {
									vorpal.log('Logon Successful');
									let token = store.connection().token;
									let jwt = restaflib.decodeJwt(token);
									console.log(jwt);
									fs.writeFileSync(process.env.SAVETOKEN, token, 'UTf8');
									console.log(`Token saved to ${process.env.SAVETOKEN}`);
									cb();
								})
								.catch((err) => {
									vorpal.log(err);
									cb();
								});
						}
					);
				}
			);
		});

	vorpal
		.delimiter('>> ')
		.log('--------------------------------------')
		.log('.......................................')
		.log('Utility to create a token')
		.log('Enter help to get a list of all the commands')
		.log('Use logon command to start your SAS Viya session')
		.log(initOpts)
		.log('');

	vorpal.show();
}
async function logon(store, logonPayload, vorpal) {
	if (logonPayload !== null) {
		if (store.connection() !== null) {
			await store.logoff();
		}
	}

	await store.logon(logonPayload);
	await store.addServices('SASLogon');
	return 'done';
}
