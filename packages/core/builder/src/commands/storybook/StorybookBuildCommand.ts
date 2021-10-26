import { Command } from "clipanion";

import * as paths from "../../paths";
import { execute } from "../../utils/execute";
import { getPackageBin } from "../../utils/getPackageBin";

class StorybookBuildCommand extends Command {
  static paths = [["storybook", "build"]];

  async execute(): Promise<void> {
    await execute({
      path: getPackageBin("@storybook/react", "build-storybook"),
      args: ["--config-dir", paths.storybookConfigDir],
      env: {
        APP_STORYBOOK_CONFIG_DIR: paths.appStorybookConfigDir,
      },
    });
  }
}

export { StorybookBuildCommand };
