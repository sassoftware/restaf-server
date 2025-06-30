async function proxyMapUri (req) {
  let credentials = req.auth.credentials;
  console.log('------------------------------------------');
  if (credentials != null) {
    let sid = credentials.sid;
    console.log('sid=', sid);
  }
 
  let path = process.env.PROXYSERVER;
  console.log('proxying to= ', path);
  let params = req.params;
  console.log('params=', params);
  let search = req.url.search;
  console.log('query=', search);
  let uri = path + '/' + params.param;
  if (search != null && search.trim().length > 0) {
    uri = uri + search;
  } 
  console.log('destination= ',uri);
  return {
    uri: uri
  };
  }
export default proxyMapUri;
