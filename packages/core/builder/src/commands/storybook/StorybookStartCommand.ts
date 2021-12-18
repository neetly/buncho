import { Command, Option } from "clipanion";

import { env } from "../../env";
import * as paths from "../../paths";
import { execute } from "../../utils/execute";
import { getPackageBin } from "../../utils/getPackageBin";

class StorybookStartCommand extends Command {
  static paths = [["storybook", "start"]];

  host = Option.String("--host");
  port = Option.String("--port");
  args = Option.Proxy();

  async execute(): Promise<void> {
    await execute({
      path: getPackageBin("@storybook/react", "start-storybook"),
      args: [
        ["--config-dir", paths.storybookConfigDir],
        ["--host", this.host || env.STORYBOOK_HOST || "localhost"],
        ["--port", this.port || env.STORYBOOK_PORT || "9000"],
        this.args,
      ].flat(),
      env: {
        FAST_REFRESH: env.FAST_REFRESH,
        STORYBOOK_STORE_V7: env.STORYBOOK_STORE_V7,
        APP_STORYBOOK_CONFIG_DIR: paths.appStorybookConfigDir,
      },
    });
  }
}

export { StorybookStartCommand };
