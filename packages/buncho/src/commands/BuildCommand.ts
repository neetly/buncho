import { Command, Option } from "clipanion";
import path from "path";

import { executeBinary } from "../utils/executeBinary";

class BuildCommand extends Command {
  static override readonly paths = [["build"]];

  private readonly args = Option.Proxy();

  async execute() {
    await executeBinary({
      path: require.resolve("../../bin/tsc"),
      args: ["--build", path.resolve(".")],
    });
    await executeBinary({
      path: require.resolve("../../bin/webpack-cli"),
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
