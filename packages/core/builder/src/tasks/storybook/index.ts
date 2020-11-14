import { createTasks } from "../../utils/createTasks";

import { start } from "./start";
import { build } from "./build";
import { clean } from "./clean";

const storybook = createTasks({
  start,
  build,
  clean,
});

export { storybook };
