import { getConfig, setupDotenv } from "buncho";
import { type Configuration, DefinePlugin } from "webpack";
import { merge } from "webpack-merge";

import { createStorybookWebpackConfig } from "./createStorybookWebpackConfig";

setupDotenv(process.env.NODE_ENV);

const isProduction = process.env.NODE_ENV === "production";
const isDevServer = !isProduction;

export const webpackFinal = async (webpackConfig: Configuration) => {
  const config = await getConfig();

  return merge(
    createStorybookWebpackConfig(webpackConfig, {
      mode: isProduction ? "production" : "development",
      isDevServer,
      useReactRefresh: config?.useReactRefresh,
    }),

    {
      plugins: [
        new DefinePlugin(
          Object.fromEntries(
            Object.entries(process.env)
              .filter(([key]) => key.startsWith("APP_"))
              .map(([key, value]) => [
                `process.env.${key}`,
                JSON.stringify(value),
              ]),
          ),
        ),
      ],

      stats: process.stdout.isTTY ? "minimal" : "normal",
    },
  );
};
