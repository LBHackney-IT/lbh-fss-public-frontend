import { createRoot } from "react-dom/client";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "./helpers/FontAwesome/fontawesome";

// Load Open Sans from CDN (works for standalone and WordPress embed)
const fontId = "fss-open-sans-cdn";
if (!document.getElementById(fontId)) {
  const link = document.createElement("link");
  link.id = fontId;
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap";
  link.crossOrigin = "anonymous";
  document.head.appendChild(link);
}

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

serviceWorker.unregister();
