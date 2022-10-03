import mimeTypes from "mime-types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { RuleSetRule, RuleSetUseItem } from "webpack";

import { EXTENSIONS } from "./constants";
import { isDevServer, isProduction } from "./env";
import { getRegExpForExtensions } from "./utils/getRegExpForExtensions";

const createRules = (): RuleSetRule[] => {
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
          use: getCssLoaders(),
        },

        {
          test: getRegExpForExtensions([".scss"]),
          use: getCssLoaders({
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
  use = [],
}: {
  use?: readonly RuleSetUseItem[];
} = {}): RuleSetUseItem[] => {
  return [
    {
      loader: MiniCssExtractPlugin.loader,
    },

    {
      loader: require.resolve("css-loader"),
      options: {
        importLoaders: 1 + use.length,
        modules: {
          auto: true,
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
          plugins: [require.resolve("autoprefixer")],
        },
      },
    },

    ...use,
  ];
};

export { createRules };
