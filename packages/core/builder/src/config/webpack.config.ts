import "@buncho/dotenv";

import { createConfig } from "@buncho/webpack-config";
import { cosmiconfig } from "cosmiconfig";
import type { Configuration } from "webpack";
import type { ProxyConfigArray, ProxyConfigMap } from "webpack-dev-server";

const explorer = cosmiconfig("proxy");

const config = async (): Promise<Configuration> => {
  return createConfig({
    env: Object.fromEntries(
      Object.entries(process.env).filter(([key]) => {
        return key.startsWith("APP_");
      }),
    ),
    proxy: (await explorer.search())?.config as
      | ProxyConfigMap
      | ProxyConfigArray
      | undefined,
  });
};

export default config;
