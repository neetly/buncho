import * as babel from "@babel/core";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const hasBabelConfig = babel
  .loadPartialConfig({ rootMode: "upward-optional" })!
  .hasFilesystemConfig();
