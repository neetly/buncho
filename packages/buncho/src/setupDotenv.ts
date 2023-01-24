import * as path from "node:path";

import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

const setupDotenv = (env?: string) => {
  let dotenvFiles: string[];
  switch (env) {
    case "production":
    case "development":
      dotenvFiles = [`.env.${env}.local`, `.env.local`, `.env.${env}`, `.env`];
      break;
    case "test":
      dotenvFiles = [`.env.${env}.local`, `.env.${env}`, `.env`];
      break;
    default:
      dotenvFiles = [`.env.local`, `.env`];
      break;
  }

  for (const dotenvFile of dotenvFiles) {
    dotenvExpand.expand(
      dotenv.config({
        path: path.resolve(dotenvFile),
      }),
    );
  }
};

export { setupDotenv };
