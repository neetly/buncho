const utils = require("@buncho/utils");

const hasBabelConfig = utils.hasBabelConfig();

require("@babel/register")({
  rootMode: "upward-optional",
  extensions: [".ts", ".tsx", ".mts", ".cts"],
  ignore: [],
  presets: hasBabelConfig ? [] : [require.resolve("@buncho/babel-preset")],
});

require("tsconfig-paths").register({
  // https://github.com/dividab/tsconfig-paths/issues/143
  baseUrl: ".",
  paths: utils.getPaths(),
  addMatchAll: false,
});
