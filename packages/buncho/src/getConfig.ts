import * as fs from "node:fs/promises";
import * as path from "node:path";

import type { Config } from "./types/Config";

const getConfig = async () => {
  try {
    const content = await fs.readFile(path.resolve("./buncho.json"));
    return JSON.parse(content.toString()) as Config;
  } catch {
    return null;
  }
};

export { getConfig };
