/*
 * Copyright © 2025, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
let core = require('./lib/index.js');
debugger;
let userCache = {};
core(getCustomHandler, true, 'app', null, userCache);
console.log('Finished cli setup', userCache);

function getCustomHandler() {
	let appName = `/${process.env.APPNAME}`; /* does not have to be this - your choice */
	debugger;
	let routes = [
		{
			method: ["GET"],
			path: "/help",
			options: {
				files: {
					relativeTo: "./public",
				},
				handler: async (req, h) => {
					debugger;
					let hf = 'help.html';
					return h.file(hf);
				},
				auth: false,
				description: "Help",
				notes: "Help",
				tags: ["app"],
			},
		},
		{
			method: ["GET"],
			path: `/new`,
			options: {
				files: {
					relativeTo: "./public",
				},
				handler: async (req, h) => {
					debugger;
					console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>in new');
					console.log({userCache});
					console.log(req.pre.context);
					return h.file('index.html');	
				},
				description: "Create new application",
				notes: "Index file created from env data",
				tags: ["app"],
			},
		}
	];
	return routes;
}
function customize(key, options) {
	let info = {
		swaggerOptions: {
			info: {
				title: "Test API",
				version: "0.0.1",
				description: "This document was auto-generated at run time",
			},
			documentationPage: true,
			documentationPath: `/${process.env.APPNAME}/documentation`,
			swaggerUI: true,
			swaggerUIPath: `/${process.env.APPNAME}/swaggerui`,
			schemes: ["https", "http"],
			cors: true,
			auth: options.authDefault,
		},
		APPENV: {
			x: 1,
			y: 2,
		},
	};
	let r = info[key];
	return r == null ? {} : r;
}

