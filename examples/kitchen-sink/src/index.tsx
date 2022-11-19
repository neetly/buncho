import "./index.scss";

import { bonjour } from "@buncho/example-library";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";

bonjour();

const container = document.querySelector("#root");
if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
