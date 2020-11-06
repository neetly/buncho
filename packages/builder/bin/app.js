#!/usr/bin/env node

require("../lib").tasks(["app", ...process.argv.slice(2)]);
