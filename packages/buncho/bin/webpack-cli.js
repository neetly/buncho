#!/usr/bin/env node

const WebpackCLI = require("webpack-cli");

const cli = new WebpackCLI();
cli.run(process.argv).catch((error) => {
  cli.logger.error(error);
  process.exit(2);
});
