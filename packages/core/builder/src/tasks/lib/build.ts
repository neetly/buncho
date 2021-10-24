import path from "path";

import { hasBabelConfig } from "../../env";
import type { Task } from "../../types/Task";
import { execute } from "../../utils/execute";
import { getPackageBin } from "../../utils/getPackageBin";

const build: Task = async () => {
  await execute({
    path: getPackageBin("@babel/cli", "babel"),
    args: [
      ["--root-mode", "upward-optional"],
      ["--extensions", [".js", ".mjs", ".cjs", ".ts", ".tsx"].join(",")],
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
};

export { build };
