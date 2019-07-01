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
ENV OAUTH2=YES
ENV PROXYSERVER=NO

ENV APPHOST=0.0.0.0
ENV APPPORT=8080
ENV APPNAME=viyaapp
ENV APPLOC=./public/session
ENV APPENTRY=logon.html
ENV REDIRECT=redirect.html
ENV MAINENTRY=index.html
ENV APPENV=appenv.js

ENV AUTHFLOW=server


CMD [ "npm", "start"]