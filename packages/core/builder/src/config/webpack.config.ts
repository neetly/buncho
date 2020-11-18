import "@buncho/dotenv";
import { createConfig } from "@buncho/webpack-config";

const config = createConfig({
  host: process.env.HOST || "localhost",
  port: Number(process.env.PORT || 3000),
  env: Object.fromEntries(
    Object.entries(process.env).filter(([key]) => {
      return key.startsWith("APP_");
    }),
  ),
});

export default config;
