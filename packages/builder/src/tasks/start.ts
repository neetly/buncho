import { execute } from "../utils/execute";

const start = async (): Promise<void> => {
  await execute({
    path: require.resolve("webpack-cli/bin/cli.js"),
    args: ["--config", require.resolve("../webpack.config"), "serve"],
    env: {
      NODE_ENV: "development",
    },
  });
};

export { start };
