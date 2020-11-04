import { execute } from "../utils/execute";

const build = async (): Promise<void> => {
  await execute({
    path: require.resolve("webpack-cli/bin/cli.js"),
    args: ["--config", require.resolve("../webpack.config")],
    env: {
      NODE_ENV: "production",
    },
  });
};

export { build };
