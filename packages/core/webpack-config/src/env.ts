import * as utils from "@buncho/utils";
import fs from "fs";
import path from "path";

import { EXTENSIONS } from "./constants";

const resolveEntry = (name: string): string | null => {
  for (const extension of EXTENSIONS) {
    const file = path.resolve(`./src/${name}.${extension}`);
    if (fs.existsSync(file)) return file;
  }
  return null;
};

export const production = process.env.NODE_ENV === "production";
export const useFastRefresh = process.env.FAST_REFRESH !== "false";

export const hasBabelConfig = utils.hasBabelConfig();
export const hasTsconfigPaths = utils.hasTsconfigPaths();

export const serviceWorkerEntry = resolveEntry("service-worker");
