#!/usr/bin/env node

const { Cli } = require("clipanion");

require(".").cli.runExit(["lib", ...process.argv.slice(2)], Cli.defaultContext);
