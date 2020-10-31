require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  overrides: [
    {
      files: ["*.ts", "*.tsx"],

      parser: require.resolve("@typescript-eslint/parser"),
      parserOptions: {
        project: ["./tsconfig.json", "./packages/*/tsconfig.json"],
      },

      plugins: ["@typescript-eslint", "react-hooks"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:react-hooks/recommended",
        require.resolve("eslint-config-prettier"),
        require.resolve("eslint-config-prettier/@typescript-eslint"),
      ],

      rules: {
        eqeqeq: "error",
      },
    },

    {
      files: ["*.js"],

      parser: require.resolve("@babel/eslint-parser"),
      parserOptions: {
        sourceType: "unambiguous",
      },
    },
  ],
};
