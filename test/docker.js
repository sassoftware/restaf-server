let parserDocker = require('../')
let fs = require('fs');

let d = fs.readFileSync('./Dockerfile', 'utf8');

let data = parser.parse(d);
console.log(JSON.stringify(data, null, 4));

data.forEach(d => {
	if (d.name === 'ENV') {
		for (const key in d.args) {
			const v = d.args[key];
			if (v.length === 0) {
				console.log(
					`Value for ${key} inherited as ${process.env[key]}`
				);
			} else {
				console.log(`${key} = ${v}`);
			}
		}
	}
});
export default 
