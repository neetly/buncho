import { Command, Option } from "clipanion";

import { env } from "../../env";
import * as paths from "../../paths";
import { execute } from "../../utils/execute";
import { getPackageBin } from "../../utils/getPackageBin";

class AppBuildCommand extends Command {
  static paths = [["app", "build"]];

  args = Option.Proxy();

  async execute(): Promise<void> {
    await execute({
      path: getPackageBin("webpack-cli"),
      args: ["build", ["--config", paths.webpackConfig], this.args].flat(),
      env: {
        NODE_ENV: "production",
        FAST_REFRESH: env.FAST_REFRESH,
      },
    });
  }
}

export { AppBuildCommand };
