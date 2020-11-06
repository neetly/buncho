import type { Task } from "../../types/Task";
import { execute } from "../../utils/execute";
import { getPackageBin } from "../../utils/getPackageBin";

import { getConfigDir } from "./utils/getConfigDir";

const start: Task = async () => {
  await execute({
    path: getPackageBin("@storybook/react", "start-storybook"),
    args: ["--config-dir", await getConfigDir()],
  });
};

export { start };
