[![snyk](https://snyk.io/test/github/teunmooij/payload-tools/badge.svg)](https://snyk.io/test/github/teunmooij/payload-tools)
[![npm version](https://badge.fury.io/js/create-payload-api-docs.svg)](https://badge.fury.io/js/create-payload-api-docs)

# create-payload-api-docs

CLI for generating openAPI 3 documentation for your payload cms.

Alternatives:

- [payload-openapi](https://www.npmjs.com/package/payload-openapi): to programmatically generate the openapi documentation
- [payload-swagger](https://www.npmjs.com/package/payload-swagger): easy to use swagger payload plugin

## How to use

Run the following command from your payload repository root folder:

```shell
npx create-payload-api-docs
```

Or use the commandline option. To learn more:

```shell
npx create-payload-api-docs --help
```

If you intend to use this package in your build pipeline, it is recommended to add it to your repo as a dev dependency, to prevent duplicate dependency downloads.

```shell
npm i --save-dev create-payload-api-docs
```

## Version history

See [changelog](./CHANGELOG.md)
