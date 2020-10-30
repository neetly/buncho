/* eslint-disable @typescript-eslint/triple-slash-reference */

/// <reference types="react" />
/// <reference types="react-dom" />

declare const process: {
  env: Record<string, string | undefined>;
};

declare module "*.svg" {
  import type { ComponentType, SVGProps } from "react";
  const Component: ComponentType<SVGProps<SVGSVGElement>>;
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
