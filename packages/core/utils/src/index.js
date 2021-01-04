exports.hasBabelConfig = () => {
  return require("@babel/core")
    .loadPartialConfig({ rootMode: "upward-optional" })
    .hasFilesystemConfig();
};

exports.hasTsconfigPaths = () => {
  return require("tsconfig-paths").loadConfig().resultType === "success";
};
