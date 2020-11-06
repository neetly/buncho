import path from "path";
import fs from "fs/promises";

const getConfigDir = async (): Promise<string> => {
  try {
    await fs.access(path.resolve("./.storybook/main.js"));
    return path.resolve("./.storybook");
  } catch {
    return path.dirname(require.resolve("../../../config/storybook/main"));
  }
};

export { getConfigDir };
