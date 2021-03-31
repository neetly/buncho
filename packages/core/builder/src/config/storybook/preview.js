try {
  module.exports = require(process.env.APP_STORYBOOK_CONFIG_DIR + "/preview");
} catch {
  module.exports = {};
}
