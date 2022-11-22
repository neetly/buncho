# Buncho

[![CI](https://github.com/neetly/buncho/actions/workflows/ci.yml/badge.svg)](https://github.com/neetly/buncho/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/buncho)](https://www.npmjs.com/package/buncho)

```sh
yarn add --dev buncho
yarn start
```

```json
{
  "scripts": {
    "start": "buncho start",
    "build": "buncho build",
    "clean": "buncho clean"
  }
}
```

## Config

```json
{
  "publicPath": "/",
  "useReactRefresh": true,

  "devServer": {
    "host": "localhost",
    "port": 3000,
    "proxy": {}
  }
}
```

## Storybook

```sh
yarn add --dev storybook @storybook/react-webpack5 @buncho/storybook-preset
yarn storybook dev
```

```ts
export const framework = "@storybook/react-webpack5";
export const addons = ["@buncho/storybook-preset"];
```
