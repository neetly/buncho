let useRegister = false;

try {
  require.resolve("../src/index.ts");
  useRegister = true;
} catch {} // eslint-disable-line no-empty

if (useRegister) {
  require("@buncho/register");
  module.exports = require("../src");
} else {
  module.exports = require("../lib");
}

process.on("unhandledRejection", (error) => {
  if (error) console.error(error);
  process.exit(-1);
});
