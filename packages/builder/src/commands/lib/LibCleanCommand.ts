import { Command } from "clipanion";
import path from "path";

import { execute } from "../../utils/execute";
import { getPackageBin } from "../../utils/getPackageBin";
import { removeDirectory } from "../../utils/removeDirectory";

class LibCleanCommand extends Command {
  static override paths = [["lib", "clean"]];

  async execute() {
    await execute({
      path: getPackageBin("typescript", "tsc"),
      args: ["--build", "--clean", path.resolve("./tsconfig.json")],
    });
    await removeDirectory(path.resolve("./lib"));
  }
}

export { LibCleanCommand };
