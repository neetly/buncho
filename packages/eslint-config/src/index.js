require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  overrides: [
    {
      files: ["*.{ts,tsx}"],

      parser: require.resolve("@typescript-eslint/parser"),
      parserOptions: {
        project: [
          "./tsconfig.json",
          "./packages/*/tsconfig.json",
          "./packages/*/types/tsconfig.json",
        ],
      },

      plugins: ["@typescript-eslint", "react-hooks", "jsx-a11y"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        require.resolve("eslint-config-prettier"),
        require.resolve("eslint-config-prettier/@typescript-eslint"),
      ],

      rules: {
        eqeqeq: "error",
      },
    },

    {
      files: ["*.{js,mjs,cjs}"],

      parser: require.resolve("@babel/eslint-parser"),
      parserOptions: {
        requireConfigFile: false,
      },

      extends: [
        "eslint:recommended",
        require.resolve("eslint-config-prettier"),
      ],

      rules: {
        "no-undef": "off",
        eqeqeq: "error",
      },
    },
  ],
};
