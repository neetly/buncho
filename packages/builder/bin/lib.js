#!/usr/bin/env node

require(".").tasks(["lib", ...process.argv.slice(2)]);
