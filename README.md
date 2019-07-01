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

1. env file (see note below)
2. dockerfile
3. preset environment variables

---

  **The env option is supported for backward compatability. In new applications use the dockerfile and preset environment variables. This will make it easier to test and deploy the application either in Docker or as a bare OS application.**

---

The recommended approach is:

1. Use dockerfile  to specify values that are best not overriden by users. 
2. Use environment To indicate that you are expecting the value to be specified in the environment variable use the following syntax

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
  