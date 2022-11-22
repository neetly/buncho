import path from "node:path";

import { Command } from "clipanion";

import { babelBinary, tscBinary } from "../binaries";
import { executeBinary } from "../utils/executeBinary";

class LibraryBuildCommand extends Command {
  static override readonly paths = [["library", "build"]];

  async execute() {
    await executeBinary({
      path: tscBinary,
      args: ["--build", path.resolve(".")],
    });
    await executeBinary({
      path: babelBinary,
      args: [
        ["--config-file", require.resolve("../config/babel.config")],
        ["--extensions", ".js,.mjs,.cjs,.ts,.tsx,.mts,.cts"],
        ["--ignore", "**/*.d.ts,**/*.d.mts,**/*.d.cts"],
        ["--source-maps", "true"],
        ["--copy-files"],
        ["./src", "--out-dir", "./lib"],
      ].flat(),
    });
  }
}

export { LibraryBuildCommand };
