/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */
let spawn = require('cross-spawn');
async function reactDev (req, h) {
    console.log('Spawning the dev server');
    spawn('yarn', ['start'], { stdio: 'inherit' });
    let h2 = '<h2>Viya Server: ' + process.env.VIYA_SERVER + '<h2>';
    return (
        h2 +
        '<h3>Your session is authenticated</h3>' +
        '<h3>Your application is starting in another tab </h3>' +
        '<h4> HMR is active</h4>'
    );
}
export default reactDev;