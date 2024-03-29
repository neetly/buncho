import * as path from "node:path";

import { createWebpackConfig } from "@buncho/webpack-config";
import CopyPlugin from "copy-webpack-plugin";
import HTMLPlugin from "html-webpack-plugin";
import { type Configuration, DefinePlugin } from "webpack";
import { merge } from "webpack-merge";

import { getConfig } from "../getConfig";
import { setupDotenv } from "../setupDotenv";

setupDotenv(process.env.NODE_ENV);

const isProduction = process.env.NODE_ENV === "production";
const isDevServer = Boolean(process.env.WEBPACK_SERVE);

export default async () => {
  const config = await getConfig();

  return merge(
    createWebpackConfig({
      mode: isProduction ? "production" : "development",
      isDevServer,
      useReactRefresh: config?.useReactRefresh,
    }),

    {
      name: "buncho",

      context: path.resolve("./src"),

      entry: {
        app: ".",
      },

      output: {
        path: path.resolve("./build"),
        publicPath: config?.publicPath ?? "/",
      },

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

        new HTMLPlugin({
          template: path.resolve("./public/index.html"),
        }),

        !isDevServer &&
          new CopyPlugin({
            patterns: [
              {
                from: path.resolve("./public"),
                globOptions: {
                  ignore: ["**/index.html"],
                },
                noErrorOnMissing: true,
              },
            ],
          }),
      ].filter(Boolean) as Configuration["plugins"],

      stats: process.stdout.isTTY ? "minimal" : "normal",

      devServer: {
        host: config?.devServer?.host ?? "localhost",
        port: config?.devServer?.port ?? 3000,
        proxy: config?.devServer?.proxy,
        static: path.resolve("./public"),
      },
    },
  );
};
