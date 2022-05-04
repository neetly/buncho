const utils = require("@buncho/utils");

const hasBabelConfig = utils.hasBabelConfig();

require("@babel/register")({
  rootMode: "upward-optional",
  extensions: [".ts", ".tsx", ".mts", ".cts"],
  ignore: [],
  presets: hasBabelConfig ? [] : [require.resolve("@buncho/babel-preset")],
});

require("tsconfig-paths").register({
  paths: utils.getPaths(),
  addMatchAll: false,
});
