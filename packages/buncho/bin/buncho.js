#!/usr/bin/env node

const { Cli } = require("clipanion");

require("buncho").cli.runExit(process.argv.slice(2), Cli.defaultContext);
