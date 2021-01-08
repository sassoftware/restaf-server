
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
            isSameSite: 'None'
        },
        redirectTo  : options.redirectTo,
        appendNext  : {raw: true, name: 'next'},
        validateFunc: async (req,session) => {
            if (session === null) {
                return {valid: false};
            }
            const credentials = await req.server.app.cache.get(session.sid);
            
            return {valid: true, credentials: credentials};
        }
    };
    server.log(cookieOptions);
    server.auth.strategy('session', 'cookie', cookieOptions);

}
