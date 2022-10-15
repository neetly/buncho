import mimeTypes from "mime-types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { RuleSetRule, RuleSetUseItem } from "webpack";

import { EXTENSIONS } from "./constants";
import { isDevServer, isProduction } from "./env";
import { getRegExpForExtensions } from "./utils/getRegExpForExtensions";

const createRules = ({
  extractCss = false,
}: {
  extractCss?: boolean;
} = {}): RuleSetRule[] => {
  return [
    {
      oneOf: [
        {
          test: getRegExpForExtensions(EXTENSIONS),
          use: [
            {
              loader: require.resolve("babel-loader"),
              options: {
                configFile: false,
                presets: [require.resolve("@neetly/babel-preset/react")],
                plugins: isDevServer
                  ? [require.resolve("react-refresh/babel")]
                  : [],
                cacheDirectory: true,
              },
            },
          ],
        },

        {
          test: getRegExpForExtensions([".css"]),
          exclude: getRegExpForExtensions([".module.css"]),
          use: getCssLoaders({
            extract: extractCss,
            modules: { mode: "icss" },
          }),
        },

        {
          test: getRegExpForExtensions([".module.css"]),
          use: getCssLoaders({
            extract: extractCss,
            modules: { mode: "pure" },
          }),
        },

        {
          test: getRegExpForExtensions([".scss"]),
          exclude: getRegExpForExtensions([".module.scss"]),
          use: getCssLoaders({
            extract: extractCss,
            modules: { mode: "icss" },
            use: [
              { loader: require.resolve("resolve-url-loader") },
              { loader: require.resolve("sass-loader") },
            ],
          }),
        },

        {
          test: getRegExpForExtensions([".module.scss"]),
          use: getCssLoaders({
            extract: extractCss,
            modules: { mode: "pure" },
            use: [
              { loader: require.resolve("resolve-url-loader") },
              { loader: require.resolve("sass-loader") },
            ],
          }),
        },

        {
          dependency: ["url"],
          type: "asset",
          parser: {
            dataUrlCondition: (
              source: string | Buffer,
              { filename }: { filename: string },
            ) => {
              const mimeType = mimeTypes.lookup(filename);
              return Boolean(mimeType) && Buffer.byteLength(source) <= 8192;
            },
          },
        },
      ],
    },
  ];
};

const getCssLoaders = ({
  extract = false,
  modules = { auto: true, mode: "pure" },
  use = [],
}: {
  extract?: boolean;
  modules?: { auto?: boolean; mode?: "pure" | "icss" };
  use?: readonly RuleSetUseItem[];
} = {}): RuleSetUseItem[] => {
  return [
    extract
      ? { loader: MiniCssExtractPlugin.loader }
      : { loader: require.resolve("style-loader") },

    {
      loader: require.resolve("css-loader"),
      options: {
        importLoaders: 1 + use.length,
        modules: {
          ...modules,
          localIdentName: isProduction
            ? "[hash:base64]"
            : "[1]__[local]__[hash:base64:8]",
          localIdentRegExp: /([^/]+)\.module\.\w+$/,
        },
      },
    },

    {
      loader: require.resolve("postcss-loader"),
      options: {
        postcssOptions: {
          config: false,
          plugins: [require.resolve("autoprefixer")],
        },
      },
    },

    ...use,
  ];
};

export { createRules };
