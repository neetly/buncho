import { Command, Option } from "clipanion";

import { env } from "../../env";
import * as paths from "../../paths";
import { execute } from "../../utils/execute";
import { getPackageBin } from "../../utils/getPackageBin";

class AppStartCommand extends Command {
  static paths = [["app", "start"]];

  host = Option.String("--host");
  port = Option.String("--port");
  args = Option.Proxy();

  async execute(): Promise<void> {
    await execute({
      path: getPackageBin("webpack-cli"),
      args: [
        "serve",
        ["--config", paths.webpackConfig],
        ["--host", this.host || env.HOST || "localhost"],
        ["--port", this.port || env.PORT || "3000"],
        this.args,
      ].flat(),
      env: {
        NODE_ENV: "development",
        FAST_REFRESH: env.FAST_REFRESH,
      },
    });
  }
}

export { AppStartCommand };
