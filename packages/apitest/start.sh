#!/usr/bin/env bash
# Azure wants to prefix the app env 
# Use this to set the env that this server expects

# https://docs.microsoft.com/en-us/azure/app-service/reference-app-settings?tabs=kudu%2Cdotnet
env | grep APPSETTING_

if [[ ! -z "$APPSETTING_VIYA_SERVER" ]];
then 
    export VIYA_SERVER=$APPSETTING_VIYA_SERVER
    echo VIYA SERVER= $VIYA_SERVER
else 
    echo "No custom application overrides"
fi
npm run indocker