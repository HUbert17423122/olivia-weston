import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Import shared content from desktop (real source of truth)
import {
  I18N,
  getInitialLang,
  buildCategories,
  buildProducts,
  BACKGROUNDS,
} from "./AppDesktop.jsx";

/* ================= CONFIG ================= */
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080/api";

/* ================= GLOBAL CARD LINE ================= */
const CARD_LINE = "from-[#aab3c2] via-[#8e97a6] to-[#737d8a]";

function cx(...xs) {
  return xs.filter(Boolean).join(" ");
}

/* ================= BUTTON ================= */
function Button({ children, className = "", variant, ...props }) {
  const base =
    "inline-flex items-center justify-center text-[14px] font-semibold transition rounded-full px-5 py-3 select-none focus:outline-none focus:ring-2 focus:ring-offset-2";
  const styles =
    variant === "outline"
      ? "border border-white/35 bg-white/10 text-inherit hover:bg-white/15 hover:border-white/45 focus:ring-white/30 focus:ring-offset-transparent"
      : variant === "ghost"
      ? "bg-transparent hover:bg-white/10 focus:ring-white/25 focus:ring-offset-transparent"
      : "bg-neutral-900 text-white hover:bg-neutral-800 shadow-[0_12px_30px_-18px_rgba(0,0,0,.55)] focus:ring-neutral-900/25 focus:ring-offset-white/0";
  return (
    <button className={cx(base, styles, className)} {...props}>
      {children}
    </button>
  );
}

/* ================= HASH ROUTER ================= */
function useHashRoute() {
  const get = () => window.location.hash || "#/";
  const [hash, setHash] = useState(get());

  useEffect(() => {
    const onHash = () => setHash(get());
    window.addEventListener("hashchange", onHash);
    if (!window.location.hash) window.location.hash = "#/";
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return hash;
}

function NavLink({ to, children, className }) {
  return (
    <a href={to} className={className}>
      {children}
    </a>
  );
}

/* ================= HERO BACKDROP ================= */
function HeroBackdrop({
  bgImage,
  dark,
  accent,
  backdropHeightClass = "min-h-[820px]",
  style,
  children,
}) {
  return (
    <div
      className={cx("relative overflow-hidden", backdropHeightClass)}
      style={{
        ...(bgImage
          ? {
              backgroundImage: `url("${bgImage}")`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }
          : {}),
        ...(style || {}),
      }}
    >
      <div className={`absolute left-0 top-0 h-2 w-full bg-gradient-to-r ${accent}`} />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.075] mix-blend-overlay"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22n%22 x=%220%22 y=%220%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/></filter><rect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.35%22/></svg>')",
        }}
      />

      <div className={dark ? "absolute inset-0 bg-black/45" : "absolute inset-0 bg-white/25"} />
      <div
        className={
          dark
            ? "absolute inset-0 bg-gradient-to-b from-black/75 via-black/25 to-black/75"
            : "absolute inset-0 bg-gradient-to-b from-white/85 via-white/25 to-white/85"
        }
      />

      <div className="relative z-10">{children}</div>

      <div
        className={
          dark
            ? "pointer-events-none absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-b from-transparent via-[#0b0f0f]/60 to-[#0b0f0f]"
            : "pointer-events-none absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-b from-transparent via-[#f5f7f7]/70 to-[#f5f7f7]"
        }
      />
    </div>
  );
}

