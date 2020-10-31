import path from "path";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

import { getWorkspaceRoot } from "./getWorkspaceRoot";

const root = getWorkspaceRoot();

const env = process.env.NODE_ENV || "development";
const paths = [
  path.join(root, `.env.${env}.local`),
  env !== "test" && path.join(root, `.env.local`),
  path.join(root, `.env.${env}`),
  path.join(root, `.env`),
].filter(Boolean) as string[];

for (const path of paths) {
  dotenvExpand(dotenv.config({ path }));
}
