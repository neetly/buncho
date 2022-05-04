import { fork } from "child_process";

const execute = ({
  path,
  args,
  env = {},
}: {
  path: string;
  args: string[];
  env?: Record<string, string | undefined>;
}) => {
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
  });
};

export { execute };
