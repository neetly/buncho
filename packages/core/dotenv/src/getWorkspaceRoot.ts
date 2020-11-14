import path from "path";
import fs from "fs";

const getWorkspaceRoot = (): string => {
  let root = path.resolve(".");

  while (root !== "/") {
    try {
      fs.accessSync(path.join(root, ".env"));
      return root;
    } catch {} // eslint-disable-line no-empty

    root = path.dirname(root);
  }

  return path.resolve(".");
};

export { getWorkspaceRoot };
