import * as babel from "@babel/core";
import * as tsconfigPaths from "tsconfig-paths";

export const production = process.env.NODE_ENV === "production";
export const useFastRefresh = process.env.FAST_REFRESH !== "false";
export const hasBabelConfig = Boolean(
  babel
    .loadPartialConfig({ rootMode: "upward-optional" })
    ?.hasFilesystemConfig(),
);
export const hasTsconfigPaths =
  tsconfigPaths.loadConfig().resultType === "success";
