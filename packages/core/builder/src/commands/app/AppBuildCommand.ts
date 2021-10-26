import { Command } from "clipanion";

import * as paths from "../../paths";
import { execute } from "../../utils/execute";
import { getPackageBin } from "../../utils/getPackageBin";

class AppBuildCommand extends Command {
  static paths = [["app", "build"]];

  async execute(): Promise<void> {
    await execute({
      path: getPackageBin("webpack-cli"),
      args: ["--config", paths.webpackConfig],
      env: {
        NODE_ENV: "production",
      },
    });
  }
}

export { AppBuildCommand };
