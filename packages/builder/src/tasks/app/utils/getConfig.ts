import path from "path";
import fs from "fs/promises";

const getConfig = async (): Promise<string> => {
  try {
    await fs.access(path.resolve("./webpack.config.js"));
    return path.resolve("./webpack.config.js");
  } catch {
    return require.resolve("../../../config/webpack.config");
  }
};

export { getConfig };
