import { Configuration, DefinePlugin } from "webpack";
import { merge } from "webpack-merge";

import config from "./webpack.config";

const createConfig = ({
  host,
  port,
  env = {},
}: {
  host?: string;
  port?: number;
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
    },
  });
};

export { createConfig };
