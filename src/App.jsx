import React, { useEffect, useLayoutEffect, useState } from "react";

import AppDesktop from "./AppDesktop.jsx";
import AppMobile from "./AppMobile.jsx";

function computeIsMobileOrTablet() {
  if (typeof window === "undefined") return false;

  const w = window.innerWidth;
  if (w <= 1024) return true;

  const coarse =
    window.matchMedia && window.matchMedia("(pointer: coarse)").matches;

  return !!coarse;
}

function useIsMobileOrTablet() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(() =>
    computeIsMobileOrTablet()
  );

  useEffect(() => {
    const onChange = () => setIsMobileOrTablet(computeIsMobileOrTablet());

    window.addEventListener("resize", onChange);
    window.addEventListener("orientationchange", onChange);

    let mq;
    if (window.matchMedia) {
      mq = window.matchMedia("(pointer: coarse)");
      if (mq.addEventListener) mq.addEventListener("change", onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }

    return () => {
      window.removeEventListener("resize", onChange);
      window.removeEventListener("orientationchange", onChange);
      if (mq) {
        if (mq.removeEventListener) mq.removeEventListener("change", onChange);
        else if (mq.removeListener) mq.removeListener(onChange);
      }
    };
  }, []);

  return isMobileOrTablet;
}

export default function App() {
  const isMobileOrTablet = useIsMobileOrTablet();

  // ✅ Apply class before paint whenever device state changes
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("ow-mobile", isMobileOrTablet);
    root.classList.toggle("ow-desktop", !isMobileOrTablet);
  }, [isMobileOrTablet]);

  return isMobileOrTablet ? <AppMobile /> : <AppDesktop />;
}