import path from "node:path";

import { Command } from "clipanion";

import { tscBinary } from "../binaries";
import { executeBinary } from "../utils/executeBinary";
import { removeDirectory } from "../utils/removeDirectory";

class LibraryCleanCommand extends Command {
  static override readonly paths = [["library", "clean"]];

  async execute() {
    await executeBinary({
      path: tscBinary,
      args: ["--build", "--clean", path.resolve(".")],
    });
    await removeDirectory(path.resolve("./lib"));
  }
}

export { LibraryCleanCommand };
