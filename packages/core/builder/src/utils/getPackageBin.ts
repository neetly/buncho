import path from "path";

type Manifest = {
  bin?: string | Record<string, string>;
};

const getPackageBin = (
  name: string,
  bin: string = path.posix.basename(name),
): string => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const manifest = require(`${name}/package.json`) as Manifest;
  if (typeof manifest.bin === "string" && bin === path.posix.basename(name)) {
    return require.resolve(path.posix.join(name, manifest.bin));
  }
  if (typeof manifest.bin !== "string" && manifest.bin?.[bin]) {
    return require.resolve(path.posix.join(name, manifest.bin[bin]));
  }
  throw new Error(`Bin "${bin}" not found in package "${name}".`);
};

export { getPackageBin };
