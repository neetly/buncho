export const isProduction = process.env.NODE_ENV === "production";
export const isDevServer = Boolean(process.env.WEBPACK_SERVE);
