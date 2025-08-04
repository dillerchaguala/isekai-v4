import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles/globals.css";

const container = document.getElementById("app");

if (!container) {
  throw new Error(
    "The element #app wasn't found. The app can't be mounted."
  );
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
