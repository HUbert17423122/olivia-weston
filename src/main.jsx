import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AppMobile from "./AppMobile.jsx";
import "./index.css";

function useMobileApp() {
  // Tablet + phone
  // - width <= 1024px covers iPad portrait/landscape nicely
  // - coarse pointer catches many phones even if zoomed
  const mqWidth = window.matchMedia("(max-width: 1024px)");
  const mqCoarse = window.matchMedia("(pointer: coarse)");

  return mqWidth.matches || mqCoarse.matches;
}

function Root() {
  const [isMobile, setIsMobile] = React.useState(useMobileApp());

  React.useEffect(() => {
    const mqWidth = window.matchMedia("(max-width: 1024px)");
    const mqCoarse = window.matchMedia("(pointer: coarse)");

    const handler = () => setIsMobile(useMobileApp());

    // modern + fallback
    mqWidth.addEventListener?.("change", handler);
    mqCoarse.addEventListener?.("change", handler);
    mqWidth.addListener?.(handler);
    mqCoarse.addListener?.(handler);

    return () => {
      mqWidth.removeEventListener?.("change", handler);
      mqCoarse.removeEventListener?.("change", handler);
      mqWidth.removeListener?.(handler);
      mqCoarse.removeListener?.(handler);
    };
  }, []);

  return isMobile ? <AppMobile /> : <App />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);