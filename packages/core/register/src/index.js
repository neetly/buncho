const utils = require("@buncho/utils");

const hasBabelConfig = utils.hasBabelConfig();
const hasTsconfigPaths = utils.hasTsconfigPaths();

require("@babel/register")({
  rootMode: "upward-optional",
  extensions: [".ts", ".tsx"],
  ignore: [],
  presets: hasBabelConfig ? [] : [require.resolve("@buncho/babel-preset")],
});

if (hasTsconfigPaths) {
  require("tsconfig-paths/register");
}
