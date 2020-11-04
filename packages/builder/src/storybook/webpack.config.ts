import type { Configuration } from "webpack";

import { applyConfig } from "@buncho/webpack-config/storybook";

export default ({ config }: { config: Configuration }): Configuration => {
  return applyConfig(config);
};
