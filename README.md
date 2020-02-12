# @sassoftware/restaf-server - web server in nodejs for SAS Viya Applications

This server is designed for use with SAS Viya. It is customized using the env file and the Dockerfile.

The following authentication schemes are supported:

1. No authentication - the pages are served up as static pages.
2. Implicit flow     - Implicit flow authentication flow is supported.
3. Authorization_code - (coming soon). This will be supported with a planned SAS Viya 3.5 maintenance release.

---

**Note: The current production version of restaf-server is restaf-server@6.11.2. All future versions will be scoped to sassoftware.
There are no known breaking changes with this re-organization of the package. Please report if you see any issues and it will be addressed immediately.**

---

## Version

```text
Version 7.1.x
```

### Installation

npm install @sassoftware/restaf-server

## Usage

```script
npx restaf-server  <--env=envfile> <--docker=dockerfile> <--appenv=appenv.js>
```

The arguments env and docker are used to specify environment variables in a portable manner.
If you do not specify atleast one of these, you MUST set the preset the environment variables using your system's commands like SET

The runtime environment variables are set in this order

1. Dockerfile - The ENV value are set as enviroment variables.

2. env file - The values in this file are used to override the defaults set through dockerfile

3. If you want to set the values of some or all environment variables using some system script(ex: your Viya Server url) then do not specify them in either the dockerfile or env file.

   A note on EXPOSE and APPPORT - If APPPORT is not set then it is set to EXPOSE.

The recommended approach is:

1. Use dockerfile  to specify values that are usually not overridden by users and is not a violation of **security policies**.
2. Use the env file for runtime environment variables
3. Use system SET commands to set the values - make sure you do not set the values in dockerfile or env file.

```docker
ENV optionName=

For example
ENV VIYA_SERVER=

In the environment variable set the value of VIYA_SERVER

SET VIYA_SERVER=http://yourViyaServer

```

## Examples of authentication flows

## NO authentication

The env and Dockerfile for this scenario is in /env/static directory.

## Implicit flow

On successful authentication the server will redirect the user to the entry specified in the APPENTRY variable.

The env and Docker file for this scenario is in /env/implicit directory

To use this scenario modify these files as follows:

### env file

This is primarily used to override the values set in Dockerfile. Setting CLIENTID here is a good practice.

1. Set the CLIENTID to your implicit flow clientid

### Docker file

1. Set the EXPOSE port to your desired port no.
2. Set the following to suit your needs

```docker
ENV APPHOST=localhost
ENV APPNAME=viyaapp
ENV APPLOC=./public
ENV APPENTRY=index.html
```

### APPNAME

Assign a meaninful name for your app.

### APPHOST

This can be one of the following values:

localhost|*|ipAddress|dns-name-of-server

If set to *, restaf-server will resolve it to the dns name using nodejs function os.hostname.

### APPLOC

This is the directory where restaf can find the static assets of your app. This is relative to the root of your application. Typically this is ./public

### APPENTRY

After a successful logon restaf will redirect to this entry specified via APPLOC.

## Invoking the application

To start the server use the following command

```script
npx restaf-server --env=your-env-file --docker=your-docker-file
```

## Documentation of API

To view the API documentation visit this site

```script
https://localhost:8080/documentation
```

Enter this command after the app is up and running.
