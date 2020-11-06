import type { Task } from "../../types/Task";
import { execute } from "../../utils/execute";
import { getPackageBin } from "../../utils/getPackageBin";

import { getConfig } from "./utils/getConfig";

const build: Task = async () => {
  await execute({
    path: getPackageBin("webpack-cli"),
    args: ["--config", await getConfig()],
    env: {
      NODE_ENV: "production",
    },
  });
};

export { build };
