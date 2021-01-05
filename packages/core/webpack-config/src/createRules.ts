import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { RuleSetRule, RuleSetUseItem } from "webpack";

import { hasBabelConfig, production, useFastRefresh } from "./env";

const getCssLoaders = ({
  extract,
  use = [],
}: {
  extract: boolean;
  use?: RuleSetUseItem[];
}): RuleSetUseItem[] => {
  return [
    extract
      ? { loader: MiniCssExtractPlugin.loader }
      : { loader: require.resolve("style-loader") },

    {
      loader: require.resolve("css-loader"),
      options: {
        importLoaders: 1 + use.length,
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

    ...use,
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
          parser: {
            worker: [
              "...",
              "CSS.paintWorklet.addModule()",
              "CSS.layoutWorklet.addModule()",
              "CSS.animationWorklet.addModule()",
            ],
          },
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
          parser: {
            worker: [
              "...",
              "CSS.paintWorklet.addModule()",
              "CSS.layoutWorklet.addModule()",
              "CSS.animationWorklet.addModule()",
            ],
          },
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
          test: /\.css$/,
          use: getCssLoaders({ extract }),
        },

        {
          test: /\.scss$/,
          use: getCssLoaders({
            extract,
            use: [
              { loader: require.resolve("resolve-url-loader") },
              { loader: require.resolve("sass-loader") },
            ],
          }),
        },

        {
          test: /\.svg$/,
          issuer: /\.(ts|tsx)$/,
          dependency: { not: ["url"] },
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
