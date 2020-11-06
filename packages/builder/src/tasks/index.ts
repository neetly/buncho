import { createTasks } from "../utils/createTasks";

import { app } from "./app";
import { storybook } from "./storybook";

const tasks = createTasks({
  app,
  storybook,
});

export { tasks };
