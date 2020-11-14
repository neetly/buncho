#!/usr/bin/env node

require(".").tasks(["storybook", ...process.argv.slice(2)]);
