const path = require("path");
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

const root = path.resolve(".");

const env = process.env.NODE_ENV || "development";
const paths = [
  path.join(root, `.env.${env}.local`),
  env !== "test" && path.join(root, `.env.local`),
  path.join(root, `.env.${env}`),
  path.join(root, `.env`),
].filter(Boolean);

for (const path of paths) {
  dotenvExpand.expand(dotenv.config({ path }));
}
