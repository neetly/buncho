import { atomize } from "@linaria/atomic";
import mimeTypes from "mime-types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { RuleSetRule, RuleSetUseItem } from "webpack";

import { hasBabelConfig, production, useFastRefresh } from "./env";

const createRules = ({
  extract = false,
  customRules = [],
}: {
  extract?: boolean;
  customRules?: readonly RuleSetRule[];
} = {}): RuleSetRule[] => {
  return [
    {
      oneOf: [
        {
          test: /\.(ts|tsx|mts|cts)$/,
          parser: {
            // https://github.com/webpack/webpack/issues/11543
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
            {
              loader: require.resolve("@linaria/webpack-loader"),
              options: {
                rules: [{ action: require.resolve("@linaria/shaker") }],
                atomize,
                babelOptions: {
                  rootMode: "upward-optional",
                  presets: hasBabelConfig
                    ? []
                    : [require.resolve("@buncho/babel-preset")],
                },
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
          issuer: /\.(ts|tsx|mts|cts)$/,
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

        {
          test: /\.svg$/,
          type: "asset",
          use: [{ loader: require.resolve("svgo-loader") }],
        },

        ...customRules,

        {
          exclude: /\.json$/,
          type: "asset",
          parser: {
            dataUrlCondition: (
              source: string | Buffer,
              { filename }: { filename: string },
            ) => {
              const mimeType = mimeTypes.lookup(filename);
              return (
                typeof mimeType === "string" &&
                Buffer.byteLength(source) <= 8192
              );
            },
          },
        },
      ],
    },
  ];
};

const getCssLoaders = ({
  extract,
  use = [],
}: {
  extract: boolean;
  use?: readonly RuleSetUseItem[];
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
            : "[1]__[local]__[hash:base64:8]",
          localIdentRegExp: /[/\\]([^/\\]+?)(?:\.module)?\.[^./\\]+$/,
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

export { createRules };
