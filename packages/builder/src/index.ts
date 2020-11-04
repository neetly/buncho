import "@buncho/dotenv";

import { start } from "./tasks/start";
import { build } from "./tasks/build";

const main = async (): Promise<void> => {
  const task = process.argv[2];
  switch (task) {
    case "start":
      await start();
      break;
    case "build":
      await build();
      break;
  }
};

void main();
