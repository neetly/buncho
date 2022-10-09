import { Command } from "clipanion";
import path from "path";

import { executeBinary } from "../utils/executeBinary";
import { removeDirectory } from "../utils/removeDirectory";

class CleanCommand extends Command {
  static override readonly paths = [["clean"]];

  async execute() {
    await executeBinary({
      path: require.resolve("../../bin/tsc"),
      args: ["--build", "--clean", path.resolve(".")],
    });
    await removeDirectory(path.resolve("./lib"));
    await removeDirectory(path.resolve("./build"));
  }
}

export { CleanCommand };
