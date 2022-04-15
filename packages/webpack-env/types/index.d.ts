/* eslint-disable @typescript-eslint/triple-slash-reference */

/// <reference types="react" />
/// <reference types="react-dom" />

declare interface ImportMeta {
  url: string;
}

declare namespace NodeJS {
  interface Process {
    env: ProcessEnv;
  }

  interface ProcessEnv {
    readonly NODE_ENV: "production" | "development" | "test";
    readonly [key: `APP_${string}`]: string;
  }
}

// eslint-disable-next-line no-var
declare var process: NodeJS.Process;

declare module "*.svg" {
  import type { ComponentType, SVGAttributes } from "react";
  const Component: ComponentType<SVGAttributes<SVGSVGElement>>;
  export default Component;
}

declare module "*.module.css" {
  const styles: { [key: string]: string };
  export default styles;
}

declare module "*.module.scss" {
  const styles: { [key: string]: string };
  export default styles;
}
