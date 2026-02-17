// src/App.jsx
import React, { useEffect, useState } from "react";
import AppDesktop from "./AppDesktop.jsx";
import AppMobile from "./AppMobile.jsx";

function isMobileOrTablet() {
  const w = window.innerWidth;
  if (w <= 1024) return true;

  const coarse =
    window.matchMedia && window.matchMedia("(pointer: coarse)").matches;

  return !!coarse;
}

export default function App() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return isMobileOrTablet();
  });

  useEffect(() => {
    const onResize = () => setIsMobile(isMobileOrTablet());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return isMobile ? <AppMobile /> : <AppDesktop />;
}