import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import { registerServiceWorker } from "./utils/register_service_worker";

document.addEventListener("DOMContentLoaded", () => {
  render(<App />, document.getElementById("app-root"));
  registerServiceWorker();
});