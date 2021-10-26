const path = require("path");

// FIXME
const cwd = process.cwd();
process.chdir(path.dirname(__dirname));

require("@buncho/register");

process.chdir(cwd);
