FROM node:12.4.0-alpine
LABEL maintainer="deva.kumar@sas.com"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
ENV OAUTH2=NO

ENV APPHOST=localhost
# ENV APPPORT=8080
ENV APPNAME=viyaapp
ENV APPVERSION=1.0.0
ENV APPLOC=./public
ENV APPENTRY=index1.html


CMD [ "npm", "start"]

# ENV SAS_SSL_ENABLED=NO
# ENV EXPOSEHEADER=YES
# ENV SAMESITE=Lax
# ENV PROXYSERVER=NO
