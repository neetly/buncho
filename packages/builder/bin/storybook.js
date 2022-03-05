#!/usr/bin/env node

const { Cli } = require("clipanion");

require(".").cli.runExit(
  ["storybook", ...process.argv.slice(2)],
  Cli.defaultContext,
);
