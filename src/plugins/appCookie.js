
let uuid = require('uuid');
let debug = require('debug')('cookie');

module.exports = async function appCookie (server, options){

    await server.register(require('@hapi/cookie'));
    
    debug('in appCookie');
    debug('redirecTo', options.redirectTo);
    let cookieOptions = {
        cookie: {
            name      : 'cookie',
            password  : uuid.v4(),
            isSecure  : options.isSecure,
            isSameSite: options.isSameSite
        },
        redirectTo  : options.redirectTo,
        appendNext  : {name: 'next'},
        validate: async (req, session) => {
            debugger;
            debug('Cookie validate', `path - ${req.path}`);
            
            if (session == null) {
                console.log('session is null');
                return {isValid: false};
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
                return {isValid: false};
            }
            debug('Cookie validate', sid);
            return {isValid: true, credentials: credentials};
        }
    };
    // console.log('cookie options', cookieOptions);
    debug('Cookie Options',cookieOptions);
    server.auth.strategy('session', 'cookie', cookieOptions);

};
