import { promises as fs } from "fs";
import path from "path";

import type { Task } from "../../types/Task";

const clean: Task = async () => {
  await fs.rmdir(path.resolve("./storybook-static"), { recursive: true });
};

export { clean };
