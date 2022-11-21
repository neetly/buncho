import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { RuleSetRule, RuleSetUseItem } from "webpack";

const createRules = ({
  mode,
  isDevServer,
  useReactRefresh,
}: {
  mode: "production" | "development";
  isDevServer: boolean;
  useReactRefresh: boolean;
}): RuleSetRule[] => {
  return [
    {
      oneOf: [
        {
          test: /\.(js|mjs|cjs|ts|tsx|mts|cts)$/,
          use: [
            {
              loader: require.resolve("babel-loader"),
              options: {
                configFile: false,
                presets: [require.resolve("@neetly/babel-preset/react")],
                plugins:
                  isDevServer && useReactRefresh
                    ? [require.resolve("react-refresh/babel")]
                    : [],
                cacheDirectory: true,
              },
            },
          ],
        },

        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: getCssLoaders({
            mode,
            modules: { mode: "icss" },
          }),
        },

        {
          test: /\.module\.css$/,
          use: getCssLoaders({
            mode,
            modules: { mode: "pure" },
          }),
        },

        {
          test: /\.scss$/,
          exclude: /\.module\.scss$/,
          use: getCssLoaders({
            mode,
            modules: { mode: "icss" },
            use: [
              { loader: require.resolve("resolve-url-loader") },
              { loader: require.resolve("sass-loader") },
            ],
          }),
        },

        {
          test: /\.module\.scss$/,
          use: getCssLoaders({
            mode,
            modules: { mode: "pure" },
            use: [
              { loader: require.resolve("resolve-url-loader") },
              { loader: require.resolve("sass-loader") },
            ],
          }),
        },
      ],
    },

    {
      dependency: ["url"],
      type: "asset",
    },
  ];
};

const getCssLoaders = ({
  mode,
  modules,
  use = [],
}: {
  mode: "production" | "development";
  modules: { mode: "pure" | "icss" };
  use?: readonly RuleSetUseItem[];
}): RuleSetUseItem[] => {
  const isProduction = mode === "production";

  return [
    {
      loader: MiniCssExtractPlugin.loader,
    },

    {
      loader: require.resolve("css-loader"),
      options: {
        importLoaders: 1 + use.length,
        modules: {
          ...modules,
          localIdentName: isProduction
            ? "[hash:base64]"
            : "[1]__[local]__[hash:base64:8]",
          localIdentRegExp: /([^/]+)\.module\.[^/.]+$/,

          // #region futureDefaults
          localIdentHashFunction: "xxhash64",
          localIdentHashDigestLength: 16,
          // #endregion
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
