import { Command, Option } from "clipanion";

import { execute } from "../utils/execute";

class BuildCommand extends Command {
  static override readonly paths = [["build"]];

  readonly args = Option.Proxy();

  async execute() {
    await execute(require.resolve("../../bin/webpack-cli.js"), this.args);
  }
}

export { BuildCommand };
