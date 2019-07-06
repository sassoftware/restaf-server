# restaf-server - web server in nodejs for SAS Viya Applications


Please see READMEv6.md for documentation on earlier releases.

## Version 

```text
Version 7.0.0
```

### Installation

npm install restaf-server

## Usage

```script
npx restaf-server  <--env=envfile> <--docker=dockerfile> <--appenv=appenv.js>
```

The arguments env and docker are used to specify environment variables in a portable manner.
If you do not specify atleast one of these, you MUST set the preset the environment variables using your system's commands like SET

The runtime environment variables are set in this order

1. If specified the dockerfile is processed and the ENV variables are used to set the appropriate environment variables.

2. If the env file is specified it is processed and the ENV variables are set. If the same values are set in the dockerfile then the values in the enc file takes precedence. 

3. If you want to set the values of some or all environment variables using some system script then do not specify then in either the dockerfile or env file.

4. A note on EXPOSE. If you use dockerfile I recommend that you not set the APPPORT and set only the EXPOSE. The server will ue the EXPOSE as the APPPORT.

---

  **The env option is supported for backward compatability. In new applications use the dockerfile and preset environment variables. This will make it easier to test and deploy the application either in Docker or as a bare OS application.**

---

The recommended approach is:

1. Use dockerfile  to specify values that are usually not overriden by users.
2. Use the env file of the environment variables to override the defaults in the Dockerfile. 

```docker
ENV optionName=

For example
ENV VIYA_SERVER=

In the environment variable set the value of VIYA_SERVER

SET VIYA_SERVER=http://yourViyaServer

```

## Version 6.10.0

- Removed dependency on shelljs - not used any more.
- Allow inherting of env variables while processing th env file if the following. Inheriting is done if the variable is either not set in the env file or
         SET NAME
         SET NAME=

## Version 6.0.0

- Fixed issues with depedencies
  - Fixed issues with /appenv not being processed properly
  - Removed includes for hot-module since it does not work yet.

## Verson 5.0.0

- Changes to the cli version are **breaking changes**. Stay with pre 5.* version if you want the previous behavior.
- Upgraded the packages and in particular Babel and Webpack.
    . Using Babel to build the code in this release but the webpack config is left intact for reference.
- Added new entry point of app to accept named parameters just as the new cli version does
- Recommendations:
  - The growing trend is to install packages locally and use npx to execute them.
- Under-development:
  - Support for Hot-Module Replacement

## Version 4.4.0

  . Support specifing VIYA_SERVER with protocol

  This simplifies the set up of applications
  