FROM node:12.4.0-alpine
LABEL maintainer="deva.kumar@sas.com"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080

ENV SAS_SSL_ENABLED=NO
ENV EXPOSEHEADER=YES
ENV SAMESERVICE=LAX
ENV OAUTH2=NO
ENV PROXYSERVER=NO

ENV APPHOST=0.0.0.0
ENV APPPORT=8080
ENV APPNAME=cms
ENV APPLOC=./public
ENV APPENTRY=logon.html
ENV REDIRECT=index.html
ENV APPENV=appenv.js
ENV APPURI=viyapp

ENV AUTHFLOW=implicit



CMD ["npm", "run", "indocker"]