import { Configuration, DefinePlugin } from "webpack";
import type { ProxyConfigMap, ProxyConfigArray } from "webpack-dev-server";
import { merge } from "webpack-merge";

import config from "./webpack.config";

const createConfig = ({
  host,
  port,
  proxy,
  env = {},
}: {
  host?: string;
  port?: number;
  proxy?: ProxyConfigMap | ProxyConfigArray;
  env?: Record<string, string | undefined>;
} = {}): Configuration => {
  return merge(config, {
    plugins: [
      new DefinePlugin(
        Object.fromEntries(
          Object.entries(env).map(([key, value]) => {
            return [`process.env.${key}`, JSON.stringify(value)];
          }),
        ),
      ),
    ],

    devServer: {
      host,
      port,
      proxy,
    },
  });
};

export { createConfig };
