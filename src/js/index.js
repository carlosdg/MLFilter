import { registerServiceWorker } from "./utils/register_service_worker";

import React from "react";
import { render } from "react-dom";
import App from "./components/App";

document.addEventListener("DOMContentLoaded", () => {
  render(<App />, document.getElementById("app-root"));

  // Register service worker
  registerServiceWorker();
});
