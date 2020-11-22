import "@buncho/dotenv";

import type { Configuration } from "webpack";
import type { ProxyConfigMap, ProxyConfigArray } from "webpack-dev-server";
import { createConfig } from "@buncho/webpack-config";
import { cosmiconfig } from "cosmiconfig";

const explorer = cosmiconfig("proxy");

const config = async (): Promise<Configuration> => {
  return createConfig({
    host: process.env.HOST || "localhost",
    port: Number(process.env.PORT || 3000),
    proxy: (await explorer.search())?.config as
      | ProxyConfigMap
      | ProxyConfigArray,
    env: Object.fromEntries(
      Object.entries(process.env).filter(([key]) => {
        return key.startsWith("APP_");
      }),
    ),
  });
};

export default config;
