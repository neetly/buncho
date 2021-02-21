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
        "simple-import-sort",
        "react-hooks",
        "jsx-a11y",
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
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
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
