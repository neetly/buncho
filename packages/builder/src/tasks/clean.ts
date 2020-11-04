import path from "path";
import { promises as fs } from "fs";

const clean = async (): Promise<void> => {
  await fs.rmdir(path.resolve("./build"), { recursive: true });
};

export { clean };
