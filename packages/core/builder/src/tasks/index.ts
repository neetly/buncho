import { createTasks } from "../utils/createTasks";
import { app } from "./app";
import { lib } from "./lib";
import { storybook } from "./storybook";

const tasks = createTasks({
  app,
  lib,
  storybook,
});

export { tasks };
