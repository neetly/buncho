import { Builtins, Cli } from "clipanion";

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-member-access
const version = require("buncho/package.json").version as string;

const cli = new Cli({
  binaryName: "buncho",
  binaryVersion: version,
  enableCapture: true,
});

cli.register(Builtins.VersionCommand);
cli.register(Builtins.HelpCommand);

export { cli };