/* ================= MOBILE SHELL ================= */
function MobileShell({ dark, onToggleDark, lang, onToggleLang, t, children }) {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("ow_admin_token")
      : null;

  return (
    <div
      className={cx(
        "min-h-screen transition-colors duration-700 antialiased",
        dark ? "bg-[#0b0f0f] text-neutral-100" : "bg-[#f5f7f7] text-neutral-900"
      )}
      style={{
        fontFamily:
          'var(--ow-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Inter, Roboto, Arial',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,650&family=Manrope:wght@400;500;600;700&display=swap');
        :root{
          --ow-sans: "Manrope";
          --ow-display: "Fraunces";
        }
        ::selection{ background: rgba(255, 255, 255, 0.28); }
        a{ text-decoration: none; }
      `}</style>

      <header className="sticky top-0 z-40 backdrop-blur border-b border-black/10 bg-white/60">
        <div className="px-4 py-3 flex items-center justify-between gap-3">
          <NavLink
            to="#/"
            className="tracking-[0.16em] text-[11px] uppercase transition opacity-90 hover:opacity-100 whitespace-nowrap"
            style={{ fontFamily: "var(--ow-sans)" }}
          >
            {t.navBrand}
          </NavLink>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center rounded-full border overflow-hidden bg-white/70 border-black/10">
              <button
                type="button"
                onClick={() => onToggleLang("pl")}
                aria-pressed={lang === "pl"}
                className={cx(
                  "px-3 py-2 text-[12px] font-semibold transition",
                  lang === "pl"
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-900/80 hover:bg-black/5"
                )}
              >
                PL
              </button>
              <button
                type="button"
                onClick={() => onToggleLang("en")}
                aria-pressed={lang === "en"}
                className={cx(
                  "px-3 py-2 text-[12px] font-semibold transition",
                  lang === "en"
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-900/80 hover:bg-black/5"
                )}
              >
                EN
              </button>
            </div>

            <Button
              variant="ghost"
              onClick={onToggleDark}
              className="rounded-full px-3 py-2 text-[12px] hover:bg-black/5"
            >
              {dark ? t.darkToggleLight : t.darkToggleDark}
            </Button>

            <NavLink to={token ? "#/admin/dashboard" : "#/admin/login"}>
              <Button
                variant="outline"
                className="rounded-full px-4 py-2 text-[12px] border-black/10 bg-white"
              >
                {token ? t.dashboard : t.admin}
              </Button>
            </NavLink>
          </div>
        </div>
      </header>

      {children}

      <footer className="px-5 py-10 opacity-70 text-xs">
        <div className="flex flex-col gap-2">
          <p className="tracking-tight">{t.footerTagline}</p>
          <p className="tracking-tight">
            {t.footerCopyright(new Date().getFullYear())}
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ================= MOBILE HOME PAGE ================= */
function MobileHomePage({ onBook, dark, t, categories }) {
  return (
    <div className="pb-6">
      <HeroBackdrop
        bgImage={BACKGROUNDS.home}
        dark={dark}
        accent="from-[#8fb8ae] via-[#7aa89f] to-[#6b988f]"
        backdropHeightClass="min-h-[820px]"
        style={{ backgroundPosition: "center 35%" }}
      >
        <div className="px-5 pt-8">
          <motion.h1
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="leading-[0.95]"
            style={{
              fontFamily: "var(--ow-display)",
              letterSpacing: "-0.03em",
              fontWeight: 650,
              fontSize: "clamp(40px, 9.2vw, 56px)",
            }}
          >
            {t.homeHeroTitle}
          </motion.h1>

          <p className="mt-4 text-[14px] opacity-85 leading-relaxed">
            {t.homeHeroSubtitle}
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <Button className="rounded-full w-full py-4" onClick={() => onBook(t.bookGeneral)}>
              {t.book}
            </Button>
            <div className="text-xs opacity-75 px-1">{t.homeHeroMeta}</div>
          </div>

          <div className="mt-8 grid gap-4">
            {categories.map((c) => (
              <NavLink key={c.key} to={`#/${c.key}`} className="block">
                <div
                  className={cx(
                    "rounded-[1.5rem] border overflow-hidden shadow-[0_18px_50px_-34px_rgba(0,0,0,.55)]",
                    dark ? "bg-white/[0.06] border-white/10" : "bg-white/80 border-black/10"
                  )}
                >
                  <div className={cx("h-[5px] w-full bg-gradient-to-r", CARD_LINE)} />
                  <div className="p-5">
                    <div className="text-[11px] uppercase tracking-[0.22em] opacity-60">
                      {c.subtitle}
                    </div>
                    <div
                      className="mt-2"
                      style={{
                        fontFamily: "var(--ow-display)",
                        fontWeight: 650,
                        letterSpacing: "-0.02em",
                        fontSize: "22px",
                      }}
                    >
                      {c.title}
                    </div>
                    <div className="mt-2 text-[13.5px] opacity-85 leading-relaxed line-clamp-3">
                      {c.description}
                    </div>

                    <div className="mt-4 inline-flex items-center gap-2 text-sm opacity-85">
                      <span className={cx("h-px w-10", dark ? "bg-white/30" : "bg-neutral-300")} />
                      <span>{t.open}</span>
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>

          <div className="mt-10 text-center px-2 pb-10">
            <p
              className="leading-snug"
              style={{
                fontFamily: "var(--ow-display)",
                letterSpacing: "-0.02em",
                fontWeight: 600,
                fontSize: "clamp(18px, 4.8vw, 26px)",
              }}
            >
              {t.homeQuoteBand}
            </p>
          </div>
        </div>
      </HeroBackdrop>
    </div>
  );
}

/* ================= ROUTE PARSER ================= */
function parseRoute(hash, categories) {
  if (hash === "#/" || hash === "#" || !hash) return { page: "home" };

  const parts = hash.replace(/^#\//, "").split("/");

  const catKey = parts[0];
  const category = categories.find((c) => c.key === catKey);
  if (!category) return { page: "home" };

  return { page: "home" };
}

/* ================= APP MOBILE ================= */
export default function AppMobile() {
  const route = useHashRoute();

  const [lang, setLang] = useState(getInitialLang());

  // ✅ HARD SAFETY: if lang ever corrupts, never crash
  const safeLang = lang === "pl" || lang === "en" ? lang : "pl";
  const t = I18N[safeLang] || I18N.pl;

  const categories = useMemo(() => buildCategories(t), [t]);
  useMemo(() => buildProducts(t), [t]); // keep parity

  useMemo(() => parseRoute(route, categories), [route, categories]);

  const [dark, setDark] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingContext, setBookingContext] = useState(t.book);

  useEffect(() => {
    setBookingContext((c) => c || t.book);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeLang]);

  const openBooking = (context) => {
    setBookingContext(context);
    setBookingOpen(true);
  };

  const toggleLang = (next) => {
    setLang(next);
    try {
      window.localStorage.setItem("ow_lang", next);
    } catch {}
  };

  return (
    <MobileShell
      dark={dark}
      onToggleDark={() => setDark((d) => !d)}
      lang={safeLang}
      onToggleLang={toggleLang}
      t={t}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={route + "_" + safeLang}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <MobileHomePage
            onBook={openBooking}
            dark={dark}
            t={t}
            categories={categories}
          />
        </motion.div>
      </AnimatePresence>

      {bookingOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/45"
            onClick={() => setBookingOpen(false)}
          />
          <div className="relative w-[min(520px,92vw)] rounded-[1.5rem] bg-white p-5">
            <div className="text-sm font-semibold">{t.bookingTitle}</div>
            <div className="text-xs opacity-70 mt-1">{bookingContext}</div>
            <div className="mt-4">
              <Button className="w-full" onClick={() => setBookingOpen(false)}>
                {t.bookingClose}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </MobileShell>
  );
}