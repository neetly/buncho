import path from "path";

export const webpackConfig = require.resolve("./config/webpack.config");
export const storybookConfigDir = path.dirname(
  require.resolve("./config/storybook/main"),
);
export const appStorybookConfigDir = path.resolve("./.storybook");
