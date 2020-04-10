# @sassoftware/restaf-server - web server in nodejs for SAS Viya Applications

This server is designed for use with SAS Viya. It is customized using the env file and the Dockerfile.

The following authentication schemes are supported:

1. No authentication - the pages are served up as static pages.
2. Implicit flow
3. Authorization_code

---

## Note for users of restaf-server@6.11.2

The handling of authentication is handled differently in this version.

1. Implicit flow authentication is handled differently. The redirect for an implicit flow clientid **must** follow this pattern

```text
if APPHOST is localhost, APPPORT is 8080 and APPNAME is viyaapp then the redirect must http://localhost:8080/viyaapp/callback
```

## Installation

npm install @sassoftware/restaf-server

## Usage

```script
npx @sassoftware/restaf-server  --env=your-env-envfile --docker=your-DockerFile --appenv=your-appenv.js-file
```

The arguments env and docker are used to specify environment variables in a portable manner.

If you do not specify atleast one of these, you MUST set the values as environment variables.

The runtime environment variables are set in this order

1. Dockerfile - The ENV value are set as environment variables.

2. env file - The values in this file are used to override the defaults set through dockerfile and add other ones

3. If you want to set the values of some or all environment variables using some system script(ex: your Viya Server url) then do not specify them in either the dockerfile or env file.

   A note on EXPOSE and APPPORT - If APPPORT is not set then it is set to EXPOSE. If you want to run in a container leave APPPORT to be the same as EXPOSE and use docker runtime options to redirect to other ports.
4. appenv is used to specify application specific values that are available to the application at run time(see appenv below)

The recommended approach is:

1. Use Dockerfile  to specify values that are usually not overridden by users and is not a violation of **security policies**.
2. Use the env file for runtime environment variables
3. Use system SET commands to set the values - make sure you do not set the values in dockerfile or env file.

```docker
ENV optionName=

For example
ENV VIYA_SERVER=

In the environment variable set the value of VIYA_SERVER

SET VIYA_SERVER=http://yourViyaServer

```

## appenv option and the /appenv route  

There is a builtin route **/appenv** that the application can use to obtain two objects.

1. LOGONPAYLOAD has the information related to the VIYA_SERVER. Please see below for details.

2. It also returns an object APPENV whose value is set to the javascript object returned from appenv.js

Let us consider an example:

A sample appenv.js file is shown below

```js
let myinfo = {
    caslib: 'casuser',
    table : 'foo'
}
return myinfo;
```

In your index.html you will have a script tag as follows:

```html
<script src="/appenv'><script>
```

In your javascript you now have access to two variables

1. LOGONPAYLOAD - this has information related to authentication

2. APPENV - a javascript object that has the values returned by the appenv.js file. In this example the APPENV variable will look as follows:

```js
APPENV = {
    caslib: 'casuser',
    table : 'foo'
}


## LOGONPAYLOAD

The general form of this object is:
{
      authType : <your authflow value>,
      redirect : <the redirect url>
      host     : <your viya server>
      clientID : <useful if using implicit flow and custom handling logon to Viya Server>,
      appName  : <APPNAME>,
      host     : <same as VIYA_SERVER - left here for backward compatability>
      keepAlive: < see notes below>
    };
}

### keepAlive
## Quick start Examples of authentication flows

---

## No authentication

---
The env file is:

```env
APPENTRY=index.html
APPLOC=./public
```

The server will return the specified APPENTRY from the location specified in APPLOC. A good default is ./public. If you are using react quickstart then this is usually ./build

---

## Implicit flow

---

On successful authentication the server will redirect the user to the entry specified in the APPENTRY variable.

To use this scenario modify these files as follows:

### env file

```env
VIYA_SERVER=your-viya-server(http://...)
AUTHFLOW=implicit
CLIENTID=your implicit flow clientid with a redirect as described below)
APPNAME= < A name for your app. The app will start at APPHOST:APPPORT/APP
APPPORT=some port number
APPENTRY=index.html
```

#### clientid redirect

Recommend the following:
Set the clientid redirect_uri to always be **{appName}/callback**

Example:
 If your APPNAME=viyaapp, APPHOST is localhost and APPPORT=8080, then set the redirect to <http://localhost:8080/viyaapp/callback>

restaf-server will handle the callback and redirect to APPENTRY.

---

## Authorization_code flow

---

Your env file should like something like this. The redirect for this flow is as follows:

```js
 If your APPNAME=viyaapp, APPHOST is localhost and APPPORT=8080, then set the redirect to <http://localhost:8080/viyaapp>

