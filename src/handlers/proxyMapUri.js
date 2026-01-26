let debug = require('debug')('proxyMapUri');
async function proxyMapUri (req) {
  let credentials = req.auth.credentials;
  debug('------------------------------------------');
  debug('serverstate', req.server.state  );
  debug('state', req.state);
  if (credentials != null) {
    let sid = credentials.sid;
    debug('sid=', sid);
  }
 
  let path = process.env.VIYA_SERVER;
  //let path = (process.env.PROXYSERVER == null) ? process.env.VIYA_SERVER : process.env.PROXYSERVER;
  debug('proxying to= ', path);
  let params = req.params;
  debug('params=', params);
  let search = req.url.search;
  debug('query=', search);
  let uri = path + '/' + params.param;
  if (search != null && search.trim().length > 0) {
    uri = uri + search;
  } 
  debug('destination= ',uri);
  return {
    uri: uri
  };
  }
export default proxyMapUri;
