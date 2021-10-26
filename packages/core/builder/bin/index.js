try {
  require.resolve("../src/index.ts");
  require("@buncho/register");
} catch {} // eslint-disable-line no-empty

module.exports = require("@buncho/builder");
