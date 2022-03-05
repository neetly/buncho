require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  overrides: [
    {
      files: ["*.{ts,tsx,mts,cts}"],

      parser: require.resolve("@typescript-eslint/parser"),
      parserOptions: {
        project: ["**/tsconfig.json"],
        projectFolderIgnoreList: ["**/node_modules/**"],
      },

      plugins: [
        "@typescript-eslint",
        "simple-import-sort",
        "react",
        "react-hooks",
        "jsx-a11y",
        "storybook",
      ],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:storybook/recommended",
        require.resolve("eslint-config-prettier"),
      ],

      rules: {
        eqeqeq: "error",
        "@typescript-eslint/no-duplicate-imports": "error",
        "@typescript-eslint/consistent-type-imports": "error",
        "@typescript-eslint/consistent-type-exports": "error",
        "simple-import-sort/imports": "warn",
        "simple-import-sort/exports": "warn",
        "react/jsx-key": "error",
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
