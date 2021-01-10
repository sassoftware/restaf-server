#!/usr/bin/env node
let sh = require('shelljs');
let argv = require('yargs').argv;
let fs = require('fs').promises;
let jsonFormat = require('json-format');

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

function execcmd (cmd) {
	return new Promise((resolve) => {
		sh.exec(cmd, () => {
			resolve();
		});
	});
}

async function run (appDirectory) {

	sh.cd(appDirectory);
	// init 
	let rc = await execcmd('npm init -y');

	// install base and copy code over from node_modules
    rc = await execcmd('npm install @sassoftware/viya-api-base');
	rc = sh.cp('-rf', './node_modules/@sassoftware/viya-api-base/template/*', '.');

	// update package.json with the template.json
	let templatejs = await fs.readFile('./node_modules/@sassoftware/viya-api-base/template.json', 'utf8');
	let tjs = JSON.parse(templatejs);
	let packagejs = await fs.readFile('./package.json', 'utf8');
	let pjs = JSON.parse(packagejs);
	let pjson = { ...pjs, ...tjs };
	await fs.writeFile('package.json', jsonFormat(pjson), 'utf8');  
	console.log(pjson);
	sh.mv('env', '.env');
	sh.mv('gitignore', '.gitignore');
	sh.mv('eslintignore', '.eslintignore');
	sh.mv('eslintrc.json', '.eslintrc.json');
	// rename the . files
	
    rc = sh.rm('-rf', './node_modules');
    rc = await execcmd('npm install');
}

run(appDir)
	.then(() => 'done')
	.catch((err) => console.log(err));
