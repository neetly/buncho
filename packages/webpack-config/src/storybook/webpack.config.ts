import type { Configuration } from "webpack";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";

import { production, useFastRefresh } from "../shared/env";
import { createRules } from "../shared/createRules";

const config: Configuration = {
  resolve: {
    extensions: [".js", ".mjs", ".cjs", ".ts", ".tsx"],

    plugins: [new TsconfigPathsPlugin()],
  },

  module: {
    rules: createRules({
      customRules: [{ test: /\.ejs$/ }],
    }),
  },

  plugins:
    !production && useFastRefresh //
      ? [new ReactRefreshPlugin()]
      : [],
};

export default config;
