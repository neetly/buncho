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

const appConfigDir = process.env.APP_STORYBOOK_CONFIG_DIR;

export const previewHead = (head: string) => {
  if (appConfigDir) {
    const previewHeadFile = path.join(appConfigDir, "preview-head.html");
    if (fs.existsSync(previewHeadFile)) {
      return head + fs.readFileSync(previewHeadFile).toString();
    }
  }
  return head;
};

export const previewBody = (body: string) => {
  if (appConfigDir) {
    const previewBodyFile = path.join(appConfigDir, "preview-body.html");
    if (fs.existsSync(previewBodyFile)) {
      return body + fs.readFileSync(previewBodyFile).toString();
    }
  }
  return body;
};

export const webpackFinal = (defaultConfig: Configuration) => {
  return createStorybookConfig(defaultConfig, {
    env: Object.fromEntries(
      Object.entries(process.env).filter(([key]) => {
        return key.startsWith("APP_");
      }),
    ),
  });
};
