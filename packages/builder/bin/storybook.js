#!/usr/bin/env node

require("../lib").tasks(["storybook", ...process.argv.slice(2)]);
