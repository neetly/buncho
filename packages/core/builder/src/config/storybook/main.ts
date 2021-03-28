import "@buncho/dotenv";

import { createStorybookConfig } from "@buncho/webpack-config";
import path from "path";
import type { Configuration } from "webpack";

export const stories = [path.resolve("./src/**/*.stories.{ts,tsx}")];

export const webpackFinal = (defaultConfig: Configuration): Configuration => {
  // TODO: dotenv
  return createStorybookConfig(defaultConfig);
};
