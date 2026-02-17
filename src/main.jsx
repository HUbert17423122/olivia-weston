import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Tailwind base
import "./index.css";

// Force-load both CSS files globally
import "./styles/desktop.css";
import "./styles/mobile.css";

// ✅ Set html class immediately (before React mounts)
(function setInitialDeviceClass() {
  try {
    const root = document.documentElement;

    const isMobileOrTablet = (() => {
      const w = window.innerWidth;
      if (w <= 1024) return true;

      const coarse =
        window.matchMedia && window.matchMedia("(pointer: coarse)").matches;

      return !!coarse;
    })();

    root.classList.toggle("ow-mobile", isMobileOrTablet);
    root.classList.toggle("ow-desktop", !isMobileOrTablet);
  } catch {
    // ignore
  }
})();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);