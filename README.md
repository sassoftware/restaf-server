# `Application server for use with SAS Viya`

This package has two servers:

1. restaf-server - Use this for developing an app server for web applications(see packages/appjs)
    - alternate name: viya-aappserverjs to be consisetent with item 2 below
2. viya-apiserverjs - Use this to develop rest api servers(see packages/apijs)

> The restaf-server will be soon super-seeded by viya-app-server with better support for protecting all routes

## `Basic configuration`

1. Set the default settings in Dockerfile. This will ensure these are set when you build containers.
2. Use the .env file when running bare-os and docker-compose file to set run time overrides.

### `Sample env file`
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
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

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

I am not really sure about the impact of setting for new Schemeful Same-site option to default. So enable it at your own risk.

2. The certificates for SSL can be set in one of the following ways(all values are just examples). 


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

### `Running without SSL`

Make sure your specify VIYA_SERVER with a protocol of http

1. `SAMESITE`
    - Set this as None,false

```env
ENV SAMESITE=None,false
```

You might also have to disable all the SAMESITE options in your browser:

- SameSite by default cookies
- Coookies with SameSite must be secure
- Schemeful Same-site

### CLIENTID and CLIENTSECRET

Recommend you use the authorization_flow code. Set the redirect url to this pattern:

<protocol>://<APPHOST>:<APPPORT>/<APPNAME>
ex:
<https://localhost:5000/viyaapp>

If you also run without ssl enabled then set it to something like this:
<https://localhost:5000/viyaapp,http://localhost:5000/viyaapp>

If you are using port 443 for ssl-enabled, then add this redirect also
<https://localhost/viyaapp>


## Viya Server Configuration and more

Please see <https://github.com/sassoftware/restaf-server/wiki>