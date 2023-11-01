# Notes

## 2.14.2

### Added Reverse Proxy

The purpose is to use the server as a reverse proxy server for Viya servers. The primary motivation is to run Work Bench. The dev version of WB does not support CORS from the sas-pub container. Currently the route for the reverse proxy is fixed as
{appname}/proxy. Making it settable is on the feature list.

## 2.14.3

### Allow full url for PROXYSERVER env

The hardcoded https was left over from initial debugging. Now the PROXYSERVER env must the full url