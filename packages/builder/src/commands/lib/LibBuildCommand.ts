import { Command } from "clipanion";
import path from "path";

import { hasBabelConfig } from "../../env";
import { execute } from "../../utils/execute";
import { getPackageBin } from "../../utils/getPackageBin";

class LibBuildCommand extends Command {
  static override paths = [["lib", "build"]];

  async execute() {
    await execute({
      path: getPackageBin("@babel/cli", "babel"),
      args: [
        ["--root-mode", "upward-optional"],
        [
          "--extensions",
          [".js", ".mjs", ".cjs", ".ts", ".tsx", ".mts", ".cts"].join(","),
        ],
        ["--source-maps", "true"],
        ["--copy-files"],
        hasBabelConfig
          ? []
          : ["--presets", require.resolve("@buncho/babel-preset")],
        [path.resolve("./src"), "--out-dir", path.resolve("./lib")],
      ].flat(),
      env: {
        NODE_ENV: "production",
      },
    });
    await execute({
      path: getPackageBin("typescript", "tsc"),
      args: ["--build", path.resolve("./tsconfig.json")],
    });
  }
}

export { LibBuildCommand };