function getIndex() {

	let template = `
  <html lang="en">
	<head>
		<meta charset="UTF-8" />

		<script
			crossorigin
			src="https://unpkg.com/react@16/umd/react.production.min.js"
		></script>
		<script
			crossorigin
			src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"
		></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.26.0/polyfill.min.js"></script>
		<script src="https://unpkg.com/@sassoftware/restaf@5.2.4/dist/restaf.js"></script>
		<script src="https://unpkg.com/@sassoftware/restaflib@5.2.4/dist/restaflib.js"></script>
		
		<style>
			.container {
				display: flex;
				flex-direction: column;
				flex-wrap: nowrap;
				min-height: 800px;
			}
			.elabel {
				display: inline-block;

				clear: left;
				width: 250px;
				text-align: right;
			}
			.einput {
				display: inline-block;
			}
			.div1 {
				border: 1px solid black;
				background: lightskyblue;
			}
			.div2 {
				border: 1px solid black;
				background: lightskyblue;
				height: 200px;
			}
		</style>

	  <script>
    let LOGONPAYLOAD = {
      host: "${process.env.VIYA_SERVER}",
      authType: "server",
      appName: "${process.env.APPNAME}",
      };
    </script>

		<script>
			debugger;
			let store = restaf.initStore({
				casProxy: true});
			debugger;	console.log(store.config);

			let session = null;
			let servers = null;
			let services = null;
			let files = null;
			let reports = null;
			let compute = null;

			function setup() {
				debugger;
				document.getElementById('output').innerHTML = '...initializing';
				
				initSession()
					.then(r => {
						document.getElementById('output').innerHTML = 'ready';
						keepAlive();
					})
					.catch(e => {
						
						console.log(e);
					});
			}
			

			async function initSession() {
			
				console.log(LOGONPAYLOAD);
				debugger;
				let msg = await store.logon(LOGONPAYLOAD);
				console.log(msg);

			//	let { identities } = await store.addServices('identities');
				let name = 'user';
			//	if (identities.links('currentUser') !=  null) {
			//		let c = await store.apiCall(identities.links('currentUser'));
			//		name = c.items('id');
			//	}
				console.log(name);
				debugger;
				/*
				services = await store.addServices(
					'files', 'compute', 'casManagement'
				);
				console.log(services.casManagement.links().toJS())
				*/
				debugger;
				return 'done';
			}
			function runit(type) {
				
				
				document.getElementById('output').innerHTML = '...running';
				let testcase;
				switch (type) {
					case 'files': {
						testcase = SASfileService;
						break;
					}
					case 'compute': {
						testcase = dsCompute;
						break;
					}
					case 'cas': {
						testcase = runCas;
						break;
					}

					case 'spre': {
						testcase= spre;
						
						break;
					}
					default: {
						testcase = SASfileService;
						break;
					}
				}

				testcase(store)
					.then(r => {
						document.getElementById(
							'output'
						).innerHTML = JSON.stringify(r, null, 4);
					})
					.catch(err => {
						
						document.getElementById(
							'output'
						).innerHTML = JSON.stringify(err, null, 4);
					});
			}
			async function noaction() {
				r = {msg: 'redirects completed'};
				return r;
			}
			async function spre(store) {
				let p = {
					method: 'GET',
					url   : 'http://localhost:3000/api/test',
					withCredentials: true
				}
				let r = await store.request(p);
				return r.data;
			}
			async function runCas(store) {
				
				let {casManagement} = await store.addServices('casManagement');
				let servers = await store.apiCall(
					casManagement.links('servers')
				);
				let serverName = servers.itemsList(0);
				let session = await store.apiCall(
					servers.itemsCmd(serverName, 'createSession')
				);
				let payload = {
					action: 'builtins.echo',
					data: { code: { x: 1 } }
				};
				console.log(JSON.stringify(session.links("execute"), null, 4));
				let r = await store.runAction(session, payload);
				console.log('echo completed');
				await store.apiCall(session.links('delete'));
				return r.items();
			}

			async function SASfileService(store) {
				debugger;
				let content;
				try {
					debugger;
				let {files} = await store.addServices('files');
				debugger;
				console.log(JSON.stringify(files.links(), null, 4));
				//console.log('items - should be an array of files(empty array is ok)')
			//	console.log(files.items().toJS());
				let payload = {
					data: { x: 1, y: 'This was saved earlier in the step' },
					headers: { 'content-type': 'application/json' }
				};
				let createCmd = files.links('create');
				let newFile = await store.apiCall(createCmd, payload);
				debugger;
				console.log(JSON.stringify(newFile.links('content'), null, 4));
				content = await store.apiCall(newFile.links('content'));
				
			} catch(err) {
				console.log(JSON.stringify(err, null, 4));
				debugger;
			}
				console.log(content);
				return content.items();
			}
			async function dsCompute(store) {
				let log = null;
				debugger;
				let {compute} = await store.addServices('compute');
				let servers = await store.apiCall(compute.links('servers'));

				let contexts = await store.apiCall(compute.links('contexts'));

				// lookup the name of the first context and then use it to get the associated createSession restafLink
				let createSession = contexts.itemsCmd(
					contexts.itemsList(0),
					'createSession'
				);
				let session = await store.apiCall(createSession);

				// Now run a simple data step in that session
				let payload = {
					data: {
						code: ["data _null_; do i = 1 to 100; x=1; end; run; "]
					}
				};

				// Now execute the data step and wait for completion
				let job = await store.apiCall(
					session.links('execute'),
					payload
				);
				let status = await store.jobState(job, null, 5, 2);

				if (status.data === 'running') {
					throw "ERROR: Job did not complete in allotted time";
				} else {
					switch (status.data) {
						case 'warning':
							console.log("Warning: check your log for warnings");
							break;
						case 'error':
							throw "Please correct errors and rerun program";
						default:
							log = await store.apiCall(status.job.links('log'));
							break;
					}
				}
				return log === null ? status : log.items();
			}
		</script>
	</head>
	<body onload="setup()">
		<h1 id="head">Hi</h1>
		<div>

			<button onclick="runit('files')">
				Press to make a call to file service
			</button>
			<br />
			<br />
			<button onclick="runit('compute')">
				Press to make a call compute service
			</button>
			<br />
			<br />
			<button onclick="runit('cas')">
				Press to make a call to cas echo
			</button>
			<br />
			<br />
			
		<div>
			<pre id="output"></pre>
		</div>
	</body>
</html>
  `;
	return template;
}