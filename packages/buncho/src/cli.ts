import { Builtins, Cli } from "clipanion";

import { BuildCommand } from "./commands/BuildCommand";
import { CleanCommand } from "./commands/CleanCommand";
import { LibraryBuildCommand } from "./commands/LibraryBuildCommand";
import { LibraryCleanCommand } from "./commands/LibraryCleanCommand";
import { StartCommand } from "./commands/StartCommand";

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-member-access
const version = require("buncho/package.json").version as string;

const cli = new Cli({
  binaryName: "buncho",
  binaryVersion: version,
  enableCapture: true,
});

cli.register(Builtins.VersionCommand);
cli.register(Builtins.HelpCommand);

cli.register(StartCommand);
cli.register(BuildCommand);
cli.register(CleanCommand);

cli.register(LibraryBuildCommand);
cli.register(LibraryCleanCommand);

export { cli };
