/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

async function logon (req, h) {
    ;
    if (process.env.AUTHFLOW === 'implicit' && process.env.REDIRECT == null){
       let html = logonHTML();
       return html;
    } else {
        let indexHTML = (process.env.APPENTRY == null) ? 'index.html' : process.env.APPENTRY;
        console.log(`Redirecting to default ${indexHTML}`);
        return h.file(indexHTML);
    }

function logonHTML () {
    let html = `
        <!DOCTYPE html>

            <html lang="en">
            <!--
            * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
            * SPDX-License-Identifier: Apache-2.0
            -->
                <head>
                    <meta charset="UTF-8">
                    <script src="https://unpkg.com/restaf@dev/dist/restaf.min.js"></script>
                    <script type="text/javascript" src="/appenv"></script>
                    
                    <script>
                        function logonButton() {
                            ;
                            let store = restaf.initStore();
                            store.logon(LOGONPAYLOAD)
                            .then ( r => {
                                console.log(r);
                            })
                            .catch( err => alert(JSON.stringify(err, null, 4)))
                        }
                    
                    </script>
                    
                </head>

                <body onload="logonButton()">
                
                    </script>
                </body>

            </html>
        `;
        return html;
    }
}

export default logon;