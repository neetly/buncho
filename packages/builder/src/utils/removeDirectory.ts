import { promises as fs } from "fs";

const removeDirectory = async (path: string): Promise<void> => {
  if (fs.rm) {
    await fs.rm(path, { recursive: true, force: true });
  } else {
    await fs.rmdir(path, { recursive: true });
  }
};

export { removeDirectory };
