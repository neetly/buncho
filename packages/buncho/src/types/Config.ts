import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

interface Config {
  publicPath?: string;
  useReactRefresh?: boolean;

  devServer?: {
    host?: string;
    port?: number;
    proxy?: DevServerConfiguration["proxy"];
  };
}

export type { Config };
