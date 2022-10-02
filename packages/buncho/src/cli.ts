import { Builtins, Cli } from "clipanion";

const cli = new Cli({
  binaryName: "buncho",
  binaryVersion: require("buncho/package.json").version,
  enableCapture: true,
});

cli.register(Builtins.VersionCommand);
cli.register(Builtins.HelpCommand);

export { cli };
