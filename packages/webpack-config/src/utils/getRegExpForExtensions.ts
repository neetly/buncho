const getRegExpForExtensions = (extensions: readonly string[]) => {
  return new RegExp(
    `\\.(${extensions
      .map((extension) => extension.replace(/^\./, "").replace(/\./g, "\\."))
      .join("|")})$`,
  );
};

export { getRegExpForExtensions };
