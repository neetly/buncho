import "@buncho/dotenv";

import { start } from "./tasks/start";
import { build } from "./tasks/build";
import { clean } from "./tasks/clean";

const main = async (): Promise<void> => {
  const task = process.argv[2];
  switch (task) {
    case "start":
      await start();
      break;
    case "build":
      await build();
      break;
    case "clean":
      await clean();
      break;
  }
};

void main();
