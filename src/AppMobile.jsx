import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bgHome from "./assets/backgrounds/home.jpg";
import bgYoga from "./assets/backgrounds/yoga.jpg";
import bgEducation from "./assets/backgrounds/education.jpg";
import bgWellness from "./assets/backgrounds/wellness.jpg";
// ✅ Shared source of truth from desktop
import {
  I18N,
  getInitialLang,
  buildCategories,
  buildProducts,
} from "./AppDesktop.jsx";

/* ================= CONFIG ================= */
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080/api";

/* ================= GLOBAL CARD LINE ================= */
const CARD_LINE = "from-[#aab3c2] via-[#8e97a6] to-[#737d8a]";

function cx(...xs) {
  return xs.filter(Boolean).join(" ");
}
const BACKGROUNDS = {
  home: bgHome,
  yoga: bgYoga,
  education: bgEducation,
  wellness: bgWellness,
};
/* ================= BUTTON ================= */
function Button({ children, className = "", variant, ...props }) {
  const base =
    "inline-flex items-center justify-center font-semibold transition rounded-full select-none focus:outline-none focus:ring-2 focus:ring-offset-2";
  const size = "text-[14px] px-5 py-3";
  const styles =
    variant === "outline"
      ? "border border-white/35 bg-white/10 text-inherit hover:bg-white/15 hover:border-white/45 focus:ring-white/30 focus:ring-offset-transparent"
      : variant === "ghost"
      ? "bg-transparent hover:bg-white/10 focus:ring-white/25 focus:ring-offset-transparent"
      : "bg-neutral-900 text-white hover:bg-neutral-800 shadow-[0_12px_30px_-18px_rgba(0,0,0,.55)] focus:ring-neutral-900/25 focus:ring-offset-white/0";
  return (
    <button className={cx(base, size, styles, className)} {...props}>
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

/* ================= HERO BACKDROP (MOBILE-TUNED) ================= */
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

/* ================= TYPO ================= */
function Title({ children }) {
  return (
    <h1
      className="leading-[0.95]"
      style={{
        fontFamily: "var(--ow-display)",
        letterSpacing: "-0.03em",
        fontWeight: 650,
        fontSize: "clamp(36px, 9vw, 52px)",
      }}
    >
      {children}
    </h1>
  );
}

function SectionTitle({ children }) {
  return (
    <h2
      className="leading-tight"
      style={{
        fontFamily: "var(--ow-display)",
        letterSpacing: "-0.02em",
        fontWeight: 650,
        fontSize: "22px",
      }}
    >
      {children}
    </h2>
  );
}

/* ================= MOBILE NAVBAR ================= */
function MobileShell({ dark, onToggleDark, lang, onToggleLang, t, children }) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("ow_admin_token") : null;

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

      {/* Sticky glass top bar */}
      <header
        className={cx(
          "sticky top-0 z-50 backdrop-blur-xl border-b",
          dark ? "bg-black/35 border-white/10" : "bg-white/70 border-black/10"
        )}
      >
        <div className="px-4 py-3 flex items-center justify-between gap-3">
          <NavLink
            to="#/"
            className={cx(
              "tracking-[0.18em] text-[11px] uppercase transition opacity-90 hover:opacity-100 whitespace-nowrap"
            )}
            style={{ fontFamily: "var(--ow-sans)" }}
          >
            {t.navBrand}
          </NavLink>

          <div className="flex items-center gap-2">
            {/* Lang segmented */}
            <div
              className={cx(
                "inline-flex items-center rounded-full border overflow-hidden",
                dark ? "bg-white/5 border-white/10" : "bg-white/75 border-black/10"
              )}
            >
              <button
                type="button"
                onClick={() => onToggleLang("pl")}
                aria-pressed={lang === "pl"}
                className={cx(
                  "px-3 py-2 text-[12px] font-semibold transition",
                  lang === "pl"
                    ? "bg-neutral-900 text-white"
                    : dark
                    ? "text-white/80 hover:bg-white/10"
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
                    : dark
                    ? "text-white/80 hover:bg-white/10"
                    : "text-neutral-900/80 hover:bg-black/5"
                )}
              >
                EN
              </button>
            </div>

            {/* Dark toggle */}
            <Button
              variant="ghost"
              onClick={onToggleDark}
              className={cx(
                "rounded-full px-3 py-2 text-[12px]",
                dark ? "hover:bg-white/10" : "hover:bg-black/5"
              )}
            >
              {dark ? t.darkToggleLight : t.darkToggleDark}
            </Button>

            {/* Admin */}
            <NavLink to={token ? "#/admin/dashboard" : "#/admin/login"}>
              <Button
                variant="outline"
                className={cx(
                  "rounded-full px-4 py-2 text-[12px]",
                  dark ? "" : "border-black/10 bg-white"
                )}
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
          <p className="tracking-tight">{t.footerCopyright(new Date().getFullYear())}</p>
        </div>
      </footer>
    </div>
  );
}

