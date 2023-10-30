async function proxyMapUri (req) {
  let credentials = req.auth.credentials;
  let sid = credentials.sid;
  console.log('sid=', sid);
  let path = process.env.PROXYSERVER;
  console.log('proxying to: ', path);
  let params = req.params;
  console.log(params);
  let uri = 'https://'+ path + '/' + params.param;
  console.log(uri);
    return {
      uri: uri
    };
  }
export default proxyMapUri;