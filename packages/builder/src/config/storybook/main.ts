import path from "path";
import type { Configuration } from "webpack";

import "@buncho/dotenv";
import { createStorybookConfig } from "@buncho/webpack-config";

export const stories = [path.resolve("./src/**/*.stories.{ts,tsx}")];

export const webpackFinal = (defaultConfig: Configuration): Configuration => {
  return createStorybookConfig(defaultConfig);
};
