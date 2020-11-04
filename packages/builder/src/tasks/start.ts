import { execute } from "../utils/execute";

const start = async (): Promise<void> => {
  await execute({
    path: require.resolve("webpack-cli/bin/cli.js"),
    args: ["serve", "--config", require.resolve("../webpack.config")],
    env: {
      NODE_ENV: "development",
    },
  });
};

export { start };
