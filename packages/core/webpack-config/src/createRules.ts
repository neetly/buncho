import type { RuleSetRule, RuleSetUseItem } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import { production, useFastRefresh, hasBabelConfig } from "./env";

const getCssLoaders = ({ extract }: { extract: boolean }): RuleSetUseItem[] => {
  return [
    extract
      ? { loader: MiniCssExtractPlugin.loader }
      : { loader: require.resolve("style-loader") },

    {
      loader: require.resolve("css-loader"),
      options: {
        importLoaders: 1,
        modules: {
          auto: true,
          localIdentName: production
            ? "[hash:base64]"
            : "[name]__[local]__[hash:base64:8]",
        },
      },
    },

    {
      loader: require.resolve("postcss-loader"),
      options: {
        postcssOptions: {
          plugins: [require("autoprefixer")],
        },
      },
    },
  ];
};

const createRules = ({
  extract = false,
  customRules = [],
}: {
  extract?: boolean;
  customRules?: RuleSetRule[];
} = {}): RuleSetRule[] => {
  return [
    {
      oneOf: [
        {
          test: /\.(ts|tsx)$/,
          use: [
            {
              loader: require.resolve("babel-loader"),
              options: {
                rootMode: "upward-optional",
                presets: hasBabelConfig
                  ? []
                  : [require.resolve("@buncho/babel-preset")],
                plugins:
                  !production && useFastRefresh
                    ? [require.resolve("react-refresh/babel")]
                    : [],
                cacheDirectory: true,
              },
            },
          ],
        },

        {
          test: /\.(js|mjs|cjs)$/,
          use: [
            {
              loader: require.resolve("babel-loader"),
              options: {
                rootMode: "upward-optional",
                presets: hasBabelConfig
                  ? []
                  : [require.resolve("@buncho/babel-preset")],
                cacheDirectory: true,
              },
            },
          ],
        },

        {
          test: /\.svg$/,
          issuer: /\.(ts|tsx)$/,
          use: [
            {
              loader: require.resolve("@svgr/webpack"),
              options: {
                svgProps: {
                  "aria-hidden": "{true}",
                },
              },
            },
          ],
        },

        {
          test: /\.css$/,
          use: getCssLoaders({ extract }),
        },

        {
          test: /\.scss$/,
          use: [
            ...getCssLoaders({ extract }),
            require.resolve("resolve-url-loader"),
            require.resolve("sass-loader"),
          ],
        },

        ...customRules,

        {
          exclude: /\.json$/,
          type: "asset/resource",
        },
      ],
    },
  ];
};

export { createRules };
