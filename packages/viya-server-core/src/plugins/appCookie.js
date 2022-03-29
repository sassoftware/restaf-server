
let uuid = require('uuid');

module.exports = async function appCookie (server, options){

    await server.register(require('@hapi/cookie'));

    let cookieOptions = {
        cookie: {
            name      : 'cookie',
            password  : uuid.v4(),
            isSecure  : options.isSecure,
            isSameSite: options.isSameSite
        },
        redirectTo  : options.redirectTo,
        appendNext  : {name: 'next'},
        validateFunc: async (req, session) => {
            server.log('Cookie validateFunc', `path - ${req.path}`);
            if (session == null) {
                console.log('session is null');
                return {valid: false};
            }
            let credentials = null;
            let sid;
            if (Array.isArray(session) === true && session.length > 0) {
                sid = session[0].sid;
            } else {
                sid = session.sid;
            }
            if (sid != null) {
                credentials = await req.server.app.cache.get(sid);
             }
             
            if (credentials == null) {
                return {valid: false};
            }
            server.log('Cookie validateFunc', sid);
            return {valid: true, credentials: credentials};
        }
    };
    // console.log('cookie options', cookieOptions);
    server.log('Cookie Options',cookieOptions);
    server.auth.strategy('session', 'cookie', cookieOptions);

};
