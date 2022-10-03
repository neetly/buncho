import { Command, Option } from "clipanion";

import { execute } from "../utils/execute";

class StartCommand extends Command {
  static override readonly paths = [["start"]];

  readonly args = Option.Proxy();

  async execute() {
    await execute(require.resolve("../../bin/webpack-cli.js"), this.args);
  }
}

export { StartCommand };
