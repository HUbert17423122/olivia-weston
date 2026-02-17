import { useEffect, useState } from "react";

import AppDesktop from "./AppDesktop.jsx";
import AppMobile from "./AppMobile.jsx";

// CSS: desktop base + mobile overrides (mobile.css only applies under .ow-mobile)
import "./styles/desktop.css";
import "./styles/mobile.css";

function useIsMobileOrTablet() {
  const get = () => {
    if (typeof window === "undefined") return false;

    // 1) Primary: viewport width
    const w = window.innerWidth;
    if (w <= 1024) return true; // phones + tablets

    // 2) Secondary: touch / coarse pointer devices
    const coarse =
      window.matchMedia &&
      window.matchMedia("(pointer: coarse)").matches;

    return !!coarse;
  };

  const [isMobileOrTablet, setIsMobileOrTablet] = useState(get);

  useEffect(() => {
    const onResize = () => setIsMobileOrTablet(get());

    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    // Also react to pointer changes (some devices / browsers)
    const mq = window.matchMedia ? window.matchMedia("(pointer: coarse)") : null;
    if (mq) {
      const onChange = () => setIsMobileOrTablet(get());
      if (mq.addEventListener) mq.addEventListener("change", onChange);
      else mq.addListener(onChange);

      return () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("orientationchange", onResize);
        if (mq.removeEventListener) mq.removeEventListener("change", onChange);
        else mq.removeListener(onChange);
      };
    }

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  return isMobileOrTablet;
}

export default function App() {
  const isMobileOrTablet = useIsMobileOrTablet();

  // Toggle a class on <html> so CSS can switch cleanly
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("ow-mobile", isMobileOrTablet);
    root.classList.toggle("ow-desktop", !isMobileOrTablet);
  }, [isMobileOrTablet]);

  return isMobileOrTablet ? <AppMobile /> : <AppDesktop />;
}