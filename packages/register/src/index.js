require("@babel/register")({
  rootMode: "upward",
  extensions: [".ts", ".tsx"],
  ignore: [],
});
require("tsconfig-paths/register");
