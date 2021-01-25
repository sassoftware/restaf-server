# Servers for use with SAS Viya

This package has two servers:

1. restaf-server - Use this for developing an app server for web applications(see packages/appjs)
    - alternate name: viya-aappserverjs to be consisetent with item 2 below
2. viya-apiserverjs - Use this to develop rest api servers(see packages/apijs)

> The restaf-server will be soon super-seeded by viya-app-server with better support for protecting all routes

## Basic configuration

1. Set the default settings in Dockerfile. This will ensure these are set when you build containers.
2. Use the .env file when running bare-os and docker-compose file to set run time overrides.

### `Running with SSL`

This is the recommended setting. This will also make browsers like Chrome run with the SAMESITE settings set to ENABLED.
Make sure you specify the VIYA_SERVER with a protocol of https.

The following are the key settings:

1. `SAMESITE`
    - The recommend setting is None,secure.
    - If not set the servers will default to None,false - this is prmarily for backward compatability.

```env
ENV SAMESITE=None,secure
```

2.The certificates for SSL can be set in one of the following ways(all values are just examples)

- Let server Create a temporary unsigned certificate

    ```env
    ENV TLS_CREATE=C:US,ST:NC,L:Cary,O:YourCompany,OU:yourgroup,CN:localhost
    ```

- Provide your own key and certificate key

```env
ENV TLS_KEY=../certs/self/key.pem
ENV TLS_CERT=../certs/self/certificate.pem
```

- Provide key and certificate as a pfx file

```env
ENV TLS_PFX=../certs/sascert/sascert2.pfx
```

### `Running without SSL`

Make sure your specify VIYA_SERVER with a protocol of http

1. `SAMESITE`
    - Set this as None,false

```env
ENV SAMESITE=None,false
```

### CLIENTID and CLIENTSECRET

Recommend you use the authorization_flow code


## KeepAlive

Use the following options to keep your web application alive for longer periods

KEEPALIVE=YES
TIMERS=<run keepalive check every n seconds>,<total life time in seconds>

See this <https://github.com/sassoftware/restaf/wiki/usefulTips> for tips on keeping your Viya session and CAs sessions active
for longer periods.


## Viya Server Configuration and more

Please see <https://github.com/sassoftware/restaf-server/wiki>