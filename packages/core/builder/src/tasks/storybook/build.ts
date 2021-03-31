import * as paths from "../../paths";
import type { Task } from "../../types/Task";
import { execute } from "../../utils/execute";
import { getPackageBin } from "../../utils/getPackageBin";

const build: Task = async () => {
  await execute({
    path: getPackageBin("@storybook/react", "build-storybook"),
    args: ["--config-dir", paths.storybookConfigDir],
    env: {
      APP_STORYBOOK_CONFIG_DIR: paths.appStorybookConfigDir,
    },
  });
};

export { build };
