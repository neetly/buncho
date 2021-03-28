import { createTasks } from "../../utils/createTasks";
import { build } from "./build";
import { clean } from "./clean";
import { start } from "./start";

const storybook = createTasks({
  start,
  build,
  clean,
});

export { storybook };
