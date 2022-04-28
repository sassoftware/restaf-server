#!/usr/bin/env node

/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

let sh = require('shelljs');
let argv = require('yargs').argv;
let fs = require('fs').promises;
let jsonFormat = require('json-format');

let app = argv._[ 0 ];
let version = 'latest';
if (argv.use != null) {
	version = argv.use;
}
let appDir = `${process.cwd()}/${app}`;

let rc = sh.rm('-rf', appDir);
rc = sh.mkdir(appDir);
if (rc != 0) {
	process.exit('unable to create directory');
}
console.log(`${appDir} has been created`);
console.log(`viya-api-base version: ${version}`);

function execcmd (cmd) {
	return new Promise((resolve) => {
		sh.exec(cmd, () => {
			resolve();
		});
	});
}

async function run (appDirectory, version) {

	sh.cd(appDirectory);
	// init 
	await execcmd('npm init -y');

	// install base and copy code over from node_modules
	let base = `npm install @sassoftware/viya-api-base@${version}`;
	console.log(`Installing @sassoftware/viya-api-base@${version}`);
    await execcmd(base);
	sh.cp('-rf', './node_modules/@sassoftware/viya-api-base/template/*', '.');

	// update package.json with the template.json
	let templatejs = await fs.readFile('./node_modules/@sassoftware/viya-api-base/template.json', 'utf8');
	let tjs = JSON.parse(templatejs);
	let packagejs = await fs.readFile('./package.json', 'utf8');
	let pjs = JSON.parse(packagejs);
	let pjson = { ...pjs, ...tjs };
	await fs.writeFile('package.json', jsonFormat(pjson), 'utf8');  
	sh.mv('env', '.env');
	sh.mv('gitignore', '.gitignore');
	sh.mv('eslintignore', '.eslintignore');
	sh.mv('eslintrc.json', '.eslintrc.json');
	// rename the . files
	
    sh.rm('-rf', './node_modules');
	await execcmd('npm install');
	await execcmd('npm run lint');
}

run(appDir,version)
	.then(() => {
		console.log('Please visit https://github.com/sassoftware/viya-servers/wiki/viya-apiserverjs for documentation');
	})
	.catch((err) => console.log(err));
