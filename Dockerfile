FROM node:12.16.1-alpine
LABEL maintainer="deva.kumar@sas.com"
WORKDIR /usr/src/app
COPY . .
# COPY package*.json ./
RUN npm install
# RUN npm run build

# will auto change to localhost in non-docker environments
ENV APPHOST=0.0.0.0
ENV APPLOC=./public
ENV PORT=8080
EXPOSE 8080
ENV HTTPS=true

ENV APPPORT=8080
ENV APPNAME=mcpserver
ENV AUTHFLOW=code
ENV CLIENTID=mcpserver
ENV CLIENTSECRET=jellico
ENV USELOGON=FALSE
ENV USETOKEN=TRUE

ENV SSLCERT=
ENV VIYACERT=


# Most modern browsers do not accept self-signed certs from localhost
# Options:

# 1. provide signed certificates for localhost
# 2. Use libraries like mkcert to create temporary trusted certs for localhost
# 3. Use the app server as a proxy to the Viya server to avoid CORS issues.
#    This requires that the app redirect all Viya API calls to the app server proxy endpoint
#    Users of restaf can simply set the APPENV_PROXY env to TRUE to enable this behavior
# 4. set USETOKEN to TRUE and use the token in the APPENV object to make the calls
# either use the proper ssl/tsl certs or use the "proxy" method
# to avoid CORS issues with self-signed certs
# so run all apps thru the proxy and call Viya from there

ENV APPENV_PROXY=false


# APPENV_PROXYSERVER=true
# USETOKEN=true
ENV SHOWENV=true

ENV APPENV_XYZ=AA
ENV APPENV_BAD=
CMD ["npm", "start"]
