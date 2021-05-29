import path from "path";

import type { Task } from "../../types/Task";
import { execute } from "../../utils/execute";
import { getPackageBin } from "../../utils/getPackageBin";
import { removeDirectory } from "../../utils/removeDirectory";

const clean: Task = async () => {
  await execute({
    path: getPackageBin("typescript", "tsc"),
    args: ["--build", "--clean", path.resolve("./tsconfig.json")],
  });
  await removeDirectory(path.resolve("./lib"));
  await removeDirectory(path.resolve("./build"));
};

export { clean };
