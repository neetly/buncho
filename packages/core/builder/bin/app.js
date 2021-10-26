#!/usr/bin/env node

const { Cli } = require("clipanion");

require(".").cli.runExit(["app", ...process.argv.slice(2)], Cli.defaultContext);
