#!/usr/bin/env node
let sh = require('shelljs');
let argv = require('yargs').argv;

let app = argv._[0];
let appDir = `${process.cwd()}/${app}`;
console.log(appDir);

console.log(argv);
let rc = sh.rm('-rf', appDir);
rc = sh.mkdir(appDir);
if (rc != 0) {
	process.exit('unable to create directory');
}

/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

function installPackages (packages) {
	return new Promise((resolve) => {
		let x = `npm install ${packages}`;
		console.log(x);
		sh.exec(x, () => {
			console.log('\nFinished installing packages\n'.green);
			resolve();
		});
	});
}

async function run (appDirectory) {
	//sh.cp('-rf', 'package.json', 'package.json.bak');
	// sh.rm('-rf', 'package-lock.json');
    sh.cd(appDirectory);
    await installPackages('@sassoftware/viya-api-base');
	rc = sh.cp('-rf', './node_modules/@sassoftware/viya-api-base/template/*','.');
	rc = sh.cp('-rf', './node_modules/@sassoftware/viya-api-base/template.json', 'package.json');
    rc = sh.rm('-rf', './node_modules');
    rc = await installPackages(' ');
}

run(appDir)
	.then(() => 'done')
	.catch((err) => console.log(err));
