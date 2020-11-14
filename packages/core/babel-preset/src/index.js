const production = process.env.NODE_ENV === "production";

module.exports = (api) => {
  const web = api.caller((caller) => caller && caller.target === "web");
  const targets = web ? {} : { node: "12" };

  return {
    overrides: [
      {
        test: /\.(ts|tsx)$/,
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
