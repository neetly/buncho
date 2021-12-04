const path = require("path");
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
  // https://github.com/dividab/tsconfig-paths/issues/101
  paths: Object.fromEntries(
    Object.entries(utils.getPaths()).map(([key, [value]]) => {
      return [key, [path.relative(path.resolve("."), value)]];
    }),
  ),
  addMatchAll: false,
});
