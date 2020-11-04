import path from "path";

import { execute } from "../utils/execute";

const storybook = async (): Promise<void> => {
  await execute({
    path: require.resolve("@storybook/react/bin/index.js"),
    args: ["--config-dir", path.dirname(require.resolve("../storybook/main"))],
  });
};

export { storybook };
