"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function proxyMapUri(req) {
  var credentials = req.auth.credentials;
  console.log('------------------------------------------');
  if (credentials != null) {
    var sid = credentials.sid;
    console.log('sid=', sid);
  }
  var path = process.env.PROXYSERVER;
  console.log('proxying to= ', path);
  var params = req.params;
  console.log('params=', params);
  var search = req.url.search;
  console.log('query=', search);
  var uri = path + '/' + params.param;
  if (search != null && search.trim().length > 0) {
    uri = uri + search;
  }
  console.log('destination= ', uri);
  var r = {
    uri: uri
  };
  if (credentials) {
    console.log('credentials.token=', credentials.token);
    r.headers = {
      Authorization: "Bearer ".concat(credentials.token)
    };
  }
  return r;
}
var _default = exports["default"] = proxyMapUri;
/*
let qsstring = req.raw.search;
  console.log('qsstring=', qsstring);
  let query = req.query;
  let newQuery = null;
 
  if (query != null) {
    console.log('query=', query);
    newQuery = {};
    for (let key in query) {
      let value = query[key];
      if (value === 'true' || value === 'false') {
        value = value === 'true';
      }
      newQuery[key] = value;
      }
      console.log('newQuery=', newQuery);
    }
  console.log(req.URLSearchParams);
  let uri = path + '/' + params.param;
  if (newQuery != null) {
    uri = `${uri}?${new URLSearchParams(newQuery)}`;
  }
 console.log('req.url', req.url); 
 console.log('req.url', req.url.search);
 console.log('uri=', req.uri);
 console.log('path=', req.path);
*/