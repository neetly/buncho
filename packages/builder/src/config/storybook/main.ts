import "@buncho/dotenv";

import { createStorybookConfig } from "@buncho/webpack-config";
import fs from "fs";
import path from "path";
import type { Configuration } from "webpack";

export const stories = [path.resolve("./src")];
export const staticDirs = fs.existsSync(path.resolve("./public"))
  ? [path.resolve("./public")]
  : [];

export const core = { builder: "webpack5" };
export const addons = ["@storybook/addon-essentials"];

export const features = {
  storyStoreV7: process.env.STORYBOOK_STORE_V7 === "true",
};

export const webpackFinal = (defaultConfig: Configuration): Configuration => {
  return createStorybookConfig(defaultConfig, {
    env: Object.fromEntries(
      Object.entries(process.env).filter(([key]) => {
        return key.startsWith("APP_");
      }),
    ),
  });
};
