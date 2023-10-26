async function proxyMapUri (req) {
 let path = process.env.PROXYSERVER;
 console.log('proxying to: ', path);
 let params = req.params;
 console.log(params);
  return {
    uri: path
  };
}
export default proxyMapUri;