/// <reference lib="DOM" />
/// <reference lib="DOM.Iterable" />

/// <reference types="react" />
/// <reference types="react-dom" />

declare interface ImportMeta {
  url: string;
}

// eslint-disable-next-line no-var
declare var process: NodeJS.Process;

declare namespace NodeJS {
  interface Process {
    env: ProcessEnv;
  }

  interface ProcessEnv {
    NODE_ENV: "production" | "development" | "test";
    [key: `APP_${string}`]: string;
  }
}

declare module "*.css" {
  const exports: Record<string, string>;
  export default exports;
}

declare module "*.scss" {
  const exports: Record<string, string>;
  export default exports;
}