restaf-server will handle the callback and redirect to APPENTRY.


```

```env
VIYA_SERVER=your-viya-server(http://...)
AUTHFLOW=code
CLIENTID=your authorization_code flow clientid with a redirect as described below)
CLIENTSECRET=your clientsecret
APPNAME=A name for your app. The app will start at APPHOST:APPPORT/APPNAME
APPENTRY=index.html
APPPORT=port of your choice
KEEPALIVE=Used to keep the session alive(see noes below)
```

---

### Docker file

---
You will need only one Dockerfile. Use the env file and environment variables to override the defaults in the dockerfile.

A good default Dockerfile is shown below

```docker
FROM node:12.4.0-alpine
LABEL maintainer="your-email"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080

#
# You can override these(but when deploying in a docker container leave APPHOST as shown below)
#

ENV APPHOST=0.0.0.0
ENV APPPORT=8080
ENV APPNAME=viyaapp
ENV APPLOC=./public
ENV APPENTRY=index.html
ENV APPENV=appenv.js
CMD ["npm", "run", "indocker"]
```

### APPNAME

Assign a meaninful name for your app.

### APPHOST

This can be one of the following values:

localhost|*|ipAddress|dns-name-of-server

If set to *, restaf-server will resolve it to the dns name using nodejs function os.hostname. This is usually the short name which might not be sufficient in some situations.

### APPLOC

This is the directory where restaf can find the static assets of your app. This is relative to the root of your application. Typically this is ./public

### APPENTRY

After a successful logon restaf will redirect to this entry specified via APPENTRY.

## Custom startup of server

---

This scenario is for users who want to add their own routes to the server.
But for most common cases there is no need to do this.

Create an app.js that looks as shown below. See <https://hapi.dev/> on details on how to define your routes.

```js
let rafserver = require ('./lib/index.js');
rafserver.icli (getCustomHandler ());

function getCustomHandler () {
    let handler =
    [
        {
            method: [ 'GET' ],
            path  : `/myroute`,
            config: {
                auth   : false,
                cors   : true,
                handler: myRouteHandler
            }
       }
    ];
    return handler;
    }

async function myRouteHandler(req, h) {
   ...
}
```

## keepAlive

This is only needed if you are using authorization_code flow.
In your call you can call this end point to keep your current session alive.

If the KEEPALIVE environment variable is set, restaf-server will set the keepAlive key in the LOGONPAYLOAD object to the url to call for keeping your session alive. You can call it at anytime in your app.

### A note for restaf users

restaf automatically calls this end point everytime a call is made to any Viya Service. If you wish to mimic the behavior of Viya Applications like SASVisualAnalytics you can call it everytime the user moves the mouse.

## Notes on configuring SAS Viya for user applications

1. sas.commons.web.security.cors- Turn on allowCredentials and set the allowed origins to meet your needs.

2. sas.common.web.security:  set samesite based on where you are deploying your application. Users of VA SDK should consult its documentation.

3. sas.commons.web.security - Set the allowed uri's appropriately. A sample setting is shown below. This allows running your app from localhost or from anywhere in your company network(sas in the example)

```script
http(s?)[:]\/\/([^\.]+\.)*sas\.com,http(s)*[:]\/\/localhost([:])*\d*

```

## Some useful links

[Test url regular expressions](https://regex101.com/)
