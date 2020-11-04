import { createConfig } from "@buncho/webpack-config/app";

const config = createConfig({
  host: process.env.HOST,
  port: Number(process.env.PORT),
});

export default config;
