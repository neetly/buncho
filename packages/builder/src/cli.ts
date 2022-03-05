import { Builtins, Cli } from "clipanion";

import { AppBuildCommand } from "./commands/app/AppBuildCommand";
import { AppCleanCommand } from "./commands/app/AppCleanCommand";
import { AppStartCommand } from "./commands/app/AppStartCommand";
import { LibBuildCommand } from "./commands/lib/LibBuildCommand";
import { LibCleanCommand } from "./commands/lib/LibCleanCommand";
import { StorybookBuildCommand } from "./commands/storybook/StorybookBuildCommand";
import { StorybookCleanCommand } from "./commands/storybook/StorybookCleanCommand";
import { StorybookStartCommand } from "./commands/storybook/StorybookStartCommand";

const cli = new Cli({
  binaryName: "buncho",
  binaryLabel: "Buncho",
  enableCapture: true,
});

cli.register(Builtins.HelpCommand);

cli.register(AppStartCommand);
cli.register(AppBuildCommand);
cli.register(AppCleanCommand);

cli.register(LibBuildCommand);
cli.register(LibCleanCommand);

cli.register(StorybookStartCommand);
cli.register(StorybookBuildCommand);
cli.register(StorybookCleanCommand);

export { cli };
