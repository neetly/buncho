require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  overrides: [
    {
      files: ["*.{ts,tsx}"],

      parser: require.resolve("@typescript-eslint/parser"),
      parserOptions: {
        project: ["**/tsconfig.json"],
        projectFolderIgnoreList: ["**/node_modules/**"],
      },

      plugins: [
        "@typescript-eslint",
        "react",
        "react-hooks",
        "jsx-a11y",
        "simple-import-sort",
      ],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        require.resolve("eslint-config-prettier"),
      ],

      rules: {
        eqeqeq: "error",
        "react/jsx-key": "error",
        "simple-import-sort/imports": "warn",
        "simple-import-sort/exports": "warn",
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
