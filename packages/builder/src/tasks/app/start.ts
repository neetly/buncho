import type { Task } from "../../types/Task";
import { execute } from "../../utils/execute";
import { getPackageBin } from "../../utils/getPackageBin";

import { getConfig } from "./utils/getConfig";

const start: Task = async () => {
  await execute({
    path: getPackageBin("webpack-cli"),
    args: ["serve", "--config", await getConfig()],
    env: {
      NODE_ENV: "development",
    },
  });
};

export { start };
