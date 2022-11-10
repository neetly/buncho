import { type Configuration as DevServerConfiguration } from "webpack-dev-server";

type Config = {
  publicPath?: string;

  devServer?: {
    host?: string;
    port?: number;
    proxy?: DevServerConfiguration["proxy"];
  };
};

export type { Config };
