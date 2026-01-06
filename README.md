# `Application server for use with SAS Viya`

viya-serverjs is a app server designed to support user written SAS Viya applications. The applications can be written using any framework.

Key features:

1. Handles authentication
2. Extendable with additional end points

## Usage

Use npx command to start the server

```sh
npx @sassoftware/viya-serverjs
```

## `Basic configuration`

Configure the server using a .env file

### `Sample env file`

>[Note] Sample values shown below. See Advanced section for other ways to configure the server

```env

# Base setup
# With the configuration below the app server url will be
# https://localhost:8080/viyaapp
#
APPHOST=localhost
APPPORT=8080
HTTPS=true
APPNAME=viyaapp

# Most modern browsers will reject self-signed certs from localhost
# And SAS Viya might also refuse connection.
# Supply your own SSL/TLS values in a folder. All files in this folder will be used.
# Options:
# 1. provide signed certificates for localhost
# 2. Use libraries like mkcert to create temporary trusted certs for localhost
# 3. For other options see the Advanced Section
SSLCERT=./tls  

# AUTHENTICATION
VIYA_SERVER=<viya servrer url>

# By default it uses authorization_code flow

CLIENTID=<clientid>
CLIENTSECRET=<clientSecret if present>
AUTHFLOW=code|pkce

##########################
# Read the Advanced Section in the README before turning on these options
#
APPENV_PROXY=false
USETOKEN=false

APPENV_A=somevalue
APPENV_B=somevalue

```



