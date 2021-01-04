import * as utils from "@buncho/utils";

export const production = process.env.NODE_ENV === "production";
export const useFastRefresh = process.env.FAST_REFRESH !== "false";

export const hasBabelConfig = utils.hasBabelConfig();
export const hasTsconfigPaths = utils.hasTsconfigPaths();
