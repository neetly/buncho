import { createConfig } from "@buncho/webpack-config";

const config = createConfig({
  host: process.env.HOST,
  port: Number(process.env.PORT),
});

export default config;
