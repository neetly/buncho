# Buncho

[![CI](https://github.com/neetly/buncho/actions/workflows/ci.yml/badge.svg)](https://github.com/neetly/buncho/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/buncho)](https://www.npmjs.com/package/buncho)

```sh
yarn add --dev buncho
yarn buncho
```

## Storybook

```sh
yarn add --dev storybook @storybook/react-webpack5 @buncho/storybook-preset
```

```ts
export const framework = "@storybook/react-webpack5";
export const addons = ["@buncho/storybook-preset"];
```

```sh
yarn storybook dev
```
