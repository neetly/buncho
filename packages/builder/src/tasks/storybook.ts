import path from "path";
import { promises as fs } from "fs";

import { execute } from "../utils/execute";

const getConfigDir = async () => {
  try {
    await fs.access(path.resolve("./.storybook"));
    return path.resolve("./.storybook");
  } catch {
    return path.dirname(require.resolve("../storybook/main"));
  }
};

const storybook = async (): Promise<void> => {
  await execute({
    path: require.resolve("@storybook/react/bin/index.js"),
    args: ["--config-dir", await getConfigDir()],
  });
};

export { storybook };
