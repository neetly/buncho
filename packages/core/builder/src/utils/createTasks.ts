import type { Task } from "../types/Task";

const createTasks = (tasks: Record<string, Task>): Task => {
  return async ([task = "", ...args]) => {
    if (tasks[task]) {
      await tasks[task]!(args); // eslint-disable-line @typescript-eslint/no-non-null-assertion
    } else {
      throw new Error(`Task "${task}" not found.`);
    }
  };
};

export { createTasks };
