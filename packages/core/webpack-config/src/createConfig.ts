import { Configuration, DefinePlugin } from "webpack";
import type { ProxyConfigArray, ProxyConfigMap } from "webpack-dev-server";
import { merge } from "webpack-merge";

import config from "./webpack.config";

const createConfig = ({
  env = {},
  proxy,
}: {
  env?: Record<string, string | undefined>;
  proxy?: ProxyConfigMap | ProxyConfigArray;
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
      proxy,
    },
  });
};

export { createConfig };
