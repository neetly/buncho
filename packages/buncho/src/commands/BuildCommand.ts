import path from "node:path";

import { Command, Option } from "clipanion";

import { tscBinary, webpackBinary } from "../binaries";
import { executeBinary } from "../utils/executeBinary";

class BuildCommand extends Command {
  static override readonly paths = [["build"]];

  private readonly args = Option.Proxy();

  async execute() {
    await executeBinary({
      path: tscBinary,
      args: ["--build", path.resolve(".")],
    });
    await executeBinary({
      path: webpackBinary,
      args: [
        "--config",
        require.resolve("../config/webpack.config"),
        ...this.args,
      ],
      env: {
        NODE_ENV: "production",
      },
    });
  }
}

export { BuildCommand };
