module.exports = {
  extends: require.resolve("."),

  overrides: [
    {
      files: ["*.{ts,tsx,mts,cts}"],

      parserOptions: {
        EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true,
      },
    },
  ],
};
