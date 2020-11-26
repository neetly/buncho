import { createTasks } from "../utils/createTasks";
import { app } from "./app";
import { lib } from "./lib";

const tasks = createTasks({
  app,
  lib,
});

export { tasks };