/* ================= REUSABLE CARD ================= */
function MobileCard({ dark, children, accentLine = true }) {
  return (
    <div
      className={cx(
        "rounded-[1.5rem] overflow-hidden border shadow-[0_18px_55px_-40px_rgba(0,0,0,.6)]",
        dark ? "bg-white/[0.06] border-white/10" : "bg-white/85 border-black/10"
      )}
    >
      {accentLine ? <div className={cx("h-[5px] w-full bg-gradient-to-r", CARD_LINE)} /> : null}
      <div className="p-5">{children}</div>
    </div>
  );
}

/* ================= QUOTE BAND (MOBILE) ================= */
function QuoteBandMobile({ quote }) {
  return (
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
        {quote}
      </p>
    </div>
  );
}

/* ================= BOOKING MODAL (MOBILE) ================= */
function nextDays(count) {
  const out = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  for (let i = 0; i < count; i++) {
    const nd = new Date(d);
    nd.setDate(d.getDate() + i);
    out.push(nd);
  }
  return out;
}
function formatDateLabel(d) {
  return d.toLocaleDateString(undefined, { weekday: "short", day: "2-digit", month: "short" });
}
function formatDateISO(d) {
  return d.toISOString().slice(0, 10);
}

function BookingModal({ open, onClose, contextTitle, t }) {
  const dates = useMemo(() => nextDays(14), []);
  const slots = useMemo(() => ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"], []);

  const [bookingEnabled, setBookingEnabled] = useState(true);

  const [takenSlots, setTakenSlots] = useState([]);
  const [pickedDate, setPickedDate] = useState(dates[2] || null);
  const [pickedSlot, setPickedSlot] = useState(slots[1] || null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [confirmed, setConfirmed] = useState(false);
  const [submitErr, setSubmitErr] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const sendingLabel = t.langToggleHint === "Język" ? "Wysyłanie…" : "Sending…";

  useEffect(() => {
    if (!open) return;
    let alive = true;

    (async () => {
      try {
        const res = await fetch(`${API_BASE}/settings/booking`);
        const data = await res.json();
        if (!res.ok) throw new Error();
        if (alive) setBookingEnabled(!!data.enabled);
      } catch {
        if (alive) setBookingEnabled(true);
      }
    })();

    return () => {
      alive = false;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setTakenSlots([]);
      setConfirmed(false);
      setSubmitErr("");
      setSubmitting(false);
      setName("");
      setPhone("");
      setEmail("");
      setPickedDate(dates[2] || null);
      setPickedSlot(slots[1] || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open || !pickedDate) return;

    let alive = true;

    (async () => {
      try {
        const qs = new URLSearchParams({
          date: formatDateISO(pickedDate),
          context: contextTitle || "",
        });

        const res = await fetch(`${API_BASE}/appointments/availability?${qs.toString()}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data?.error || "Failed to load availability");

        if (!alive) return;

        const taken = Array.isArray(data.taken) ? data.taken : [];
        setTakenSlots(taken);

        if (pickedSlot && taken.includes(pickedSlot)) {
          const firstFree = slots.find((s) => !taken.includes(s)) || null;
          setPickedSlot(firstFree);
        }
      } catch {
        if (alive) setTakenSlots([]);
      }
    })();

    return () => {
      alive = false;
    };
  }, [open, pickedDate, contextTitle]); // (slots + pickedSlot intentionally omitted)

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* modal */}
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={cx(
          // ✅ MOBILE: full-width bottom sheet that never exceeds viewport
          "relative w-full sm:w-[min(920px,92vw)]",
          "max-h-[92dvh] sm:max-h-none",
          "bg-white shadow-[0_40px_120px_-60px_rgba(0,0,0,.7)] overflow-hidden",
          // ✅ MOBILE: rounded top only (sheet). Desktop: fully rounded.
          "rounded-t-[2rem] sm:rounded-[2rem]"
        )}
        style={{
          // helps iOS safe area feel nicer (optional but great)
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {/* sticky header (so close button always visible on mobile) */}
        <div className="sticky top-0 z-10 bg-white border-b border-neutral-200">
          <div className="px-5 sm:px-8 py-5 sm:py-8 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3
                style={{ fontFamily: "var(--ow-display)", fontWeight: 650, letterSpacing: "-0.02em" }}
                className="text-[20px] sm:text-2xl leading-tight"
              >
                {t.bookingTitle}
              </h3>
              <p className="text-sm opacity-70 mt-1 truncate">{contextTitle}</p>
            </div>

            <Button variant="ghost" onClick={onClose} className="hover:bg-black/5">
              {t.bookingClose}
            </Button>
          </div>
        </div>

        {/* ✅ scrollable content area (prevents “going out of screen”) */}
        <div className="overflow-y-auto max-h-[calc(92dvh-88px)] sm:max-h-none">
          <div className="px-5 sm:px-8 py-5 sm:py-8 grid gap-7 sm:gap-8 sm:grid-cols-2">
            {/* LEFT: DAY */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] opacity-60 mb-4">{t.bookingSelectDay}</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {dates.map((d) => {
                  const active = pickedDate && pickedDate.getTime() === d.getTime();
                  return (
                    <button
                      key={d.toISOString()}
                      disabled={!bookingEnabled}
                      onClick={() => bookingEnabled && setPickedDate(d)}
                      className={cx(
                        "rounded-2xl border px-4 py-3 text-left transition",
                        !bookingEnabled ? "opacity-40 cursor-not-allowed" : "",
                        active
                          ? "border-neutral-900 bg-neutral-900 text-white"
                          : "border-neutral-200 bg-white hover:border-neutral-400"
                      )}
                    >
                      <div className="text-sm font-semibold">{formatDateLabel(d)}</div>
                      <div className="text-xs opacity-70">{t.bookingAvailable}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: TIME + FORM */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] opacity-60 mb-4">{t.bookingSelectTime}</p>

              <div className="grid grid-cols-2 gap-3">
                {slots.map((s) => {
                  const isTaken = takenSlots.includes(s);
                  const active = pickedSlot === s;

                  return (
                    <button
                      key={s}
                      disabled={isTaken || !bookingEnabled}
                      onClick={() => {
                        if (isTaken || !bookingEnabled) return;
                        setPickedSlot(s);
                      }}
                      className={cx(
                        "rounded-2xl border px-4 py-3 text-left transition",
                        !bookingEnabled ? "opacity-40 cursor-not-allowed" : "",
                        isTaken
                          ? "border-neutral-300 bg-neutral-200 text-neutral-400 cursor-not-allowed"
                          : active
                          ? "border-neutral-900 bg-neutral-900 text-white"
                          : "border-neutral-200 bg-white hover:border-neutral-400"
                      )}
                    >
                      <div className="text-sm font-semibold">{s}</div>
                      <div className="text-xs opacity-70">
                        {isTaken ? (t.langToggleHint === "Język" ? "Zajęte" : "Booked") : t.bookingDuration}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 grid gap-3">
                <input
                  className="rounded-2xl border border-neutral-200 px-4 py-3"
                  placeholder={t.formName}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="rounded-2xl border border-neutral-200 px-4 py-3"
                  placeholder={t.formPhone}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  className="rounded-2xl border border-neutral-200 px-4 py-3"
                  placeholder={t.formEmail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {submitErr ? <p className="text-sm text-red-600">{submitErr}</p> : null}
              </div>

              {!bookingEnabled ? (
                <div className="rounded-2xl border border-neutral-200 p-4 mt-4 bg-neutral-50">
                  <p className="text-sm font-semibold">
                    {t.langToggleHint === "Język" ? "Rezerwacje są chwilowo wyłączone." : "Bookings are temporarily closed."}
                  </p>
                  <p className="text-xs opacity-70 mt-1">
                    {t.langToggleHint === "Język"
                      ? "Spróbuj ponownie później lub skontaktuj się bezpośrednio."
                      : "Please try again later or contact us directly."}
                  </p>
                </div>
              ) : null}

              <div className="mt-6 pb-6 sm:pb-0">
                {!confirmed ? (
                  <Button
                    className="rounded-full px-9 w-full sm:w-auto"
                    disabled={submitting || !pickedDate || !pickedSlot || !bookingEnabled}
                    onClick={async () => {
                      if (!pickedDate || !pickedSlot) return;

                      if (!name.trim() || !phone.trim()) {
                        setSubmitErr(t.formRequiredErr);
                        return;
                      }

                      setSubmitting(true);
                      setSubmitErr("");

                      try {
                        const res = await fetch(`${API_BASE}/appointments`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            name: name.trim(),
                            phone: phone.trim(),
                            email: email.trim() || null,
                            date: formatDateISO(pickedDate),
                            time: pickedSlot,
                            context: contextTitle || null,
                          }),
                        });

                        const data = await res.json();

                        if (res.status === 409) {
                          setSubmitErr(t.langToggleHint === "Język" ? "Ten termin jest już zajęty." : "This slot is already booked.");

                          const qs = new URLSearchParams({
                            date: formatDateISO(pickedDate),
                            context: contextTitle || "",
                          });
                          const r2 = await fetch(`${API_BASE}/appointments/availability?${qs.toString()}`);
                          const d2 = await r2.json();
                          const taken = Array.isArray(d2.taken) ? d2.taken : [];
                          setTakenSlots(taken);
                          const firstFree = slots.find((s) => !taken.includes(s)) || null;
                          setPickedSlot(firstFree);
                          return;
                        }

                        if (!res.ok) throw new Error(data?.error || "Failed to submit");

                        setConfirmed(true);
                      } catch (e) {
                        setSubmitErr(e.message || "Failed to submit");
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                  >
                    {submitting ? sendingLabel : t.bookingConfirm}
                  </Button>
                ) : (
                  <div className="rounded-2xl border border-neutral-200 p-4">
                    <p className="text-sm">
                      {t.bookingSent(pickedDate ? formatDateLabel(pickedDate) : "", pickedSlot || "")}
                    </p>
                    <p className="text-xs opacity-70 mt-1">{t.bookingProdNote}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ================= CONTACT POPUP (MOBILE) ================= */
function ContactPopupMobile({ open, onOpen, onClose, dark, t }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) {
      setName("");
      setEmail("");
      setMessage("");
      setErr("");
      setSending(false);
      setSent(false);
    }
  }, [open]);

  return (
    <>
      {/* floating */}
      <div className="fixed bottom-5 right-5 z-40">
        {!open ? (
          <Button className="rounded-full px-6 py-4 shadow-[0_22px_55px_-35px_rgba(0,0,0,.55)]" onClick={onOpen}>
            {t.contact.open}
          </Button>
        ) : null}
      </div>

      {/* modal */}
      {open ? (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/55" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={cx(
              "relative w-full sm:w-[min(560px,92vw)] rounded-t-[1.75rem] sm:rounded-[1.75rem] overflow-hidden shadow-[0_40px_120px_-60px_rgba(0,0,0,.7)]",
              dark ? "bg-[#0f1414] text-white" : "bg-white text-neutral-900"
            )}
          >
            <div className={cx("h-[5px] w-full bg-gradient-to-r", CARD_LINE)} />

            <div className={cx("p-5 border-b", dark ? "border-white/10" : "border-black/10")}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div style={{ fontFamily: "var(--ow-display)", fontWeight: 650 }} className="text-xl">
                    {t.contact.title}
                  </div>
                  <p className="text-sm opacity-70 mt-1">Education</p>
                </div>
                <Button variant="ghost" onClick={onClose} className={dark ? "hover:bg-white/10" : "hover:bg-black/5"}>
                  {t.contact.close}
                </Button>
              </div>
            </div>

            <div className="p-5 grid gap-3">
              <input
                className={cx(
                  "rounded-2xl px-4 py-3 border outline-none",
                  dark ? "bg-white/[0.06] border-white/10 text-white placeholder:text-white/45" : "bg-white border-black/10"
                )}
                placeholder={t.contact.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className={cx(
                  "rounded-2xl px-4 py-3 border outline-none",
                  dark ? "bg-white/[0.06] border-white/10 text-white placeholder:text-white/45" : "bg-white border-black/10"
                )}
                placeholder={t.contact.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
                className={cx(
                  "rounded-2xl px-4 py-3 border outline-none min-h-[130px] resize-none",
                  dark ? "bg-white/[0.06] border-white/10 text-white placeholder:text-white/45" : "bg-white border-black/10"
                )}
                placeholder={t.contact.message}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              {err ? <p className={cx("text-sm", dark ? "text-red-300" : "text-red-600")}>{err}</p> : null}

              {!sent ? (
                <Button
                  className="rounded-full py-4 mt-2 w-full"
                  disabled={sending}
                  onClick={async () => {
                    setErr("");
                    if (!name.trim() || !email.trim() || !message.trim()) {
                      setErr(t.contact.required);
                      return;
                    }

                    setSending(true);
                    try {
                      const res = await fetch(`${API_BASE}/messages`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          name: name.trim(),
                          email: email.trim(),
                          message: message.trim(),
                        }),
                      });
                      const data = await res.json().catch(() => ({}));
                      if (!res.ok) throw new Error(data?.error || "Failed to send");
                      setSent(true);
                    } catch (e) {
                      setErr(e.message || "Failed to send");
                    } finally {
                      setSending(false);
                    }
                  }}
                >
                  {sending ? t.contact.sending : t.contact.send}
                </Button>
              ) : (
                <div className={cx("rounded-2xl border p-4 mt-2", dark ? "border-white/10 bg-white/[0.05]" : "border-black/10 bg-black/[0.02]")}>
                  <p className="text-sm">{t.contact.sent}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      ) : null}
    </>
  );
}

/* ================= ADMIN (MOBILE) ================= */
function AdminLoginPageMobile({ dark, onAuthed }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="px-4 py-8">
      <MobileCard dark={dark}>
        <div className={cx("h-1 w-14 mb-4 bg-gradient-to-r", CARD_LINE)} />
        <h1 style={{ fontFamily: "var(--ow-display)", fontWeight: 650, letterSpacing: "-0.02em" }} className="text-2xl">
          Admin Login
        </h1>
        <p className="text-sm opacity-75 mt-1 mb-6">Sign in to manage bookings.</p>

        <div className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-[0.22em] opacity-60">Email</label>
            <input
              className={cx(
                "mt-2 w-full rounded-2xl px-4 py-3 border outline-none",
                dark ? "bg-white/[0.06] border-white/10 text-white" : "bg-white border-black/10"
              )}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.22em] opacity-60">Password</label>
            <input
              className={cx(
                "mt-2 w-full rounded-2xl px-4 py-3 border outline-none",
                dark ? "bg-white/[0.06] border-white/10 text-white" : "bg-white border-black/10"
              )}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
            />
          </div>

          {err ? <p className={cx("text-sm", dark ? "text-red-300" : "text-red-600")}>{err}</p> : null}

          <Button
            className="rounded-full py-4 w-full"
            onClick={async () => {
              setErr("");
              setLoading(true);
              try {
                const res = await fetch(`${API_BASE}/auth/login`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email, password }),
                });
                const data = await res.json().catch(() => ({}));
                if (!res.ok) throw new Error(data?.error || "Login failed");
                localStorage.setItem("ow_admin_token", data.token);
                onAuthed();
              } catch (e) {
                setErr(e.message || "Login failed");
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </Button>

          <div className="pt-2">
            <a href="#/" className={cx("text-sm underline underline-offset-4 opacity-75 hover:opacity-100", dark ? "text-white" : "text-neutral-900")}>
              Back to site
            </a>
          </div>
        </div>
      </MobileCard>
    </div>
  );
}

function AdminDashboardPageMobile({ dark, t }) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("ow_admin_token") : null;

  const [items, setItems] = useState([]);
  const [messages, setMessages] = useState([]);

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  const [msgErr, setMsgErr] = useState("");
  const [msgLoading, setMsgLoading] = useState(true);

  const [bookingEnabled, setBookingEnabled] = useState(true);
  const [bookingBusy, setBookingBusy] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/settings/booking`);
        const data = await res.json();
        if (!res.ok) throw new Error();
        if (alive) setBookingEnabled(!!data.enabled);
      } catch {}
    })();
    return () => (alive = false);
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setErr("");
      try {
        const res = await fetch(`${API_BASE}/appointments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to load appointments");
        if (alive) setItems(data.items || []);
      } catch (e) {
        if (alive) setErr(e.message || "Failed to load appointments");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [token]);

  useEffect(() => {
    let alive = true;
    (async () => {
      setMsgLoading(true);
      setMsgErr("");
      try {
        const resM = await fetch(`${API_BASE}/messages`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataM = await resM.json();
        if (!resM.ok) throw new Error(dataM?.error || "Failed to load messages");
        if (alive) setMessages(dataM.items || []);
      } catch (e) {
        if (alive) setMsgErr(e.message || "Failed to load messages");
      } finally {
        if (alive) setMsgLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [token]);

  const toggleBooking = async () => {
    try {
      setBookingBusy(true);
      const next = !bookingEnabled;

      const res = await fetch(`${API_BASE}/settings/booking`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ enabled: next }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Failed to update");
      setBookingEnabled(!!data.enabled);
    } catch (e) {
      alert(e.message || "Failed");
    } finally {
      setBookingBusy(false);
    }
  };

  const deleteAppt = async (id) => {
    const sure = window.confirm(t.langToggleHint === "Język" ? "Usunąć rezerwację?" : "Delete this appointment?");
    if (!sure) return;

    try {
      const res = await fetch(`${API_BASE}/appointments/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Delete failed");
      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch (e) {
      alert(e.message || "Delete failed");
    }
  };

  const deleteMessage = async (id) => {
    const sure = window.confirm(t.langToggleHint === "Język" ? "Usunąć wiadomość?" : "Delete this message?");
    if (!sure) return;

    try {
      const res = await fetch(`${API_BASE}/messages/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Delete failed");
      setMessages((prev) => prev.filter((x) => x.id !== id));
    } catch (e) {
      alert(e.message || "Delete failed");
    }
  };

  return (
    <div className="px-4 py-8 space-y-6">
      <MobileCard dark={dark}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 style={{ fontFamily: "var(--ow-display)", fontWeight: 650, letterSpacing: "-0.02em" }} className="text-2xl">
              {t.dashboard}
            </h1>
            <p className="text-sm opacity-75 mt-1">Manage booking requests.</p>
          </div>
          <Button
            variant="outline"
            className={cx("rounded-full px-4 py-2 text-[12px]", dark ? "" : "border-black/10 bg-white")}
            onClick={() => {
              localStorage.removeItem("ow_admin_token");
              window.location.hash = "#/admin/login";
            }}
          >
            Log out
          </Button>
        </div>

        <div className="mt-4 grid gap-3">
          <Button
            variant="outline"
            className={cx("rounded-full py-3 w-full", dark ? "" : "border-black/10 bg-white")}
            onClick={() => (window.location.hash = "#/")}
          >
            Back to site
          </Button>

          <Button
            variant="outline"
            className={cx("rounded-full py-3 w-full", dark ? "" : "border-black/10 bg-white")}
            onClick={toggleBooking}
            disabled={bookingBusy}
          >
            {bookingBusy
              ? (t.langToggleHint === "Język" ? "Zapisywanie..." : "Saving...")
              : bookingEnabled
              ? (t.langToggleHint === "Język" ? "Wyłącz rezerwacje" : "Disable bookings")
              : (t.langToggleHint === "Język" ? "Włącz rezerwacje" : "Enable bookings")}
          </Button>
        </div>
      </MobileCard>

      <MobileCard dark={dark}>
        <SectionTitle>{t.langToggleHint === "Język" ? "Rezerwacje" : "Appointments"}</SectionTitle>
        <p className="text-sm opacity-75 mt-1 mb-4">
          {t.langToggleHint === "Język" ? "Lista zgłoszeń rezerwacji." : "Booking requests list."}
        </p>

        {loading ? (
          <div className="opacity-80">Loading…</div>
        ) : err ? (
          <div className={cx("text-sm", dark ? "text-red-300" : "text-red-600")}>{err}</div>
        ) : items.length === 0 ? (
          <div className="opacity-70 text-sm">No booking requests yet.</div>
        ) : (
          <div className="grid gap-3">
            {items.map((it) => (
              <div
                key={it.id}
                className={cx(
                  "rounded-2xl border p-4",
                  dark ? "border-white/10 bg-white/[0.04]" : "border-black/10 bg-black/[0.02]"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{it.name}</div>
                    <div className="text-xs opacity-70 mt-1">
                      {it.date} · {it.time} {it.context ? `· ${it.context}` : ""}
                    </div>
                    <div className="text-xs opacity-70 mt-1">
                      {it.phone} {it.email ? `· ${it.email}` : ""}
                    </div>
                    <div className="text-[11px] opacity-60 mt-2">
                      {it.created_at ? new Date(it.created_at).toLocaleString() : "-"}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className={cx("rounded-full px-4 py-2 text-[12px]", dark ? "" : "border-black/10 bg-white")}
                    onClick={() => deleteAppt(it.id)}
                  >
                    {t.langToggleHint === "Język" ? "Usuń" : "Delete"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </MobileCard>

      <MobileCard dark={dark}>
        <SectionTitle>{t.langToggleHint === "Język" ? "Wiadomości" : "Messages"}</SectionTitle>
        <p className="text-sm opacity-75 mt-1 mb-4">
          {t.langToggleHint === "Język" ? "Wiadomości z formularza kontaktowego." : "Messages from the contact form."}
        </p>

        {msgLoading ? (
          <div className="opacity-80">Loading…</div>
        ) : msgErr ? (
          <div className={cx("text-sm", dark ? "text-red-300" : "text-red-600")}>{msgErr}</div>
        ) : messages.length === 0 ? (
          <div className="opacity-70 text-sm">{t.langToggleHint === "Język" ? "Brak wiadomości." : "No messages yet."}</div>
        ) : (
          <div className="grid gap-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cx(
                  "rounded-2xl border p-4",
                  dark ? "border-white/10 bg-white/[0.04]" : "border-black/10 bg-black/[0.02]"
                )}
              >
                <div className="font-semibold">{m.name}</div>
                <div className="text-xs opacity-70 mt-1">{m.email}</div>
                <div className="text-sm opacity-85 mt-3 whitespace-pre-wrap break-words">{m.message}</div>

                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    className={cx("rounded-full px-4 py-2 text-[12px]", dark ? "" : "border-black/10 bg-white")}
                    onClick={() => deleteMessage(m.id)}
                  >
                    {t.langToggleHint === "Język" ? "Usuń" : "Delete"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </MobileCard>
    </div>
  );
}

/* ================= MOBILE PAGES ================= */
function MobileHomePage({ onBook, dark, t, categories }) {
  return (
    <div className="pb-6">
      <HeroBackdrop
        bgImage={BACKGROUNDS.home}
        dark={dark}
        accent="from-[#8fb8ae] via-[#7aa89f] to-[#6b988f]"
        backdropHeightClass="min-h-[760px]"
        style={{ backgroundPosition: "center 35%" }}
      >
        <div className="px-5 pt-8">
          <motion.div initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: "easeOut" }}>
            <Title>{t.homeHeroTitle}</Title>
            <p className="mt-4 text-[14px] opacity-85 leading-relaxed">{t.homeHeroSubtitle}</p>

            <div className="mt-6 grid gap-3">
              <Button className="rounded-full w-full py-4" onClick={() => onBook(t.bookGeneral)}>
                {t.book}
              </Button>
              <div className="text-xs opacity-75 px-1">{t.homeHeroMeta}</div>
            </div>
          </motion.div>

          <div className="mt-8 grid gap-4">
            {categories.map((c) => (
              <NavLink key={c.key} to={`#/${c.key}`} className="block">
                <MobileCard dark={dark}>
                  <div className="text-[11px] uppercase tracking-[0.22em] opacity-60">{c.subtitle}</div>
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
                  <div className="mt-2 text-[13.5px] opacity-85 leading-relaxed line-clamp-3">{c.description}</div>

                  <div className="mt-4 inline-flex items-center gap-2 text-sm opacity-85">
                    <span className={cx("h-px w-10", dark ? "bg-white/30" : "bg-neutral-300")} />
                    <span>{t.open}</span>
                  </div>
                </MobileCard>
              </NavLink>
            ))}
          </div>

          <QuoteBandMobile quote={t.homeQuoteBand} />
        </div>
      </HeroBackdrop>
    </div>
  );
}

function MobileCategoryPage({ category, onBook, dark, t }) {
  const quote =
    category.key === "yoga" ? t.quote.yoga_1 : category.key === "education" ? t.quote.education : t.quote.wellness_home;

  return (
    <div className="pb-8">
      <HeroBackdrop bgImage={category.heroImage} dark={dark} accent={category.accent} backdropHeightClass="min-h-[720px]">
        <div className="px-5 pt-8">
          <Title>{category.title}</Title>
          <p className="mt-4 text-[14px] opacity-85 leading-relaxed">{category.description}</p>

          <div className="mt-6 grid gap-3">
            <Button className="rounded-full w-full py-4" onClick={() => onBook(category.title)}>
              {t.book}
            </Button>
            <NavLink to="#/">
              <Button variant="outline" className={cx("rounded-full w-full py-4", dark ? "" : "border-black/10 bg-white")}>
                {t.backToHome}
              </Button>
            </NavLink>
          </div>

          <div className="mt-10">
            <QuoteBandMobile quote={quote} />
          </div>

          <div className="grid gap-4 pb-10">
            {category.children.map((ch) => (
              <NavLink key={ch.route} to={ch.route} className="block">
                <MobileCard dark={dark}>
                  <div
                    style={{
                      fontFamily: "var(--ow-display)",
                      fontWeight: 650,
                      letterSpacing: "-0.02em",
                      fontSize: "20px",
                    }}
                  >
                    {ch.title}
                  </div>
                  <p className="mt-2 text-[13.5px] opacity-85 leading-relaxed line-clamp-3">{ch.blurb}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm opacity-85">
                    <span className={cx("h-px w-10", dark ? "bg-white/30" : "bg-neutral-300")} />
                    <span>{t.open}</span>
                  </div>
                </MobileCard>
              </NavLink>
            ))}
          </div>
        </div>
      </HeroBackdrop>
    </div>
  );
}

function MobileWellnessCatalogPage({ category, onBook, dark, t }) {
  const groups = t.wellnessCatalog?.groups || [];
  const quote = t.quote.wellness_home;

  return (
    <div className="pb-8">
      <HeroBackdrop bgImage={category.heroImage} dark={dark} accent={category.accent} backdropHeightClass="min-h-[720px]">
        <div className="px-5 pt-8">
          <Title>{t.wellnessCatalog?.title || category.title}</Title>
          <p className="mt-4 text-[14px] opacity-85 leading-relaxed">{t.wellnessCatalog?.subtitle || category.description}</p>

          <div className="mt-6 grid gap-3">
            <NavLink to="#/">
              <Button className="rounded-full w-full py-4">{t.backToHome}</Button>
            </NavLink>
          </div>

          <QuoteBandMobile quote={quote} />

          <div className="grid gap-4 pb-10">
            {groups.map((g) => (
              <MobileCard key={g.title} dark={dark}>
                <div style={{ fontFamily: "var(--ow-display)", fontWeight: 650 }} className="text-[20px]">
                  {g.title}
                </div>

                <div className="mt-4 grid gap-3">
                  {g.items.map((it) => (
                    <button
                      key={it.id}
                      onClick={() => onBook(it.name)}
                      className={cx(
                        "w-full text-left rounded-2xl border px-4 py-4 transition",
                        dark ? "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]" : "border-black/10 bg-white hover:bg-black/[0.02]"
                      )}
                    >
                      <div className="font-semibold tracking-tight">{it.name}</div>
                      <div className="text-xs opacity-70 mt-1">{it.duration || t.bookingDuration}</div>
                      <div className="text-[13px] opacity-75 mt-3 line-clamp-2">{it.desc}</div>
                      <div className="mt-3 text-sm opacity-85">{t.book}</div>
                    </button>
                  ))}
                </div>

                <div className="mt-5">
                  <Button className="rounded-full w-full py-4" onClick={() => onBook(t.bookGeneral)}>
                    {t.bookGeneral}
                  </Button>
                </div>
              </MobileCard>
            ))}
          </div>
        </div>
      </HeroBackdrop>
    </div>
  );
}

function MobileSubTopicPage({ category, sub, onBook, dark, t, products }) {
  const isWellness = category.key === "wellness";
  const filtered = useMemo(() => products.filter((p) => p.for === sub.key), [products, sub.key]);

  const bodyBlocks = useMemo(() => {
    if (category.key === "education") {
      if (sub.key === "no-sugar-adults") return t.subBlocks.noSugarAdults;
      if (sub.key === "no-sugar-kids") return t.subBlocks.noSugarKids;
      if (sub.key === "whats-up-body-kids") return t.subBlocks.whatsUpBodyKids;
      if (sub.key === "whats-up-body-adults") return t.subBlocks.whatsUpBodyAdults;
      if (sub.key === "no-upf-adults") return t.subBlocks.noUPFAdults;
      if (sub.key === "tox-free") return t.subBlocks.toxFree;
      return t.subBlocks.educationDefault;
    }
    if (category.key === "yoga") return t.subBlocks.yoga;
    return t.subBlocks.wellness;
  }, [category.key, sub.key, t]);

  const quote =
    category.key === "yoga" ? t.quote.yoga_2 : category.key === "education" ? t.quote.education : t.quote.wellness_home;

  return (
    <div className="pb-8">
      <HeroBackdrop bgImage={category.heroImage} dark={dark} accent={category.accent} backdropHeightClass="min-h-[720px]">
        <div className="px-5 pt-8">
          <Title>{sub.title}</Title>
          <p className="mt-4 text-[14px] opacity-85 leading-relaxed">{sub.blurb}</p>

          <div className="mt-6 grid gap-3">
            {isWellness ? (
              <NavLink to={`#/${category.key}`}>
                <Button className="rounded-full w-full py-4">{t.browseMore}</Button>
              </NavLink>
            ) : (
              <Button className="rounded-full w-full py-4" onClick={() => onBook(sub.title)}>
                {t.book}
              </Button>
            )}

            <NavLink to={`#/${category.key}`}>
              <Button variant="outline" className={cx("rounded-full w-full py-4", dark ? "" : "border-black/10 bg-white")}>
                {t.back}
              </Button>
            </NavLink>
          </div>

          <QuoteBandMobile quote={quote} />

          <div className="grid gap-4 pb-10">
            {bodyBlocks.map((b) => {
              const text = b.textKey ? t.copy[b.textKey] : b.text;
              return (
                <MobileCard key={b.title} dark={dark}>
                  <div className={cx("h-1 w-14 mb-4 bg-gradient-to-r", CARD_LINE)} />
                  <div style={{ fontFamily: "var(--ow-display)", fontWeight: 650 }} className="text-[20px]">
                    {b.title}
                  </div>
                  <p className="mt-2 text-[13.5px] opacity-85 leading-relaxed">{text}</p>
                </MobileCard>
              );
            })}
          </div>

          {isWellness ? (
            <div className="pb-10">
              <MobileCard dark={dark}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] opacity-60">{t.subProductsTitle}</p>
                    <p className="text-sm opacity-75">{t.subProductsSub}</p>
                  </div>
                  <div className={cx("h-1 w-24 rounded-full bg-gradient-to-r", category.accent)} />
                </div>

                <div className="mt-4 grid gap-3">
                  {filtered.map((p) => (
                    <div
                      key={p.id}
                      className={cx(
                        "rounded-2xl border p-4",
                        dark ? "border-white/10 bg-white/[0.04]" : "border-black/10 bg-black/[0.02]"
                      )}
                    >
                      <div style={{ fontFamily: "var(--ow-display)", fontWeight: 650 }} className="text-[18px]">
                        {p.title}
                      </div>
                      <div className="text-sm opacity-70 mt-1">{p.tone}</div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="font-semibold">{p.price}</div>
                        <Button variant="outline" className={cx("rounded-full px-4 py-2 text-[12px]", dark ? "" : "border-black/10 bg-white")}>
                          {t.view}
                        </Button>
                      </div>
                    </div>
                  ))}
                  {filtered.length === 0 ? <div className="opacity-75 text-sm">{t.noProducts}</div> : null}
                </div>
              </MobileCard>
            </div>
          ) : null}
        </div>
      </HeroBackdrop>
    </div>
  );
}

/* ================= ROUTE PARSER (FULL FIX) ================= */
function parseRoute(hash, categories) {
  if (hash === "#/" || hash === "#" || !hash) return { page: "home" };

  const parts = hash.replace(/^#\//, "").split("/");

  // ✅ Admin routes
  if (parts[0] === "admin") {
    if (parts[1] === "login") return { page: "admin_login" };
    if (parts[1] === "dashboard") return { page: "admin_dashboard" };
    return { page: "admin_login" };
  }

  const catKey = parts[0];
  const subKey = parts[1];

  const category = categories.find((c) => c.key === catKey);
  if (!category) return { page: "home" };

  if (!subKey) return { page: "category", category };

  const route = `#/${category.key}/${subKey}`;
  const sub = category.children.find((c) => c.route === route);

  if (!sub) return { page: "category", category };
  return { page: "sub", category, sub };
}

/* ================= APP MOBILE (FULL WORKING) ================= */
export default function AppMobile() {
  const route = useHashRoute();

  const [lang, setLang] = useState(getInitialLang());
  const safeLang = lang === "pl" || lang === "en" ? lang : "pl";
  const t = I18N[safeLang] || I18N.pl;

  const categories = useMemo(() => buildCategories(t), [t]);
  const products = useMemo(() => buildProducts(t), [t]);

  const parsed = useMemo(() => parseRoute(route, categories), [route, categories]);

  const [dark, setDark] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingContext, setBookingContext] = useState(t.book);
  const [contactOpen, setContactOpen] = useState(false);

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

  const token =
    typeof window !== "undefined" ? localStorage.getItem("ow_admin_token") : null;

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
          {parsed.page === "home" ? (
            <MobileHomePage onBook={openBooking} dark={dark} t={t} categories={categories} />
          ) : null}

          {parsed.page === "category" && parsed.category ? (
            parsed.category.key === "wellness" ? (
              <MobileWellnessCatalogPage category={parsed.category} onBook={openBooking} dark={dark} t={t} />
            ) : (
              <MobileCategoryPage category={parsed.category} onBook={openBooking} dark={dark} t={t} />
            )
          ) : null}

          {parsed.page === "sub" && parsed.category && parsed.sub ? (
            <MobileSubTopicPage
              category={parsed.category}
              sub={parsed.sub}
              onBook={openBooking}
              dark={dark}
              t={t}
              products={products}
            />
          ) : null}

          {parsed.page === "admin_login" ? (
            <AdminLoginPageMobile
              dark={dark}
              onAuthed={() => {
                window.location.hash = "#/admin/dashboard";
              }}
            />
          ) : null}

          {parsed.page === "admin_dashboard" ? (
            token ? (
              <AdminDashboardPageMobile dark={dark} t={t} />
            ) : (
              <AdminLoginPageMobile
                dark={dark}
                onAuthed={() => {
                  window.location.hash = "#/admin/dashboard";
                }}
              />
            )
          ) : null}
        </motion.div>
      </AnimatePresence>

      <BookingModalMobile
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        contextTitle={bookingContext}
        t={t}
        dark={dark}
      />

      {/* Contact popup only on Education pages (same rule as desktop) */}
      {parsed.page !== "admin_login" &&
      parsed.page !== "admin_dashboard" &&
      parsed.page !== "home" &&
      parsed.category?.key === "education" ? (
        <ContactPopupMobile
          open={contactOpen}
          onOpen={() => setContactOpen(true)}
          onClose={() => setContactOpen(false)}
          dark={dark}
          t={t}
        />
      ) : null}
    </MobileShell>
  );
}