FROM node:12.4.0-alpine
LABEL maintainer="deva.kumar@sas.com"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080

ENV APPHOST=0.0.0.0
ENV APPPORT=8080
ENV AUTHFLOW=implicit
ENV CLIENTID=callback
ENV APPNAME=viyaapp
ENV APPLOC=./public
ENV APPENTRY=index.html
ENV APPENV=appenv.js



CMD ["npm", "run", "indocker"]