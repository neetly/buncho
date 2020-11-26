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
      ["--extensions", [".ts", ".tsx"].join()],
      ["--copy-files"],
      hasBabelConfig
        ? []
        : ["--presets", require.resolve("@buncho/babel-preset")],
      [path.resolve("./src"), "--out-dir", path.resolve("./lib")],
    ].flat(),
  });
  await execute({
    path: getPackageBin("typescript", "tsc"),
    args: ["--build", path.resolve("./tsconfig.json")],
  });
};

export { build };
