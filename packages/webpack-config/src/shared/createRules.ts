import type { RuleSetRule, RuleSetLoader } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import { production, useFastRefresh } from "./env";

const getCssLoaders = ({ extract }: { extract: boolean }): RuleSetLoader[] => {
  return [
    extract
      ? {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: !production,
          },
        }
      : {
          loader: require.resolve("style-loader"),
        },

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
                rootMode: "upward",
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
                rootMode: "upward",
                compact: true,
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
          use: [
            {
              loader: require.resolve("file-loader"),
              options: {
                name: "assets/[hash:8].[ext]",
              },
            },
          ],
        },
      ],
    },
  ];
};

export { createRules };
