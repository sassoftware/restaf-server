
let uuid = require('uuid');
let debug = require('debug')('appcookie');

module.exports = async function appCookie(server, options) {

  debug('in appCookie');
  debug(options.redirectTo);
  let cookieOptions = {
    cookie: {
      name: 'cookie',
      password: uuid.v4(),
      isSecure: options.isSecure,
      isSameSite: options.isSameSite
    },
    redirectTo: options.redirectTo,
    appendNext: { name: 'next' },
    validate: async (req, session) => {
      console.log('validating session', session);
      if (!session) {
        return { isValid: false };
      }
      return {
        isValid: true,
        credentials: session      // becomes request.auth.credentials
      };
    }
  };
  debug('session cookie options', cookieOptions);
;
  server.auth.strategy('session', 'cookie', cookieOptions);

};
