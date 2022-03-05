const fs = require("fs");
const path = require("path");

exports.hasBabelConfig = () => {
  return require("@babel/core")
    .loadPartialConfig({ rootMode: "upward-optional" })
    .hasFilesystemConfig();
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
  if (!fs.existsSync(configFile)) return {};

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

  return Object.fromEntries(projects);
};

exports.getPaths = () => {
  const projects = exports.getReferencedProjects();
  const paths = new Map();

  for (const [configFile, config] of Object.entries(projects)) {
    const projectDir = path.dirname(configFile);
    const rootDir = path.resolve(
      projectDir,
      (config.compilerOptions || {}).rootDir || ".",
    );
    const outDir = path.resolve(
      projectDir,
      (config.compilerOptions || {}).outDir || ".",
    );

    if (fs.existsSync(path.join(projectDir, "package.json"))) {
      const manifest = require(path.join(projectDir, "package.json"));

      let exports;
      if (manifest.exports) {
        exports =
          typeof manifest.exports === "string"
            ? { ".": manifest.exports }
            : manifest.exports;
      } else {
        const patterns = [path.posix.relative(projectDir, outDir), "."];
        exports = manifest.main ? { ".": manifest.main } : {};
        for (const pattern of patterns) {
          exports["./" + path.posix.join(pattern, "*")] =
            "./" + path.posix.join(pattern, "*.js");
        }
      }

      for (const [key, value] of Object.entries(exports)) {
        // TODO: Implement conditional exports.
        if (typeof value !== "string") continue;
        paths.set(path.posix.join(manifest.name, key), [
          path
            .resolve(projectDir, value)
            .replace(outDir, rootDir)
            .replace(/\.js$/, ""),
        ]);
      }
    }
  }

  return Object.fromEntries(paths);
};

exports.getWebpackAlias = () => {
  const paths = exports.getPaths();
  const aliases = new Map();

  for (const [key, [value]] of Object.entries(paths)) {
    aliases.set(
      key.endsWith("*") ? key.slice(0, -2) : key + "$",
      value.endsWith("*") ? value.slice(0, -2) : value,
    );
  }

  return Object.fromEntries(aliases);
};
