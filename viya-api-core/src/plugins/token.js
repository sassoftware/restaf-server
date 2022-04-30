exports.plugin = {
    name    : 'token',
    version : '1.0.0',
    register: itoken
};

async function itoken (server){
    await server.auth.scheme('SAStoken',require('../schemes/SASTokenScheme'));
    server.auth.strategy('token', 'SAStoken');
}
