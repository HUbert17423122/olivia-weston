import React, { useEffect, useMemo, useState } from "react";

import AppDesktop from "./AppDesktop.jsx";
import AppMobile from "./AppMobile.jsx";

// CSS: load desktop styles by default, then swap on mobile/tablet
import "./styles/desktop.css";
import "./styles/mobile.css";

function useIsMobileOrTablet() {
  const get = () => {
    if (typeof window === "undefined") return false;

    // Primary: viewport width
    const w = window.innerWidth;
    if (w <= 1024) return true; // phones + tablets

    // Secondary: coarse pointer (touch devices)
    const coarse =
      window.matchMedia &&
      window.matchMedia("(pointer: coarse)").matches;

    return !!coarse;
  };

  const [isMobileOrTablet, setIsMobileOrTablet] = useState(get());

  useEffect(() => {
    const onResize = () => setIsMobileOrTablet(get());
    window.addEventListener("resize", onResize);

    // also react to orientation changes on mobile/tablets
    window.addEventListener("orientationchange", onResize);

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