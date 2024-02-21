import { fork } from "node:child_process";

const executeBinary = async ({
  path,
  args,
  env,
}: {
  path: string;
  args?: readonly string[];
  env?: Record<string, string | undefined>;
}) => {
  await new Promise<void>((resolve, reject) => {
    const subprocess = fork(path, args, {
      stdio: "inherit",
      env: { ...process.env, ...env },
    });

    subprocess.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(subprocess);
      }
    });

    subprocess.on("error", () => {
      reject(subprocess);
    });
  });
};

export { executeBinary };
