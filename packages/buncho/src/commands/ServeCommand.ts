import path from "node:path";

import { Command, Option } from "clipanion";

import { tscBinary, webpackBinary } from "../binaries";
import { executeBinary } from "../utils/executeBinary";

class ServeCommand extends Command {
  static override readonly paths = [Command.Default, ["serve"]];

  private readonly args = Option.Proxy();

  async execute() {
    await executeBinary({
      path: tscBinary,
      args: ["--build", path.resolve(".")],
    }).catch(() => {}); // eslint-disable-line @typescript-eslint/no-empty-function
    await executeBinary({
      path: webpackBinary,
      args: [
        "serve",
        "--config",
        require.resolve("../config/webpack.config"),
        ...this.args,
      ],
      env: {
        NODE_ENV: "development",
      },
    });
  }
}

export { ServeCommand };
