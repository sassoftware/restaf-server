#
# This is for authorization_code flow
# This will not function correctly until Viya 3.5 is updated with a fix for samesite option
# At that time an update will be issued for restaf-server
# 
FROM node:12.4.0-alpine
LABEL maintainer="deva.kumar@sas.com"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
ENV OAUTH2=YES
ENV PROXYSERVER=NO
ENV SAMESITE=none

ENV APPHOST=localhost
# ENV APPPORT=8080
ENV APPNAME=viyaapp
ENV APPVERSION=1.0.0
ENV APPLOC=./public
ENV APPENTRY=index.html
ENV AUTHFLOW=authorization_code
ENV APPENV=

CMD [ "npm", "start"]

# ENV SAS_SSL_ENABLED=NO
# ENV EXPOSEHEADER=YES
# ENV SAMESITE=Lax
# ENV PROXYSERVER=NO
