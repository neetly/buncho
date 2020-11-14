import * as babel from "@babel/core";
import * as tsconfigPaths from "tsconfig-paths";

export const production = process.env.NODE_ENV === "production";
export const useFastRefresh = process.env.FAST_REFRESH !== "false";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const hasBabelConfig = babel
  .loadPartialConfig({ rootMode: "upward-optional" })!
  .hasFilesystemConfig();
export const hasTsconfigPaths =
  tsconfigPaths.loadConfig().resultType === "success";
