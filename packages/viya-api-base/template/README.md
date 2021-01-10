# viya-api-server-nodejs - Jump start a REST api server for your SAS Viya programs

This package is targeted towards SAS Viya users/teams interested in making their SAS Viya programs available via a REST API interface. The required skills are:

1. nodejs
  a. You will define your API as a javascript object
  b. All your handlers will be written in nodejs

2. A basic understanding of REST API

If this approach get sufficient interest from the community, it can be extended with features like:  
    1. Accept yaml defintion of the REST API(API First Process)
    2. Better validation using [Joi](https://joi.dev/)
    3. Return user friendly error messages
    4. Logging
    6. And probably a lot more

## `Benefits of using this package`

1. Define your api end points using javascript
2. Authentication
    1. Accepts a valid Viya token
    2. If called from an authenticated browser session it will get a token from Viya
    3. By design it does not support client credentials(userid, password) - since 1 and 2 are the more common use cases.
3. In your handler (where you process the request) you will have access to a context object that has the following:
    2. The current valid token
    2. All the standard http artifacts - path, query, payload, headers etc..
    3. You can use all the cool features of [hapi server](https://hapi.dev/api/?v=20.0.3)
4. Access the REST end points via swagger, web applications and any scripting environment.
5. Deploy the server in a docker container
6. The starter example has the following end points to jump start your development. These cover some basic scenarios.

    1. Cas actions
    2. Casl statements
    3. Compute service with the user-supplied code
    4. Specific program saved in the "server". In this example the SAS code is in a file on the api server, but in a real deployment this code will be in some repository

## `Why is there nodejs in the name?`

I developed this package using nodejs - my go-to hammer to solve all the world's problems :-)
But maybe some one will be motivated to do one in Python or Go - so that we could have viya-api-server-go and viya-api-server-python -  to satisfy everyone.

## `Key references`

1. [@sassoftware/restaf and @sassoftware/restaflib](https://github.com/@sassoftware/restaf) - these are libraries designed to simplify accessing SAS Viya from your handlers.

### `Background links`

1. [hapi](https://hapi.dev/)  - the underlying nodejs based web server.
2. [hapi-swagger](https://www.npmjs.com/package/hapi-swagger) - for defining routes and accessing swagger
3. [@sassoftware/viya-apiserverjs](https://github.com/@sassoftware/restaf-server) - is the api server built using hapi.

## `Creating the project`

```sh
git clone https://github.com/sassoftware/restaf-server -b apiSample some-name

ex: git clone https://github.com/sassoftware/restaf-server -b apiSample myapi

Then do the usual install of dependencies

cd myapi
npm install
```

## `Configuring the default setup`

As always you have to do some setup thru the .env and Dockerfile in the project directory.

To get going I recommend the following:

1. Register a clientid with a secret with the value *secret*.

The details on the clientid I use are shown below.
Note the grant-types and redirect_uri

```js
{
  scope: [ 'openid', '*' ],
  client_id: 'myapi',
  resource_ids: [ 'none' ],
  authorized_grant_types: [ 'password', 'authorization_code', 'refresh_token' ],   
  redirect_uri: [
    'http://localhost:8080/myapi/api',
    'http://localhost:8080/myapi/logon'
  ],
  autoapprove: [ 'true' ],
  access_token_validity: 86400,
  authorities: [ 'uaa.none' ],
  'use-session': true,
  lastModified: 1609727686858,
  required_user_groups: []
}
```

2.Configure the *.env* file

```env
VIYA_SERVER=http://cool.fbi.sashq-d.openstack.sas.com
```

If you are using a different client and clientsecret than the default then set those values in the .env file

## `Starting the server`

Issue this command

```sh
npm start
```

To run the server under nodejs debugger issue this commad

```sh
npm run debug
```

## Now try it out using swagger, POSTMAN or applications

### `Swagger`

Access swagger. For the default application it is [http://localhost:8080/myapi/api]
You will be prompted for userid and password. On successful authentication the swagger for your routes will be displayed. You can then access all your routes without any further authentication.

### `Postman`

Get a token using your usual magic dust and then access the end points.

### `Application`

Access the end points from a authenticated browser session. In this case the server will provide a token to your handler

## `Developing your REST API`

> All the handlers must be in the handlers directory

### `Jump starting your handlers`

Recommend that you adopt the samples in the handlers directory. The examples cover common use cases

1. Running sas jobs.
2. Running casl code.
3. Running cas actions.

### `Recommended Policies`

These are just recommendations to make it easier for others to follow your logic. It is not essential.

- Name the handler the same as the route where possible.
- Export all the handlers thru index.html

### `Quick Overview of handlers`

Each handler will look like this:

```js
module.exports = async function functionName(req,h){
    const context = req.pre.context;
    let {token, host} = context;

    ...
    <your code  - use the token and host to make your calls to Viya using REST APIs>
    ...

    return something;  /* The function must return either a promise or a value/object */
}
```

### `Parameters`

- req -- The request object from hapi. This has all the incoming information. Some of them are also available thru the context object

- h -- This object is used to send responses back. If you are returning simple object(string, js object) then you will just return that and not use h. But if you want to return special headers, status codes etc thne use h.

### `Context object`

The schema of context object is:

```js
{
    token:  /* bearer yourtoken */
    host : your viya server 
    path : path used to access this handler
    params: An array of the values of params --if the {params*} was part of the route specification
    query: Any query parameter as an js object
    payload: Any payload if the method is POST or PUT
}
```

## `Examples`

For examples using restaf to access Viya see the handlers in this directory

### `A simple example`

Below is an example using axios calling the file service.

```js
let axios = require('axios'){
async function simpleExample(req,h) {
    const context = req.pre.context;
    let {token, host} = context;
    
    let config = {
        method: 'GET'
        url: `${host}/files/files`,
        headers: {
          authorization: token
        }
    }

    let result = await axios(config);
    return result.data;

}
```

### `Using compute service`

A more complete example for accessing compute service. See
[https://github.com/sassoftware/restaf/wiki](for documentation on restaf and restaflib)

```js
let restaflib = require('@sassoftware/restaflib');
let setupConnection    = require('../lib/setupConnection');   
let fs = require('fs').promises;
module.exports = async function coolstuff (req,h) {
    return run(req,h) 
        .then (r => {return r;})
        .catch(err => {
            return err;/* need to add Boom support */
        });
};
async function run (req,h) {
    let { computeSetup, computeRun } = restaflib;
    let context = req.pre.context;
    let store = await setupConnection(context);
    let computeSession = await computeSetup(store, null, null);
    let f = context.path.split('/');

    let fname = `./pgm/${f[2]}.sas`;
    let src = await fs.readFile(fname, 'utf8');
    let computeSummary = await computeRun(
        store,
        computeSession,
        src,
        context.payload.input,
        15,2  /* just a place holder values for checking job status */
    );
    let log = await restaflib.computeResults(store, computeSummary, 'log');
    await store.apiCall(computeSession.links('delete'));
    // just return log for the example
    return log;

};
```

### `Context`

The context object is accessed as follows:
let context = req.pre.context;

```js
{
  token: The token you can use in the handler to access SAS Viya
  path: The path of the current route (ex: /myip/casAction)
  payload: The payload for the current call
  query: The query parameter as an java script object
  params: The path in an array - if url is /myip/a/b then params will be ['a', 'b']
}
```

The key item is context.token that you will need to make calls to Viya. The other keys and headers can be accesed via the request(req in the examples) object. So you can use the conetx object of the req object.

```js
req.payload  -- the payload sent on a POST call
req.qs       -- the query parameter in an object 
req.path     -- ex myapi/a/b
req.params   -- if the path was http://localhost:5000/myapi/a/b then params is ['a', 'b'];
req.path     -- ex myapi/a/b
req.headers  -- the current header
```

### `Server information`

host(viya server url)  - Access via process.env.VIYA_SERVER

### `Caching`

While the underlying framework is capable of supporting caching in memory I would like to hold off on discussing this capability at this point of development since REST API's are supposed to be stateless.

### `Returning results`

Every handler must have a return value. Please hapi documentation for the rules of the road. hapi gives you a lot of control.

### Steps

1. First add your route to api.js
2. Use one of the other routes in api.js as a guide - also refer to the hapi documentation
3. Add your handler in the handlers directory.
4. Now bring up the server and test the new route using Swagger.
5. Also add a test to the test directory - this package uses Jest.

> In the handler you can call any service (Viya or others). You will notice that I follow a certain pattern in my examples. Pick your own programming style.

### `Testing using jest`

The package uses Jest to create tests. Please see the test directory for examples. To avoid storing your password in the test scripts create a token and save it in a file. Then set the environment variable TOKENFILE with the path to this file.

```sh
npm test
```

## `Swagger configuration`

The swagger.json file is used to configure swagger-ui. I do not understand all the options one can set. For this initial release the minimal set seems to work.
