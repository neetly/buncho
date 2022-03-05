const production = process.env.NODE_ENV === "production";

module.exports = (api) => {
  const web = api.caller((caller) => caller && caller.target === "web");
  const targets = web ? {} : { node: "12" };

  return {
    overrides: [
      {
        test: /\.(ts|tsx|mts|cts)$/,
        presets: [
          [
            require.resolve("@babel/preset-env"),
            { targets, shippedProposals: true, bugfixes: true },
          ],
          [
            require.resolve("@babel/preset-react"),
            { runtime: "automatic", development: !production },
          ],
          [
            require.resolve("@babel/preset-typescript"),
            { allowDeclareFields: true, onlyRemoveTypeImports: true },
          ],
        ],
        plugins: [
          require.resolve("babel-plugin-macros"),
          require.resolve("babel-plugin-transform-typescript-metadata"),
          [
            require.resolve("@babel/plugin-proposal-decorators"),
            { version: "legacy" },
          ],
        ],
      },

      {
        test: /\.(js|mjs|cjs)$/,
        presets: [
          [
            require.resolve("@babel/preset-env"),
            { targets, shippedProposals: true, bugfixes: true },
          ],
        ],
      },

      {
        test: /node_modules/,
        compact: true,
      },
    ],
  };
};
