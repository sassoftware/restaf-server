FROM node:12.16.1-alpine
LABEL maintainer="your-email"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080



#####################################################################
# You can override these(but in container leave APPHOST as shown below)
# 

# set this the same as EXPOSE here and override in env or as -p option in dockerrun
ENV APPPORT=8080

# will change to localhost in non-docker environments
ENV APPHOST=0.0.0.0
ENV APPNAME=viyaapp

# The following are defaults 
ENV APPLOC=./public
ENV APPENTRY=index.html
# ENV APPENV=appenv.js

# TLS releated info . 
# BAD but: REJECT_UNAUTHORIZED is turned off by default since many forget to get rid 
# of the unsigned certificate used by Viya during install

ENV SAMESITE=None,false
# ENV NODE_TLS_REJECT_UNAUTHORIZED=0
#####################################################################
CMD ["npm", "start"]