import path from "path";
import fs from "fs/promises";

import type { Task } from "../../types/Task";
import { execute } from "../../utils/execute";
import { getPackageBin } from "../../utils/getPackageBin";

const clean: Task = async ([root = "."]) => {
  await fs.rmdir(path.resolve(root, "./lib"), { recursive: true });
  await execute({
    path: getPackageBin("typescript", "tsc"),
    args: ["--build", "--clean", path.resolve(root, "./tsconfig.json")],
  });
};

export { clean };
