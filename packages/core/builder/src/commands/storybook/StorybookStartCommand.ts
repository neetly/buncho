import { Command } from "clipanion";

import { env } from "../../env";
import * as paths from "../../paths";
import { execute } from "../../utils/execute";
import { getPackageBin } from "../../utils/getPackageBin";

class StorybookStartCommand extends Command {
  static paths = [["storybook", "start"]];

  async execute(): Promise<void> {
    await execute({
      path: getPackageBin("@storybook/react", "start-storybook"),
      args: [
        ["--config-dir", paths.storybookConfigDir],
        ["--host", env.STORYBOOK_HOST || "localhost"],
        ["--port", env.STORYBOOK_PORT || "9000"],
      ].flat(),
      env: {
        APP_STORYBOOK_CONFIG_DIR: paths.appStorybookConfigDir,
      },
    });
  }
}

export { StorybookStartCommand };
