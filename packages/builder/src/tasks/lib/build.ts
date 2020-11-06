import path from "path";

import type { Task } from "../../types/Task";
import { execute } from "../../utils/execute";
import { getPackageBin } from "../../utils/getPackageBin";

const build: Task = async ([root = "."]) => {
  await execute({
    path: getPackageBin("@babel/cli", "babel"),
    args: [
      "--root-mode",
      "upward-optional",
      "--extensions",
      [".ts", ".tsx"].join(),
      "--copy-files",
      path.resolve(root, "./src"),
      "--out-dir",
      path.resolve(root, "./lib"),
    ],
  });
  await execute({
    path: getPackageBin("typescript", "tsc"),
    args: ["--build", path.resolve(root, "./tsconfig.json")],
  });
};

export { build };
