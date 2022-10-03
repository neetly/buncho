import { fork } from "child_process";

const execute = (
  path: string,
  args?: readonly string[],
  { env }: { env?: Readonly<Record<string, string>> } = {},
) => {
  return new Promise<void>((resolve, reject) => {
    const subprocess = fork(path, args, {
      stdio: "inherit",
      env: { ...process.env, ...env },
    });

    subprocess.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
    });

    subprocess.on("error", () => {
      reject();
    });
  });
};

export { execute };
