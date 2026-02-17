/* ================= OLIVIA WESTON — MOBILE/TABLET APP =================
- Reuses your content + data builders from App.jsx
- Mobile-first layout, better spacing, better cards
- Bottom-sheet booking & contact on phone
- Admin dashboard shows items as cards (not wide tables)
====================================================================== */

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Import shared content/builders from your existing App.jsx (no duplication)
import { I18N, buildCategories, buildProducts } from "./App.jsx";

/* ================= CONFIG ================= */
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080/api";
const CARD_LINE = "from-[#aab3c2] via-[#8e97a6] to-[#737d8a]";

function cx(...xs) {
  return xs.filter(Boolean).join(" ");
}

/* ================= BUTTON ================= */
function Button({ children, className = "", variant, ...props }) {
  const base =
    "inline-flex items-center justify-center text-[13px] sm:text-sm font-semibold transition rounded-full px-5 py-3 select-none focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.99]";
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

/* ================= HELPERS ================= */
function getInitialLang() {
  const saved = typeof window !== "undefined" ? window.localStorage.getItem("ow_lang") : null;
  if (saved === "pl" || saved === "en") return saved;
  return "pl";
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

/* ================= MOBILE SHELL ================= */
function ShellMobile({ dark, onToggleDark, lang, onToggleLang, t, children }) {
  const token = typeof window !== "undefined" ? localStorage.getItem("ow_admin_token") : null;

  return (
    <div
      className={cx(
        "min-h-screen transition-colors duration-700 antialiased",
        dark ? "bg-[#0b0f0f] text-neutral-100" : "bg-[#f5f7f7] text-neutral-900"
      )}
      style={{
        fontFamily: 'var(--ow-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Inter, Roboto, Arial',
        paddingBottom: "env(safe-area-inset-bottom)",
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

      {/* NAV */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-3">
        <div
          className={cx(
            "rounded-2xl border backdrop-blur",
            dark ? "bg-white/[0.06] border-white/10" : "bg-white/80 border-black/10"
          )}
        >
          <div className="flex items-center justify-between gap-2 px-4 py-3">
            <NavLink
              to="#/"
              className={cx(
                "tracking-[0.16em] text-[10px] sm:text-xs uppercase transition",
                "opacity-90 hover:opacity-100 whitespace-nowrap"
              )}
              style={{ fontFamily: "var(--ow-sans)" }}
            >
              {t.navBrand}
            </NavLink>

            <div className="flex items-center gap-2">
              {/* Lang toggle */}
              <div
                className={cx(
                  "inline-flex items-center rounded-full border overflow-hidden",
                  dark ? "bg-white/5 border-white/10" : "bg-white/70 border-black/10"
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

              {/* Dark */}
              <button
                onClick={onToggleDark}
                className={cx(
                  "rounded-full border px-3 py-2 text-[12px] font-semibold transition",
                  dark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5"
                )}
              >
                {dark ? t.darkToggleLight : t.darkToggleDark}
              </button>

              {/* Admin */}
              {token ? (
                <NavLink to="#/admin/dashboard" className="inline-flex">
                  <button
                    className={cx(
                      "rounded-full border px-3 py-2 text-[12px] font-semibold transition",
                      dark ? "border-white/10 hover:bg-white/10" : "border-black/10 bg-white hover:bg-black/5"
                    )}
                  >
                    {t.dashboard}
                  </button>
                </NavLink>
              ) : (
                <NavLink to="#/admin/login" className="inline-flex">
                  <button
                    className={cx(
                      "rounded-full border px-3 py-2 text-[12px] font-semibold transition",
                      dark ? "border-white/10 hover:bg-white/10" : "border-black/10 bg-white hover:bg-black/5"
                    )}
                  >
                    {t.admin}
                  </button>
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </header>

      {children}

      <footer className="max-w-6xl mx-auto px-4 sm:px-6 py-10 opacity-70 text-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="tracking-tight">{t.footerTagline}</p>
          <p className="tracking-tight">{t.footerCopyright(new Date().getFullYear())}</p>
        </div>
      </footer>
    </div>
  );
}

/* ================= HERO BACKDROP ================= */
function HeroBackdrop({ bgImage, dark, accent, style, children }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        minHeight: "860px",
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

      <div className={dark ? "absolute inset-0 bg-black/45" : "absolute inset-0 bg-white/20"} />
      <div
        className={
          dark
            ? "absolute inset-0 bg-gradient-to-b from-black/70 via-black/25 to-black/10"
            : "absolute inset-0 bg-gradient-to-b from-white/85 via-white/30 to-white/10"
        }
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(255,255,255,0.25),transparent_65%)]" />

      <div className="relative z-10">{children}</div>

      <div
        className={
          dark
            ? "pointer-events-none absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-b from-transparent via-[#0b0f0f]/55 to-[#0b0f0f]"
            : "pointer-events-none absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-b from-transparent via-[#f5f7f7]/65 to-[#f5f7f7]"
        }
      />
    </div>
  );
}

/* ================= MOBILE HERO ================= */
function HeroMobile({ title, subtitle, primary, secondary }) {
  return (
    <section className="relative">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-6">
        <div className="max-w-xl">
          <motion.h1
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="mb-5 leading-[0.98]"
            style={{
              fontFamily: "var(--ow-display)",
              letterSpacing: "-0.03em",
              fontWeight: 650,
              fontSize: "clamp(34px, 9vw, 58px)",
            }}
          >
            {title}
          </motion.h1>

          <p className="text-[14px] sm:text-[15px] opacity-85 leading-relaxed mb-6 tracking-[-0.01em]">
            {subtitle}
          </p>

          <div className="flex flex-col gap-3 items-start">
            {primary}
            {secondary}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= MOBILE GRID ================= */
function InfoGridMobile({ items, dark, t }) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((it) => (
          <motion.div
            key={it.to}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="h-full"
          >
            <NavLink to={it.to} className="block h-full">
              <div
                className={cx(
                  "h-full rounded-[1.6rem] overflow-hidden flex flex-col border shadow-[0_18px_50px_-38px_rgba(0,0,0,.55)]",
                  dark ? "bg-white/[0.06] backdrop-blur border-white/10" : "bg-white/80 backdrop-blur border-black/10"
                )}
              >
                <div className={cx("h-[5px] w-full bg-gradient-to-r", CARD_LINE)} />
                <div className="p-6 flex flex-col h-full">
                  <div className="flex-1">
                    <h3
                      className="mb-2 leading-tight"
                      style={{
                        fontFamily: "var(--ow-display)",
                        letterSpacing: "-0.02em",
                        fontWeight: 650,
                        fontSize: "20px",
                      }}
                    >
                      {it.title}
                    </h3>

                    {it.meta ? (
                      <p className="text-[10px] uppercase tracking-[0.22em] opacity-60 mb-3">
                        {it.meta}
                      </p>
                    ) : null}

                    {it.quote ? (
                      <p className="text-[13px] italic opacity-80 leading-relaxed mb-3">{it.quote}</p>
                    ) : null}

                    <p className="text-[13.5px] opacity-85 leading-relaxed tracking-[-0.01em]">{it.desc}</p>
                  </div>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm opacity-85">
                    <span className={cx("h-px w-10", dark ? "bg-white/30" : "bg-neutral-300")} />
                    <span>{t.open}</span>
                  </div>
                </div>
              </div>
            </NavLink>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function QuoteBandMobile({ quote }) {
  return (
    <section className="py-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(142,151,166,0.16),transparent_60%)]" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="leading-snug"
          style={{
            fontFamily: "var(--ow-display)",
            letterSpacing: "-0.02em",
            fontWeight: 600,
            fontSize: "clamp(18px, 4.6vw, 28px)",
          }}
        >
          {quote}
        </motion.p>
      </div>
    </section>
  );
}

/* ================= BOOKING MODAL (BOTTOM SHEET) ================= */
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

function BookingModalMobile({ open, onClose, contextTitle, t }) {
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

    return () => (alive = false);
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

    return () => (alive = false);
  }, [open, pickedDate, contextTitle]);

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

  if (!open) return null;

  const sendingLabel = t.langToggleHint === "Język" ? "Wysyłanie…" : "Sending…";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/45" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className={cx(
          "relative w-full sm:w-[min(920px,92vw)] bg-white overflow-hidden shadow-[0_40px_120px_-60px_rgba(0,0,0,.7)]",
          "rounded-t-[2rem] sm:rounded-[2rem]",
          "max-h-[92vh] sm:max-h-[86vh]"
        )}
      >
        <div className="p-5 sm:p-8 border-b border-neutral-200 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3
              style={{ fontFamily: "var(--ow-display)", fontWeight: 650, letterSpacing: "-0.02em" }}
              className="text-xl sm:text-2xl truncate"
            >
              {t.bookingTitle}
            </h3>
            <p className="text-xs sm:text-sm opacity-70 mt-1 truncate">{contextTitle}</p>
          </div>

          <Button variant="ghost" onClick={onClose} className="hover:bg-black/5">
            {t.bookingClose}
          </Button>
        </div>

        <div className="p-5 sm:p-8 grid sm:grid-cols-2 gap-6 overflow-auto">
          {/* DAY */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] opacity-60 mb-3">{t.bookingSelectDay}</p>
            <div className="grid grid-cols-2 gap-2">
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
                    <div className="text-[11px] opacity-70">{t.bookingAvailable}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TIME + FORM */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] opacity-60 mb-3">{t.bookingSelectTime}</p>

            <div className="grid grid-cols-2 gap-2">
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
                    <div className="text-[11px] opacity-70">
                      {isTaken ? (t.langToggleHint === "Język" ? "Zajęte" : "Booked") : t.bookingDuration}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 grid gap-2">
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

            {!confirmed ? (
              <Button
                className="rounded-full w-full mt-4 py-4"
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
                      const firstFree = slots.find((x) => !taken.includes(x)) || null;
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
              <div className="rounded-2xl border border-neutral-200 p-4 mt-4">
                <p className="text-sm">
                  {t.bookingSent(pickedDate ? formatDateLabel(pickedDate) : "", pickedSlot || "")}
                </p>
                <p className="text-xs opacity-70 mt-1">{t.bookingProdNote}</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ================= CONTACT POPUP (BOTTOM SHEET) ================= */
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
      <div className="fixed bottom-[calc(16px+env(safe-area-inset-bottom))] right-4 z-40">
        {!open ? (
          <Button className="rounded-full px-6 py-4" onClick={onOpen}>
            {t.contact.open}
          </Button>
        ) : null}
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/45" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className={cx(
              "relative w-full sm:w-[min(560px,92vw)] overflow-hidden shadow-[0_40px_120px_-60px_rgba(0,0,0,.7)]",
              "rounded-t-[2rem] sm:rounded-[2rem]",
              dark ? "bg-[#0f1414] text-white" : "bg-white text-neutral-900"
            )}
          >
            <div className={cx("h-[5px] w-full bg-gradient-to-r", CARD_LINE)} />

            <div className={cx("p-5 sm:p-7 border-b", dark ? "border-white/10" : "border-black/10")}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3
                    style={{ fontFamily: "var(--ow-display)", fontWeight: 650, letterSpacing: "-0.02em" }}
                    className="text-xl sm:text-2xl truncate"
                  >
                    {t.contact.title}
                  </h3>
                  <p className="text-xs sm:text-sm opacity-70 mt-1">Education</p>
                </div>

                <Button variant="ghost" onClick={onClose} className={dark ? "hover:bg-white/10" : "hover:bg-black/5"}>
                  {t.contact.close}
                </Button>
              </div>
            </div>

            <div className="p-5 sm:p-7 grid gap-2">
              <input
                className={cx(
                  "rounded-2xl px-4 py-3 border outline-none",
                  dark ? "bg-white/[0.06] border-white/10" : "bg-white border-black/10"
                )}
                placeholder={t.contact.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className={cx(
                  "rounded-2xl px-4 py-3 border outline-none",
                  dark ? "bg-white/[0.06] border-white/10" : "bg-white border-black/10"
                )}
                placeholder={t.contact.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <textarea
                className={cx(
                  "rounded-2xl px-4 py-3 border outline-none min-h-[120px] resize-none",
                  dark ? "bg-white/[0.06] border-white/10" : "bg-white border-black/10"
                )}
                placeholder={t.contact.message}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              {err ? <p className={cx("text-sm", dark ? "text-red-300" : "text-red-600")}>{err}</p> : null}

              {!sent ? (
                <Button
                  className="rounded-full w-full mt-2 py-4"
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
                      const data = await res.json();
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
                <div className={cx("rounded-2xl border p-4 mt-2", dark ? "border-white/10" : "border-black/10")}>
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

/* ================= ADMIN (MOBILE FRIENDLY) ================= */
function AdminLoginPageMobile({ dark, onAuthed }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div
        className={cx(
          "rounded-[1.6rem] border p-6 sm:p-10 overflow-hidden",
          dark ? "bg-white/[0.06] border-white/10" : "bg-white/80 border-black/10"
        )}
      >
        <div className={cx("h-[5px] w-full rounded-full mb-6 bg-gradient-to-r", CARD_LINE)} />
        <h1 style={{ fontFamily: "var(--ow-display)", fontWeight: 650, letterSpacing: "-0.02em" }} className="text-2xl sm:text-3xl mb-2">
          Admin Login
        </h1>
        <p className="text-sm opacity-75 mb-6">Sign in to manage bookings.</p>

        <div className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-[0.22em] opacity-60">Email</label>
            <input
              className={cx(
                "mt-2 w-full rounded-2xl px-4 py-3 border outline-none",
                dark ? "bg-white/[0.06] border-white/10" : "bg-white border-black/10"
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
                dark ? "bg-white/[0.06] border-white/10" : "bg-white border-black/10"
              )}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
            />
          </div>

          {err ? <p className="text-sm text-red-400">{err}</p> : null}

          <Button
            className="rounded-full w-full py-4"
            onClick={async () => {
              setErr("");
              setLoading(true);
              try {
                const res = await fetch(`${API_BASE}/auth/login`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email, password }),
                });
                const data = await res.json();
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
            <a href="#/" className={cx("text-sm underline underline-offset-4 opacity-70 hover:opacity-100", dark ? "text-white" : "text-neutral-900")}>
              Back to site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboardPageMobile({ dark, t }) {
  const [items, setItems] = useState([]);
  const [messages, setMessages] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [msgErr, setMsgErr] = useState("");
  const [msgLoading, setMsgLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("ow_admin_token") : null;

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
    return () => (alive = false);
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
    return () => (alive = false);
  }, [token]);

  const deleteAppt = async (id) => {
    const sure = window.confirm(t.langToggleHint === "Język" ? "Usunąć rezerwację?" : "Delete this appointment?");
    if (!sure) return;

    try {
      const res = await fetch(`${API_BASE}/appointments/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
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
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Delete failed");
      setMessages((prev) => prev.filter((x) => x.id !== id));
    } catch (e) {
      alert(e.message || "Delete failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div>
          <h1 style={{ fontFamily: "var(--ow-display)", fontWeight: 650, letterSpacing: "-0.02em" }} className="text-2xl sm:text-3xl">
            {t.dashboard}
          </h1>
          <p className="text-sm opacity-75">Manage booking requests.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className={cx("rounded-full", dark ? "" : "border-black/10 bg-white")}
            onClick={() => (window.location.hash = "#/")}
          >
            Back
          </Button>
          <Button
            variant="outline"
            className={cx("rounded-full", dark ? "" : "border-black/10 bg-white")}
            onClick={() => {
              localStorage.removeItem("ow_admin_token");
              window.location.hash = "#/admin/login";
            }}
          >
            Log out
          </Button>
        </div>
      </div>

      {/* APPOINTMENTS */}
      <div
        className={cx(
          "rounded-[1.6rem] border overflow-hidden",
          dark ? "bg-white/[0.06] border-white/10" : "bg-white/80 border-black/10"
        )}
      >
        <div className={cx("h-[5px] w-full bg-gradient-to-r", CARD_LINE)} />
        <div className="p-5">
          <h2 style={{ fontFamily: "var(--ow-display)", fontWeight: 650 }} className="text-xl">
            {t.langToggleHint === "Język" ? "Rezerwacje" : "Bookings"}
          </h2>
          <p className="text-sm opacity-75 mt-1">
            {t.langToggleHint === "Język" ? "Lista zgłoszeń rezerwacji." : "List of booking requests."}
          </p>
        </div>

        {loading ? (
          <div className="p-5 opacity-80">Loading…</div>
        ) : err ? (
          <div className="p-5 text-red-400">{err}</div>
        ) : (
          <div className="p-5 grid gap-3">
            {items.map((it) => (
              <div
                key={it.id}
                className={cx(
                  "rounded-2xl border p-4",
                  dark ? "border-white/10 bg-white/[0.04]" : "border-black/10 bg-white"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold">{it.name}</div>
                    <div className="text-xs opacity-75 mt-1">
                      {it.date} · {it.time}
                    </div>
                    <div className="text-xs opacity-70 mt-2">
                      {it.phone} {it.email ? `· ${it.email}` : ""}
                    </div>
                    <div className="text-xs opacity-70 mt-2">
                      {t.langToggleHint === "Język" ? "Kontekst: " : "Context: "}
                      {it.context || "-"}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className={cx("rounded-full", dark ? "" : "border-black/10 bg-white")}
                    onClick={() => deleteAppt(it.id)}
                  >
                    {t.langToggleHint === "Język" ? "Usuń" : "Delete"}
                  </Button>
                </div>
              </div>
            ))}

            {items.length === 0 ? (
              <div className="opacity-70 text-sm">
                {t.langToggleHint === "Język" ? "Brak rezerwacji." : "No bookings yet."}
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* MESSAGES */}
      <div className="mt-6" />

      <div
        className={cx(
          "rounded-[1.6rem] border overflow-hidden",
          dark ? "bg-white/[0.06] border-white/10" : "bg-white/80 border-black/10"
        )}
      >
        <div className={cx("h-[5px] w-full bg-gradient-to-r", CARD_LINE)} />
        <div className="p-5">
          <h2 style={{ fontFamily: "var(--ow-display)", fontWeight: 650 }} className="text-xl">
            {t.langToggleHint === "Język" ? "Wiadomości" : "Messages"}
          </h2>
          <p className="text-sm opacity-75 mt-1">
            {t.langToggleHint === "Język" ? "Wiadomości z formularza kontaktowego." : "Messages from contact form."}
          </p>
        </div>

        {msgLoading ? (
          <div className="p-5 opacity-80">Loading…</div>
        ) : msgErr ? (
          <div className="p-5 text-red-400">{msgErr}</div>
        ) : (
          <div className="p-5 grid gap-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cx(
                  "rounded-2xl border p-4",
                  dark ? "border-white/10 bg-white/[0.04]" : "border-black/10 bg-white"
                )}
              >
                <div className="text-sm font-semibold">{m.name}</div>
                <div className="text-xs opacity-75 mt-1">{m.email}</div>
                <div className="text-sm opacity-85 mt-3 whitespace-pre-wrap">{m.message}</div>

                <div className="mt-3 flex justify-end">
                  <Button
                    variant="outline"
                    className={cx("rounded-full", dark ? "" : "border-black/10 bg-white")}
                    onClick={() => deleteMessage(m.id)}
                  >
                    {t.langToggleHint === "Język" ? "Usuń" : "Delete"}
                  </Button>
                </div>
              </div>
            ))}

            {messages.length === 0 ? (
              <div className="opacity-70 text-sm">
                {t.langToggleHint === "Język" ? "Brak wiadomości." : "No messages yet."}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= PUBLIC PAGES ================= */
function HomePageMobile({ onBook, dark, t, categories }) {
  const homeBg = categories?.[0]?.heroImage ? null : null; // unused; home has its own
  return (
    <div className="pb-4">
      <HeroBackdrop
        bgImage={categories?.[0]?.heroImage ? null : null}
        dark={dark}
        accent="from-[#8fb8ae] via-[#7aa89f] to-[#6b988f]"
        // We don't have BACKGROUNDS here; categories are built with heroImage, home not included.
        // So we use your Home page content without needing background here:
        style={{
          backgroundImage: "none",
        }}
      >
        {/* Mobile home needs the original home background. Use a safe trick: */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("${getHomeBackgroundFromCategories(categories)}")`,
            backgroundSize: "cover",
            backgroundPosition: "center 35%",
            opacity: 1,
          }}
        />
        <div className="absolute inset-0" style={{ background: dark ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.2)" }} />
        <div className="relative z-10">
          <HeroMobile
            title={t.homeHeroTitle}
            subtitle={t.homeHeroSubtitle}
            primary={
              <Button className="rounded-full px-10 py-4" onClick={() => onBook(t.bookGeneral)}>
                {t.book}
              </Button>
            }
            secondary={
              <div className="flex items-center gap-3 text-sm opacity-80 px-1">
                <span className={cx("h-px w-10", dark ? "bg-white/30" : "bg-neutral-300")} />
                <span className="tracking-tight">{t.homeHeroMeta}</span>
              </div>
            }
          />

          <InfoGridMobile
            t={t}
            dark={dark}
            items={categories.map((c) => ({
              title: c.title,
              desc: c.description,
              to: `#/${c.key}`,
              meta: c.subtitle,
              quote: c.key === "wellness" ? c.quote : null,
            }))}
          />

          <QuoteBandMobile quote={t.homeQuoteBand} />
        </div>
      </HeroBackdrop>
    </div>
  );
}

// Helper: safely grab your home background from your existing images
function getHomeBackgroundFromCategories(categories) {
  // Your App.jsx uses BACKGROUNDS.home. We can infer it by looking at the yoga/edu/wellness images?
  // Best: Use the same trick as App.jsx: the home background is always the one used on home.
  // Since we can’t import assets here without duplicating, simplest: read from DOM if you set it.
  // But we want it reliable: in your project, home.jpg lives at /src/assets/backgrounds/home.jpg
  // Vite can resolve it by URL:
  try {
    return new URL("./assets/backgrounds/home.jpg", import.meta.url).toString();
  } catch {
    return "";
  }
}

function WellnessCatalogPageMobile({ category, onBook, dark, t }) {
  const quote = t.quote.wellness_home;
  const groups = t.wellnessCatalog?.groups || [];

  return (
    <div className="pb-8">
      <HeroBackdrop
        bgImage={category.heroImage}
        dark={dark}
        accent={category.accent}
        style={{ backgroundPosition: "center 47%" }}
      >
        <HeroMobile
          title={t.wellnessCatalog?.title || category.title}
          subtitle={t.wellnessCatalog?.subtitle || category.description}
          primary={
            <NavLink to="#/" className="inline-flex">
              <Button className="rounded-full px-10 py-4">{t.backToHome}</Button>
            </NavLink>
          }
          secondary={
            <div className="flex items-center gap-3 text-sm opacity-80 px-1">
              <span className={cx("h-px w-10", dark ? "bg-white/30" : "bg-neutral-300")} />
              <span className="tracking-tight">{category.subtitle}</span>
            </div>
          }
        />

        <QuoteBandMobile quote={quote} />

        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="grid gap-4">
            {groups.map((g) => (
              <div
                key={g.title}
                className={cx(
                  "rounded-[1.6rem] backdrop-blur border shadow-[0_18px_50px_-38px_rgba(0,0,0,.55)] overflow-hidden",
                  dark ? "bg-white/[0.06] border-white/10" : "bg-white/80 border-black/10"
                )}
              >
                <div className={cx("h-[5px] w-full bg-gradient-to-r", CARD_LINE)} />
                <div className="p-6">
                  <h3
                    className="mb-4 leading-tight"
                    style={{
                      fontFamily: "var(--ow-display)",
                      letterSpacing: "-0.02em",
                      fontWeight: 650,
                      fontSize: "20px",
                    }}
                  >
                    {g.title}
                  </h3>

                  <div className="grid gap-2">
                    {g.items.map((it) => (
                      <motion.button
                        key={it.id}
                        whileTap={{ scale: 0.99 }}
                        transition={{ type: "spring", stiffness: 260, damping: 22 }}
                        onClick={() => onBook(it.name)}
                        className={cx(
                          "w-full text-left rounded-2xl border px-4 py-4 transition flex items-start justify-between gap-3",
                          dark
                            ? "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]"
                            : "border-black/10 bg-white hover:bg-black/[0.02]"
                        )}
                      >
                        <div className="min-w-0">
                          <div className="font-semibold tracking-tight">{it.name}</div>
                          <div className="text-xs opacity-70 mt-1">{it.duration || t.bookingDuration}</div>
                          <div className="text-[13px] opacity-75 mt-2 line-clamp-2">{it.desc}</div>
                        </div>

                        <span className={cx("text-sm opacity-80 whitespace-nowrap", dark ? "text-white" : "text-neutral-900")}>
                          {t.book}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-10 text-center relative px-4 sm:px-6">
          <div className={cx("absolute left-1/2 -top-4 -translate-x-1/2 h-10 w-px", dark ? "bg-white/20" : "bg-neutral-300")} />
          <Button className="rounded-full px-10 py-4 w-full sm:w-auto" onClick={() => onBook(t.bookGeneral)}>
            {t.bookGeneral}
          </Button>
        </section>
      </HeroBackdrop>
    </div>
  );
}

function CategoryPageMobile({ category, onBook, dark, t }) {
  const categoryQuote =
    category.key === "yoga" ? t.quote.yoga_1 : category.key === "education" ? t.quote.education : t.quote.wellness_home;

  return (
    <div className="pb-8">
      <HeroBackdrop bgImage={category.heroImage} dark={dark} accent={category.accent} style={{ backgroundPosition: "center 47%" }}>
        <HeroMobile
          title={category.title}
          subtitle={category.description}
          primary={
            <Button className="rounded-full px-10 py-4 w-full sm:w-auto" onClick={() => onBook(category.title)}>
              {t.book}
            </Button>
          }
          secondary={
            <NavLink to="#/" className="inline-flex w-full sm:w-auto">
              <Button variant="outline" className={cx("rounded-full px-10 py-4 w-full", dark ? "" : "border-black/10 bg-white")}>
                {t.backToHome}
              </Button>
            </NavLink>
          }
        />

        <QuoteBandMobile quote={categoryQuote} />

        <InfoGridMobile
          t={t}
          dark={dark}
          items={category.children.map((ch) => ({
            title: ch.title,
            desc: ch.blurb,
            to: ch.route,
            meta: category.subtitle,
          }))}
        />
      </HeroBackdrop>
    </div>
  );
}

function SubTopicPageMobile({ category, sub, onBook, dark, t, products }) {
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

  const quoteForThisSubpage =
    category.key === "yoga" ? t.quote.yoga_2 : category.key === "education" ? t.quote.education : t.quote.wellness_home;

  return (
    <div className="pb-10">
      <HeroBackdrop bgImage={category.heroImage} dark={dark} accent={category.accent}>
        <HeroMobile
          title={sub.title}
          subtitle={sub.blurb}
          primary={
            isWellness ? (
              <NavLink to={`#/${category.key}`} className="inline-flex w-full sm:w-auto">
                <Button className="rounded-full px-10 py-4 w-full">{t.browseMore}</Button>
              </NavLink>
            ) : (
              <Button className="rounded-full px-10 py-4 w-full sm:w-auto" onClick={() => onBook(sub.title)}>
                {t.book}
              </Button>
            )
          }
          secondary={
            <NavLink to={`#/${category.key}`} className="inline-flex w-full sm:w-auto">
              <Button variant="outline" className={cx("rounded-full px-10 py-4 w-full", dark ? "" : "border-black/10 bg-white")}>
                {t.back}
              </Button>
            </NavLink>
          }
        />

        <QuoteBandMobile quote={quoteForThisSubpage} />

        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="grid gap-4">
            {bodyBlocks.map((b) => {
              const text = b.textKey ? t.copy[b.textKey] : b.text;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className={cx(
                    "rounded-[1.6rem] backdrop-blur border shadow-[0_18px_50px_-38px_rgba(0,0,0,.55)] p-6 overflow-hidden",
                    dark ? "bg-white/[0.06] border-white/10" : "bg-white/80 border-black/10"
                  )}
                >
                  <div className={cx("h-1 w-14 mb-5 bg-gradient-to-r", CARD_LINE)} />
                  <h3
                    className="mb-2 leading-tight"
                    style={{
                      fontFamily: "var(--ow-display)",
                      letterSpacing: "-0.02em",
                      fontWeight: 650,
                      fontSize: "20px",
                    }}
                  >
                    {b.title}
                  </h3>
                  <p className="text-[13.5px] opacity-85 leading-relaxed tracking-[-0.01em]">{text}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {isWellness ? (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] opacity-60">{t.subProductsTitle}</p>
                <p className="text-sm opacity-75 tracking-[-0.01em]">{t.subProductsSub}</p>
              </div>
              <div className={cx("h-1 w-28 rounded-full bg-gradient-to-r", category.accent)} />
            </div>

            <div className="grid sm:grid-cols-2 gap-4 items-stretch">
              {filtered.map((p) => (
                <motion.div
                  key={p.id}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="h-full"
                >
                  <div
                    className={cx(
                      "h-full rounded-[1.6rem] backdrop-blur border shadow-[0_18px_50px_-38px_rgba(0,0,0,.55)] overflow-hidden flex flex-col",
                      dark ? "bg-white/[0.06] border-white/10" : "bg-white/80 border-black/10"
                    )}
                  >
                    <div className={cx("h-[5px] w-full bg-gradient-to-r", CARD_LINE)} />
                    <div className={cx("h-32", dark ? "bg-white/[0.05]" : "bg-neutral-200/70")} aria-label={t.productImageAlt} />
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex-1">
                        <h4 style={{ fontFamily: "var(--ow-display)", fontWeight: 650, letterSpacing: "-0.02em" }} className="text-lg mb-1">
                          {p.title}
                        </h4>
                        <p className="text-sm opacity-70">{p.tone}</p>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <p className="font-semibold">{p.price}</p>
                        <Button variant="outline" className="rounded-full">
                          {t.view}
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {filtered.length === 0 ? (
                <div className={cx("rounded-[1.6rem] border p-6 opacity-80", dark ? "border-white/10 bg-white/[0.06]" : "border-black/10 bg-white/80")}>
                  {t.noProducts}
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        <section className="py-12 text-center relative px-4 sm:px-6">
          <div className={cx("absolute left-1/2 -top-6 -translate-x-1/2 h-12 w-px", dark ? "bg-white/20" : "bg-neutral-300")} />
          {isWellness ? (
            <NavLink to={`#/${category.key}`}>
              <Button className="rounded-full px-10 py-4 w-full sm:w-auto">{t.backTo(category.title)}</Button>
            </NavLink>
          ) : (
            <Button className="rounded-full px-10 py-4 w-full sm:w-auto" onClick={() => onBook(sub.title)}>
              {t.book}
            </Button>
          )}
        </section>
      </HeroBackdrop>
    </div>
  );
}

/* ================= ROUTE PARSER ================= */
function parseRoute(hash, categories) {
  if (hash === "#/" || hash === "#" || !hash) return { page: "home" };

  const parts = hash.replace(/^#\//, "").split("/");

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

/* ================= APP MOBILE ================= */
export default function AppMobile() {
  const route = useHashRoute();

  const [lang, setLang] = useState(getInitialLang());
  const t = I18N[lang];

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
  }, [lang]);

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

  const token = typeof window !== "undefined" ? localStorage.getItem("ow_admin_token") : null;

  return (
    <ShellMobile
      dark={dark}
      onToggleDark={() => setDark((d) => !d)}
      lang={lang}
      onToggleLang={toggleLang}
      t={t}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={route + "_" + lang}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {parsed.page === "home" ? <HomePageMobile onBook={openBooking} dark={dark} t={t} categories={categories} /> : null}

          {parsed.page === "category" && parsed.category ? (
            parsed.category.key === "wellness" ? (
              <WellnessCatalogPageMobile category={parsed.category} onBook={openBooking} dark={dark} t={t} />
            ) : (
              <CategoryPageMobile category={parsed.category} onBook={openBooking} dark={dark} t={t} />
            )
          ) : null}

          {parsed.page === "sub" && parsed.category && parsed.sub ? (
            <SubTopicPageMobile
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

      <BookingModalMobile open={bookingOpen} onClose={() => setBookingOpen(false)} contextTitle={bookingContext} t={t} />

      {/* Contact popup only on Education pages */}
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
    </ShellMobile>
  );
}