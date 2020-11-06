import type { Task } from "../../types/Task";
import { execute } from "../../utils/execute";
import { getPackageBin } from "../../utils/getPackageBin";
import * as paths from "../../paths";

const start: Task = async () => {
  await execute({
    path: getPackageBin("webpack-cli"),
    args: ["serve", "--config", paths.webpackConfig],
    env: {
      NODE_ENV: "development",
    },
  });
};

export { start };
