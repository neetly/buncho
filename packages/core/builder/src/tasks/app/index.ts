import { createTasks } from "../../utils/createTasks";

import { start } from "./start";
import { build } from "./build";
import { clean } from "./clean";

const app = createTasks({
  start,
  build,
  clean,
});

export { app };
