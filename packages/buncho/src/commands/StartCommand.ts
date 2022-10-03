import { Command, Option } from "clipanion";
import path from "path";

import { executeBinary } from "../utils/executeBinary";

class StartCommand extends Command {
  static override readonly paths = [["start"]];

  readonly args = Option.Proxy();

  async execute() {
    await executeBinary({
      path: require.resolve("../../bin/tsc"),
      args: ["--build", path.resolve(".")],
    });
    await executeBinary({
      path: require.resolve("../../bin/webpack-cli.js"),
      args: [
        "serve",
        "--config",
        require.resolve("../config/webpack.config"),
        ...this.args,
      ],
    });
  }
}

export { StartCommand };
