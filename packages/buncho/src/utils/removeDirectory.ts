import * as fs from "node:fs/promises";

const removeDirectory = async (path: string) => {
  await fs.rm(path, { recursive: true, force: true });
};

export { removeDirectory };
