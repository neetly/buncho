import type { Configuration } from "webpack";

import { createStorybookConfig } from "@buncho/webpack-config";

export default ({ config }: { config: Configuration }): Configuration => {
  return createStorybookConfig(config);
};
