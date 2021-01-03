module.exports = {
  extends: require.resolve("."),

  overrides: [
    {
      files: ["*.{ts,tsx}"],

      parserOptions: {
        EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true,
      },
    },
  ],
};
