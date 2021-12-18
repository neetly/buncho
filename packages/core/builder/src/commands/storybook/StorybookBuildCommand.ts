import { Command, Option } from "clipanion";

import { env } from "../../env";
import * as paths from "../../paths";
import { execute } from "../../utils/execute";
import { getPackageBin } from "../../utils/getPackageBin";

class StorybookBuildCommand extends Command {
  static paths = [["storybook", "build"]];

  args = Option.Proxy();

  async execute(): Promise<void> {
    await execute({
      path: getPackageBin("@storybook/react", "build-storybook"),
      args: [["--config-dir", paths.storybookConfigDir], this.args].flat(),
      env: {
        STORYBOOK_STORE_V7: env.STORYBOOK_STORE_V7,
        APP_STORYBOOK_CONFIG_DIR: paths.appStorybookConfigDir,
      },
    });
  }
}

export { StorybookBuildCommand };
