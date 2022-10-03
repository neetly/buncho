import fs from "fs/promises";
import path from "path";

import type { Config } from "../types/Config";

const getConfig = async () => {
  try {
    const content = await fs.readFile(path.resolve("./buncho.json"), "utf-8");
    return JSON.parse(content) as Config;
  } catch {
    return null;
  }
};

export { getConfig };
