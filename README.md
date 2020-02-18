# @sassoftware/restaf-server - web server in nodejs for SAS Viya Applications

This server is designed for use with SAS Viya. It is customized using the env file and the Dockerfile.

The following authentication schemes are supported:

1. No authentication - the pages are served up as static pages.
2. Implicit flow     - Implicit flow authentication flow is supported.
3. Authorization_code - (coming soon). This will be supported with a planned SAS Viya 3.5 maintenance release.

---

**Note: The current production version of restaf-server is restaf-server@6.11.2. All future versions will be scoped to sassoftware.
There are no known breaking changes with this re-organization of the package. Please report if you see any issues and it will be addressed immediately.**

---


## Installation

npm install @sassoftware/restaf-server

## Usage

```script
npx @sassoftware/restaf-server  --env=your-env-envfile --docker=your-DockerFile --appenv=your-appenv.js file
```

The arguments env and docker are used to specify environment variables in a portable manner.

If you do not specify atleast one of these, you MUST set the preset the environment variables using your system's commands like SET

The runtime environment variables are set in this order

1. Dockerfile - The ENV value are set as environment variables.

2. env file - The values in this file are used to override the defaults set through dockerfile

3. If you want to set the values of some or all environment variables using some system script(ex: your Viya Server url) then do not specify them in either the dockerfile or env file.

   A note on EXPOSE and APPPORT - If APPPORT is not set then it is set to EXPOSE. If you want to run in a container leave APPPORT to be the same as EXPOSE and use docker runtime options to redirect to other ports.

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

## Quick start Examples of authentication flows

---

## No authentication

---
The env file is:

```env
APPENTRY=index.html
```

The only thing needed is the APPENTRY where you want the application to start.

---

## Implicit flow

---



On successful authentication the server will redirect the user to the entry specified in the APPENTRY variable.

To use this scenario modify these files as follows:

### env file

This is primarily used to override the values set in Dockerfile. Setting CLIENTID like this is a good practice.

```env
AUTHFLOW=implicit
CLIENTID=callback
```

#### clientid

Recommend the following:
Set the clientid redirect_uri to always be **callback**

Example:
 If your APPHOST is localhost and APPPORT=8080, then set the redirect to <http://localhost:8080/callback>

restaf-server will handle the callback and redirect to APPENTRY. This way you will not need the logon.html anymore.

### Docker file

You will need only one dockerfile. Use the env file and environment variables to override the defaults in the dockerfile.

1. Set the EXPOSE port to your desired port no.
2. Set the following to suit your needs

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

---

## Authorization flow

---

The only changes from the implicit flow are;

1. set AUTHTYPE to authorization_code
2. Make sure that the clientid has an associated clientsecret

Your env file should like something like this

```env
AUTHFLOW=authorization_code
CLIENTID=appl
CLIENTSECRET=secret
```

---

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

## Documentation of API

To view the API documentation visit this site

```script
https://localhost:8080/documentation
```

Enter this command after the app is up and running.
