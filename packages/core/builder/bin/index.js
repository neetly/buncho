module.exports = require("../lib");

process.on("unhandledRejection", (error) => {
  if (error) console.error(error);
  process.exitCode = -1;
});
