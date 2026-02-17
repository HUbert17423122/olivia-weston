import React, { useEffect, useState } from "react";

import AppDesktop from "./AppDesktop.jsx";
import AppMobile from "./AppMobile.jsx";

// CSS
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
      window.matchMedia && window.matchMedia("(pointer: coarse)").matches;

    return !!coarse;
  };

  const [isMobileOrTablet, setIsMobileOrTablet] = useState(get());

  useEffect(() => {
    const onResize = () => setIsMobileOrTablet(get());
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  return isMobileOrTablet;
}

function useIsAdminRoute() {
  const get = () => {
    if (typeof window === "undefined") return false;
    const h = window.location.hash || "#/";
    return h.startsWith("#/admin");
  };

  const [isAdmin, setIsAdmin] = useState(get());

  useEffect(() => {
    const onHash = () => setIsAdmin(get());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return isAdmin;
}

export default function App() {
  const isMobileOrTablet = useIsMobileOrTablet();
  const isAdminRoute = useIsAdminRoute();

  // If admin route: ALWAYS use Desktop app (because it contains admin pages)
  const useMobileApp = isMobileOrTablet && !isAdminRoute;

  // Toggle a class on <html> so CSS can switch cleanly
  useEffect(() => {
    const root = document.documentElement;

    // If admin route we force desktop class to avoid “mobile css hiding admin”
    root.classList.toggle("ow-mobile", useMobileApp);
    root.classList.toggle("ow-desktop", !useMobileApp);
  }, [useMobileApp]);

  return useMobileApp ? <AppMobile /> : <AppDesktop />;
}