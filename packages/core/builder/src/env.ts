import * as utils from "@buncho/utils";

// FIXME
const getEnv = () => {
  const env = process.env;
  try {
    require("@buncho/dotenv");
    return process.env;
  } finally {
    process.env = env;
  }
};

export const env = getEnv();
export const hasBabelConfig = utils.hasBabelConfig();
