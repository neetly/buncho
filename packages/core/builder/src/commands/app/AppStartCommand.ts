import { Command } from "clipanion";

import { env } from "../../env";
import * as paths from "../../paths";
import { execute } from "../../utils/execute";
import { getPackageBin } from "../../utils/getPackageBin";

class AppStartCommand extends Command {
  static paths = [["app", "start"]];

  async execute(): Promise<void> {
    await execute({
      path: getPackageBin("webpack-cli"),
      args: [
        "serve",
        ["--config", paths.webpackConfig],
        ["--host", env.HOST || "localhost"],
        ["--port", env.PORT || "3000"],
      ].flat(),
      env: {
        NODE_ENV: "development",
      },
    });
  }
}

export { AppStartCommand };
