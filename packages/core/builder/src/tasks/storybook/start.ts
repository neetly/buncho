import type { Task } from "../../types/Task";
import { execute } from "../../utils/execute";
import { getPackageBin } from "../../utils/getPackageBin";
import * as paths from "../../paths";

const start: Task = async () => {
  await execute({
    path: getPackageBin("@storybook/react", "start-storybook"),
    args: ["--config-dir", paths.storybookConfigDir],
  });
};

export { start };
