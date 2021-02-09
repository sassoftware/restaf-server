FROM node:12.16.1-alpine
LABEL maintainer="deva.kumar@sas.com"
WORKDIR /usr/src/app
COPY . .
# COPY package*.json ./
RUN npm install
# RUN npm run build
EXPOSE 8080
# will auto change to localhost in non-docker environments
ENV APPHOST=0.0.0.0

#######################################################################
# You can override these(but in container leave APPHOST as shown below)
########################################################################

# set this the same as EXPOSE here and override in env or as -p option in dockerrun
# ENV APPPORT=8080
ENV APPNAME=viyaapp
ENV AUTHFLOW=code
ENV CLIENTID=viyaapp
ENV CLIENTSECRET=secret

# ENV PLUGIN=hapi-swagger
# ENV SWAGGER=./swagger.json

# The following are defaults 
ENV APPLOC=./public
ENV APPENTRY=index.html
# ENV APPENV=appenv.js

ENV TLS_CREATE="C:US,ST:NC,L:Cary,O:SAS Institute,OU:STO,CN:localhost"
# ENV TLS_CERT=../../../certs/cert64.cer
# ENV TLS_KEY=../../../certs/pubkey64.pem
ENV SAMESITE=None,secure
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

#####################################################################
CMD ["npx", "@sassoftware/viya-appserverjs"]
