import { createTasks } from "../../utils/createTasks";
import { build } from "./build";
import { clean } from "./clean";
import { start } from "./start";

const app = createTasks({
  start,
  build,
  clean,
});

export { app };
