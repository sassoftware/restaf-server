FROM node:12.16.1-alpine
LABEL maintainer="deva.kumar@sas.com"
RUN apk add --no-cache --upgrade bash
RUN apk add --no-cache --upgrade curl
WORKDIR /usr/src/app
COPY . .
# COPY package*.json ./
RUN npm install
# RUN npm run build
EXPOSE 8080
# will auto change to localhost in non-docker environments
ENV APPHOST=0.0.0.0
ENV PORT=8080

#######################################################################
# You can override these(but in container leave APPHOST as shown below)
########################################################################

# set this the same as EXPOSE here and override in env or as -p option in dockerrun
# ENV APPPORT=8080
ENV APPNAME=viyaapi
ENV AUTHFLOW=code
ENV CLIENTID=viyaapi
ENV CLIENTSECRET=secret

# ENV HAPIDEBUG=YES
# ENV LOGLEVEL=info
# ENV PLUGIN=hapi-swagger  
# The following are defaults 
ENV APPLOC=./public
ENV APPENTRY=index.html
# ENV APPENV=appenv.js

# ENV TLS_KEY=./secrets/tls.key
# ENV TLS_CERT=./secrets/tls.crt
ENV TLS_CREATE="C:US,ST:NC,L:Cary,O:SAS Institute,OU:STO,CN:localhost"
ENV SAMESITE=None,secure
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

#####################################################################
CMD ["./start.sh"]
