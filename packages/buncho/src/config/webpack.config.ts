import "../dotenv";

import { createWebpackConfig } from "@buncho/webpack-config";
import { DefinePlugin } from "webpack";
import { merge } from "webpack-merge";

import { getConfig } from "../utils/getConfig";

export default async () => {
  const config = await getConfig();

  return merge(
    createWebpackConfig({
      publicPath: config?.publicPath,
    }),

    {
      name: "buncho",

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

      devServer: {
        host: config?.devServer?.host ?? "localhost",
        port: config?.devServer?.port ?? 3000,
        proxy: config?.devServer?.proxy,
      },
    },
  );
};
