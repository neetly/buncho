const babel = require("@babel/core");
const tsconfigPaths = require("tsconfig-paths");

const hasBabelConfig = babel
  .loadPartialConfig({ rootMode: "upward-optional" })
  .hasFilesystemConfig();
const hasTsconfigPaths = tsconfigPaths.loadConfig().resultType === "success";

require("@babel/register")({
  rootMode: "upward-optional",
  extensions: [".ts", ".tsx"],
  ignore: [],
  presets: hasBabelConfig ? [] : [require.resolve("@buncho/babel-preset")],
});

if (hasTsconfigPaths) {
  require("tsconfig-paths/register");
}
