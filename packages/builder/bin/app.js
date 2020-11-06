#!/usr/bin/env node

require(".").tasks(["app", ...process.argv.slice(2)]);
