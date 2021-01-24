
let uuid = require('uuid');
exports.plugin = {
    name    : 'appCookie',
    version : '1.0.0',
    register: iappCookie
};

async function iappCookie (server, options){

    await server.register(require('@hapi/cookie'));
    let cookieOptions = {
        cookie: {
            name      : 'ocookie',
            password  : uuid.v4(),
            isSecure  : options.isSecure,
            isSameSite: options.isSameSite
        },
        redirectTo  : options.redirectTo,
        appendNext  : {raw: true, name: 'next'},
        validateFunc: async (req, session) => {
            debugger;
            if (session === null) {
                console.log('session is null');
                return {valid: false};
            }
            const credentials = await req.server.app.cache.get(session.sid);
            server.log('Cookie validateFunc', credentials);
            return {valid: true, credentials: credentials};
        }
    };
    console.log('cookie options', cookieOptions);
    server.log('Cookie Options',cookieOptions);
    server.auth.strategy('session', 'cookie', cookieOptions);

}
