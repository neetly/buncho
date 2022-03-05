try {
  require.resolve("../src/index.ts");
  require("./register");
} catch {} // eslint-disable-line no-empty

module.exports = require("@buncho/builder");
