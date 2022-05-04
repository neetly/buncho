import { Command, Option } from "clipanion";

import { env } from "../../env";
import * as paths from "../../paths";
import { execute } from "../../utils/execute";
import { getPackageBin } from "../../utils/getPackageBin";

class StorybookBuildCommand extends Command {
  static override paths = [["storybook", "build"]];

  args = Option.Proxy();

  async execute() {
    await execute({
      path: getPackageBin("@storybook/react", "build-storybook"),
      args: [["--config-dir", paths.storybookConfigDir], this.args].flat(),
      env: {
        FAST_REFRESH: env.FAST_REFRESH,
        STORYBOOK_STORE_V7: env.STORYBOOK_STORE_V7,
        APP_STORYBOOK_CONFIG_DIR: paths.appStorybookConfigDir,
      },
    });
  }
}

export { StorybookBuildCommand };
