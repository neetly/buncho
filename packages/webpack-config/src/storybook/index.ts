import type { Configuration } from "webpack";
import {
  CustomizeRule,
  mergeWithCustomize,
  customizeArray,
} from "webpack-merge";

import config from "./webpack.config";

const mergeConfig = mergeWithCustomize({
  customizeArray: customizeArray({
    "resolve.extensions": CustomizeRule.Replace,
    "module.rules": CustomizeRule.Replace,
  }),
});

const applyConfig = (defaultConfig: Configuration): Configuration => {
  return mergeConfig(defaultConfig, config);
};

export { config, applyConfig };
