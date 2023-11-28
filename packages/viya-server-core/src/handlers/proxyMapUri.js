async function proxyMapUri (req) {
  let credentials = req.auth.credentials;
  if (credentials != null) {
    let sid = credentials.sid;
    console.log('sid=', sid);
  }
  let path = process.env.PROXYSERVER;
  console.log('proxying to: ', path);
  let query = req.query;
  console.log({query});
  let params = req.params;
  console.log({params});
  let uri = path + '/' + params.param;
  console.log(uri);
    return {
      uri: uri
    };
  }
export default proxyMapUri;