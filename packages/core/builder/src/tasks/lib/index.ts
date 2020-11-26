import { createTasks } from "../../utils/createTasks";
import { build } from "./build";
import { clean } from "./clean";

const lib = createTasks({
  build,
  clean,
});

export { lib };
