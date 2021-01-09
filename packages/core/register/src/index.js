const utils = require("@buncho/utils");

const hasBabelConfig = utils.hasBabelConfig();
const hasTsconfigPaths = utils.hasTsconfigPaths();

require("@babel/register")({
  rootMode: "upward-optional",
  extensions: [".ts", ".tsx"],
  ignore: [],
  presets: hasBabelConfig ? [] : [require.resolve("@buncho/babel-preset")],
});

require("tsconfig-paths").register({
  // FIXME: https://github.com/dividab/tsconfig-paths/issues/143
  baseUrl: ".",
  paths: utils.getPaths(),
  addMatchAll: false,
});

if (hasTsconfigPaths) {
  require("tsconfig-paths/register");
}
