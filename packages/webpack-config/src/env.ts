import * as babel from "@babel/core";

export const production = process.env.NODE_ENV === "production";
export const useFastRefresh = process.env.FAST_REFRESH !== "false";
export const hasBabelConfig = Boolean(
  babel
    .loadPartialConfig({ rootMode: "upward-optional" })
    ?.hasFilesystemConfig(),
);
