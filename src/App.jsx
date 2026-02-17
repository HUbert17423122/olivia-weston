import React, { useEffect, useMemo, useState } from "react";

import AppDesktop from "./AppDesktop.jsx";
import AppMobile from "./AppMobile.jsx";

// CSS
import "./styles/desktop.css";
import "./styles/mobile.css";

/** Re-render App.jsx on EVERY hash change (this is the key fix) */
function useHash() {
  const get = () => (typeof window !== "undefined" ? window.location.hash || "#/" : "#/");

  const [hash, setHash] = useState(get());

  useEffect(() => {
    const onHash = () => setHash(get());
    window.addEventListener("hashchange", onHash);

    // In case something changes hash without triggering (rare), poll once after mount
    const t = setTimeout(() => setHash(get()), 0);

    return () => {
      clearTimeout(t);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  return hash;
}

function useIsMobileOrTablet() {
  const get = () => {
    if (typeof window === "undefined") return false;

    const w = window.innerWidth;
    if (w <= 1024) return true;

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

export default function App() {
  const hash = useHash();
  const isMobileOrTablet = useIsMobileOrTablet();

  const isAdminRoute = useMemo(() => {
    // hash looks like "#/admin/dashboard"
    return (hash || "#/").startsWith("#/admin");
  }, [hash]);

  // ✅ If admin route => ALWAYS use desktop app
  const useMobileApp = isMobileOrTablet && !isAdminRoute;

  // Toggle class on <html> for CSS switching
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("ow-mobile", useMobileApp);
    root.classList.toggle("ow-desktop", !useMobileApp);
  }, [useMobileApp]);

  // ✅ Force remount when switching between mobile/desktop/admin states
  // This prevents "stuck on current page" when React doesn't remount the other tree
  const appKey = useMobileApp ? `mobile:${hash}` : `desktop:${hash}`;

  return useMobileApp ? <AppMobile key={appKey} /> : <AppDesktop key={appKey} />;
}