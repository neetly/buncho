import { createConfig } from "@buncho/webpack-config";
import type { Configuration } from "webpack";

const config: Configuration = {
  ...createConfig(),

  stats: process.env.CI ? "normal" : "minimal",
};

export default config;
