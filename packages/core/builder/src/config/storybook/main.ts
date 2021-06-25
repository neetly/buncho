import "@buncho/dotenv";

import { createStorybookConfig } from "@buncho/webpack-config";
import path from "path";
import type { Configuration } from "webpack";

export const stories = [path.resolve("./src/**/*.stories.{ts,tsx}")];

export const core = { builder: "webpack5" };
export const addons = ["@storybook/addon-essentials"];

export const webpackFinal = (defaultConfig: Configuration): Configuration => {
  return createStorybookConfig(defaultConfig, {
    env: Object.fromEntries(
      Object.entries(process.env).filter(([key]) => {
        return key.startsWith("APP_");
      }),
    ),
  });
};
