# `@sassoftware/viya-appserverjs - Application server for use with SAS Viya`

 Use this for developing an app server for web applications.

 See this [wiki page](https://github.com/sassoftware/restaf-server/wiki) for details

## Usage

Specify it as a dependency in your package.json just as you do with other dependencies

Use npx command to start the server

```sh
npx @sassoftware/viya-appserverjs
```

## `Basic configuration`

1. Set the default settings in Dockerfile. This will ensure these are set when you build containers.
2. The defaults can be overriden using environment variables.

### `Sample env file`

When running on a non-docker environment, you can use a .env

```env
VIYA_SERVER=<your viya server>
APPHOST=localhost < can also be dns name of your server. ex: viyaiscool.unx.sas.com>
APPPORT=5000   <any port of your choice>
APPNAME=viyaapp

CLIENTID=viyaapp
CLIENTSECRET=secret
```

### `Sample Dockerfile`

```env
FROM node:12.16.1-alpine
LABEL maintainer="your email"
WORKDIR /usr/src/app
COPY . .
RUN npm install
# RUN npm run build (if you have to build something)
EXPOSE 8080
ENV APPHOST=0.0.0.0

AUTHFLOW=code

# The following are defaults. Override them as needed
# APPLOC - where the file specified in APPENTRY is
# APPENTRY - the main entry of the application
ENV APPLOC=./public
ENV APPENTRY=index.html
# if your app takes advantage of appenv.js to pass configuration to the web application 
# ENV APPENV=appenv.js 

# See notes below on running with SSL enabled
ENV TLS_CREATE="C:US,ST:NC,L:Cary,O:yourcompany,OU:STO,CN:localhost"
ENV SAMESITE=None,secure

# It is better to set this before invoking the server
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

# set this to YES if you want access to the authentication token in the app
ENV USETOKEN=NO

CMD ["npx", "@sassoftware/viya-appserverjs"]

```

### `Running with SSL enabled -- Recommended`

This is the recommended setting. This will also make browsers like Chrome run with the SAMESITE settings set to Default - your users will thank you.

Make sure you specify the VIYA_SERVER with a protocol of https.

### `TLS certificates`

- Option 1: Let server create a temporary unsigned certificate

    ```env
    ENV TLS_CREATE=C:US,ST:NC,L:Cary,O:YourCompany,OU:yourgroup,CN:localhost
    ```

- Option 2: Provide your own key and certificate key

```env
ENV TLS_KEY=../certs/self/key.pem
ENV TLS_CERT=../certs/self/certificate.pem
```

- Option 3:  Provide key and certificate as a pfx file

```env
ENV TLS_PFX=../certs/sascert/sascert2.pfx
```
