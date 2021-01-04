const fs = require("fs");
const path = require("path");

exports.hasBabelConfig = () => {
  return require("@babel/core")
    .loadPartialConfig({ rootMode: "upward-optional" })
    .hasFilesystemConfig();
};

exports.hasTsconfigPaths = () => {
  return require("tsconfig-paths").loadConfig().resultType === "success";
};

exports.getReferencedProjects = () => {
  const ts = require("typescript");

  const resolveConfigFile = (fileName) => {
    return fs.statSync(fileName).isDirectory()
      ? path.join(fileName, "tsconfig.json")
      : fileName;
  };

  const getConfigFile = (fileName) => {
    const { config, error } = ts.readConfigFile(fileName, ts.sys.readFile);
    if (error) {
      throw new Error(
        ts.formatDiagnostic(error, {
          getCurrentDirectory: ts.sys.getCurrentDirectory,
          getCanonicalFileName: (fileName) => fileName,
          getNewLine: () => ts.sys.newLine,
        }),
      );
    }
    return config;
  };

  const configFile = resolveConfigFile(path.resolve("."));
  if (!fs.existsSync(configFile)) return [];

  const projects = new Map();

  const queue = [configFile];
  while (queue.length) {
    const configFile = queue.shift();
    if (!projects.has(configFile)) {
      const config = getConfigFile(configFile);
      projects.set(configFile, config);
      if (config.references && config.references.length) {
        for (const item of config.references) {
          queue.push(
            resolveConfigFile(
              path.resolve(path.dirname(configFile), item.path),
            ),
          );
        }
      }
    }
  }

  return projects;
};
