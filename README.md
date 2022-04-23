# `Application server for use with SAS Viya`

This package has two servers:

1. viya-appserverjs - Use this for developing an app server for web applications(see packages/appjs)

2. viya-apiserverjs - Use this to develop rest api servers(see packages/apijs)

## `Basic configuration`

1. Set the default settings in Dockerfile. This will ensure these are set when you build containers.
2. The defaults can be overriden using environment variables.

### `Sample env file`

When running on a non-docker environment, you can use a .env

```env
VIYA_SERVER=<your viya server>
APPHOST=localhost < can also be dns name of your server. ex: viyaiscool.unx.sas.com>
APPPORT=5000   <any port of your choice>
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

#######################################################################
# You can override these in .env file or docker-compose file
########################################################################

ENV APPNAME=viyaapp
ENV AUTHFLOW=code
ENV CLIENTID=viyaapp
ENV CLIENTSECRET=secret

# The following are defaults 
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
ENV USETOKEN=TRUE

#####################################################################
CMD ["npx", "@sassoftware/viya-appserverjs"]

```

### `Running with SSL enabled -- Recommended`

This is the recommended setting. This will also make browsers like Chrome run with the SAMESITE settings set to Default - your users will thank you.

Make sure you specify the VIYA_SERVER with a protocol of https.

The following are the key settings:

1. `SAMESITE`
    - The recommend setting is None,secure.
    - If not set the servers will default to None,false - this is prmarily for backward compatability.

```env
ENV SAMESITE=None,secure
```

You should be able to set these browser settings to default:

- SameSite by default cookies
- Coookies with SameSite must be secure

- Let server create a temporary unsigned certificate

    ```env
    ENV TLS_CREATE=C:US,ST:NC,L:Cary,O:YourCompany,OU:yourgroup,CN:localhost
    ```

- Provide your own key and certificate key

```env
ENV TLS_KEY=../certs/self/key.pem
ENV TLS_CERT=../certs/self/certificate.pem
```

- Provide key and certificate as a pfx file

```env
ENV TLS_PFX=../certs/sascert/sascert2.pfx
```

### CLIENTID and CLIENTSECRET

Recommend you use the authorization_flow code. Set the redirect url to this pattern:

<protocol>://<APPHOST>:<APPPORT>/<APPNAME>
ex:
<https://localhost:5000/viyaapp>

If you also run without ssl enabled then set it to something like this:
<https://localhost:5000/viyaapp,http://localhost:5000/viyaapp>

If you are using port 443 for ssl-enabled, then add this redirect also
<https://localhost/viyaapp>
