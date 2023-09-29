FROM node:12.16.1-alpine
LABEL maintainer="deva.kumar@sas.com"
WORKDIR /usr/src/app
COPY . .
# COPY package*.json ./
RUN npm install
# RUN npm run build

# will auto change to localhost in non-docker environments
ENV APPHOST=0.0.0.0
ENV PORT=8080
EXPOSE $PORT
#######################################################################
# You can override these(but in container leave APPHOST as shown below)
########################################################################

# set this the same as EXPOSE here and override in env or as -p option in dockerrun
# ENV APPPORT=8080

ENV APPNAME=viyaapp
ENV AUTHFLOW=code
ENV CLIENTID=clientapp
ENV CLIENTSECRET=secret
# ENV HAPIDEBUG=YES
# ENV LOGLEVEL=info
# ENV USETOKEN=YES

#sample setup for creating a temporary cert and key
ENV TLS_CREATE="C:US,ST:NC,L:Cary,O:SAS Institute,OU:STO,CN:localhost"

# You can specify your own cet and key
# ENV TLS_CERT=../../../certs/cert64.cer
# ENV TLS_KEY=../../../certs/pubkey64.pem

# Samesite specification
ENV SAMESITE=None,secure

# If your Viya instance still has a unsigned certificate set this value prior to invoking the server
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

#####################################################################
CMD ["npm", "run", "indocker"]
