import { env } from "../../env";
import * as paths from "../../paths";
import type { Task } from "../../types/Task";
import { execute } from "../../utils/execute";
import { getPackageBin } from "../../utils/getPackageBin";

const start: Task = async () => {
  await execute({
    path: getPackageBin("webpack-cli"),
    args: [
      "serve",
      ["--config", paths.webpackConfig],
      ["--host", env.HOST || "localhost"],
      ["--port", env.PORT || "3000"],
    ].flat(),
    env: {
      NODE_ENV: "development",
    },
  });
};

export { start };
