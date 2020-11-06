import path from "path";
import { promises as fs } from "fs";

import type { Task } from "../../types/Task";
import { execute } from "../../utils/execute";
import { getPackageBin } from "../../utils/getPackageBin";

const clean: Task = async () => {
  await fs.rmdir(path.resolve("./lib"), { recursive: true });
  await execute({
    path: getPackageBin("typescript", "tsc"),
    args: ["--build", "--clean", path.resolve("./tsconfig.json")],
  });
};

export { clean };
