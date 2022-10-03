import { Command, Option } from "clipanion";

import { execute } from "../utils/execute";

class CleanCommand extends Command {
  static override readonly paths = [["clean"]];

  readonly args = Option.Proxy();

  async execute() {
    await execute(require.resolve("../../bin/webpack-cli.js"), this.args);
  }
}

export { CleanCommand };
