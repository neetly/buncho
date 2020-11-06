let useRegister = false;

try {
  require.resolve("../src/index.ts");
  useRegister = true;
} catch {}

if (useRegister) {
  require("@buncho/register");
  module.exports = require("../src");
} else {
  module.exports = require("../lib");
}
