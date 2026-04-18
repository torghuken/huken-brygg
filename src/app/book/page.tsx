"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

const floorConfig = {
  gastro: {
    id: "gastro",
    label: "The Gastro Bar",
    short: "Gastro Bar",
    tagNo: "Mat & drikke",
    tagEn: "Food & drinks",
    floorNo: "1. etasje",
    floorEn: "1st floor",
    ghostText: "GASTRO",
    accent: "#c8a04c",
    accentRgb: "200,160,76",
    bg: "#1a1208",
    glow: "radial-gradient(ellipse at 30% 70%, rgba(200,160,76,0.08) 0%, transparent 55%)",
  },
  lounge: {
    id: "lounge",
    label: "The Cocktail Lounge",
    short: "Lounge",
    tagNo: "Cocktails",
    tagEn: "Cocktails",
    floorNo: "2. etasje",
    floorEn: "2nd floor",
    ghostText: "LOUNGE",
    accent: "#c9a84c",
    accentRgb: "201,168,76",
    bg: "#0c0a14",
    glow: "radial-gradient(ellipse at 70% 60%, rgba(201,168,76,0.07) 0%, transparent 50%)",
  },
  underground: {
    id: "underground",
    label: "The Underground",
    short: "Underground",
    tagNo: "Fest & events",
    tagEn: "Party & events",
    floorNo: "Kjelleren",
    floorEn: "Basement",
    ghostText: "UNDER\nGROUND",
    accent: "#c84466",
    accentRgb: "200,68,102",
    bg: "#050505",
    glow: "radial-gradient(ellipse at 50% 80%, rgba(155,27,48,0.09) 0%, transparent 45%)",
  },
} as const;

type FloorId = keyof typeof floorConfig;

const texts = {
  no: {
    title: "Reserver",
    date: "Dato",
    time: "Tid",
    guests: "Gjester",
    name: "Ditt navn",
    phone: "Mobilnummer",
    email: "E-post",
    submit: "Bekreft reservasjon",
    success: "Reservasjonen er mottatt",
    successSub: "Du vil motta en bekreftelse på SMS.",
    back: "Tilbake",
    another: "Ny reservasjon",
  },
  en: {
    title: "Reserve",
    date: "Date",
    time: "Time",
    guests: "Guests",
    name: "Your name",
    phone: "Phone number",
    email: "Email",
    submit: "Confirm reservation",
    success: "Reservation received",
    successSub: "You will receive a confirmation via SMS.",
    back: "Back",
    another: "New reservation",
  },
};

const fade = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.1 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

function BookingForm() {
  const searchParams = useSearchParams();
  const [lang, setLang] = useState<"no" | "en">("no");
  const [selectedFloor, setSelectedFloor] = useState<FloorId>("gastro");
  const [guestCount, setGuestCount] = useState(2);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    date: "", time: "", name: "", phone: "", email: "",
  });
  const t = texts[lang];
  const fl = floorConfig[selectedFloor];

  useEffect(() => {
    const f = searchParams.get("floor") as FloorId | null;
    if (f && f in floorConfig) setSelectedFloor(f);
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          floor: selectedFloor, date: formData.date, time: formData.time,
          guests: guestCount, name: formData.name, phone: formData.phone,
          email: formData.email, notes: "",
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Noe gikk galt");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Noe gikk galt");
    } finally {
      setSubmitting(false);
    }
  }

  /* ── Success ── */
  if (submitted) {
    return (
      <motion.div className="book-page flex-col items-center justify-center text-center px-8"
        style={{ background: fl.bg, display: "flex" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: fl.glow }} />
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6 flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 rounded-full" style={{ border: `1px solid rgba(${fl.accentRgb}, 0.3)` }} />
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" stroke={fl.accent} strokeWidth="1.5">
            <path d="M6 14L12 20L22 8" /></svg>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="font-instrument text-3xl text-white tracking-wide">{t.success}</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="font-cormorant mt-3 text-lg tracking-wider"
          style={{ color: `rgba(${fl.accentRgb}, 0.5)` }}>{t.successSub}</motion.p>
      </motion.div>
    );
  }

  /* ── Form ── */
  return (
    <div className="book-page" style={{ background: fl.bg, transition: "background 0.8s ease" }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none transition-all duration-1000" style={{ background: fl.glow }} />

      {/* Ghost type */}
      <AnimatePresence mode="wait">
        <motion.div key={selectedFloor} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className={`${selectedFloor === "underground" ? "font-bebas" : selectedFloor === "lounge" ? "font-cormorant" : "font-lora"} text-center leading-[0.8] whitespace-pre-line`}
            style={{ fontSize: "clamp(8rem, 30vw, 20rem)", color: `rgba(${fl.accentRgb}, 0.025)` }}>
            {fl.ghostText}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Lang toggle */}
      <div className="lang-toggle">
        <button className={lang === "no" ? "active" : ""} onClick={() => setLang("no")}>NO</button>
        <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
        <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
      </div>

      {/* Main layout */}
      <div className="relative z-10 flex flex-col justify-center h-full mx-auto max-w-lg px-7 sm:px-10 gap-6 sm:gap-8">

        {/* Back link — absolute top */}
        <div className="absolute top-4 left-7 sm:left-10">
          <Link href="/" className="inline-flex items-center gap-2 font-cormorant text-xs tracking-[0.25em] uppercase text-white/25 transition hover:text-white/50">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1"><path d="M8 3L4 7L8 11" /></svg>
            {t.back}
          </Link>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h1 className="font-instrument text-[3.5rem] sm:text-7xl tracking-wide text-white leading-none">
            {t.title}
          </h1>
          <div className="mt-2 mx-auto h-px w-16 transition-colors duration-700"
            style={{ background: `rgba(${fl.accentRgb}, 0.4)` }} />
        </motion.div>

        {/* Form */}
        <motion.form onSubmit={handleSubmit} className="flex flex-col gap-[1.1rem] sm:gap-5" initial="hidden" animate="show">

          {/* Floor selector — 3 pill-like tabs */}
          <motion.div custom={0} variants={fade} className="flex gap-2">
            {(Object.keys(floorConfig) as FloorId[]).map((fId) => {
              const f = floorConfig[fId];
              const active = selectedFloor === fId;
              return (
                <button key={fId} type="button" onClick={() => setSelectedFloor(fId)}
                  className="flex-1 py-3 text-center font-cormorant tracking-[0.12em] uppercase transition-all duration-500"
                  style={{
                    color: active ? f.accent : "rgba(255,255,255,0.22)",
                    borderBottom: `2px solid ${active ? f.accent : "rgba(255,255,255,0.05)"}`,
                    transition: "all 0.5s ease",
                  }}>
                  <span className="text-[0.8rem] sm:text-sm block">{f.short}</span>
                  <span className="text-[0.55rem] sm:text-[0.65rem] tracking-[0.15em] block mt-0.5" style={{ opacity: active ? 0.6 : 0.35 }}>
                    {lang === "no" ? f.tagNo : f.tagEn}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Row 1: Date · Time · Guests */}
          <motion.div custom={1} variants={fade} className="grid grid-cols-3 gap-5">
            <div className="bk-field">
              <label className="bk-lbl" style={{ color: `rgba(${fl.accentRgb}, 0.7)` }}>{t.date}</label>
              <input type="date" required value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="bk-inp" style={{ borderColor: `rgba(${fl.accentRgb}, 0.25)` }} />
            </div>
            <div className="bk-field">
              <label className="bk-lbl" style={{ color: `rgba(${fl.accentRgb}, 0.7)` }}>{t.time}</label>
              <input type="time" required value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="bk-inp" style={{ borderColor: `rgba(${fl.accentRgb}, 0.25)` }} />
            </div>
            <div className="bk-field">
              <label className="bk-lbl" style={{ color: `rgba(${fl.accentRgb}, 0.7)` }}>{t.guests}</label>
              <div className="flex items-center justify-between mt-1">
                <button type="button" onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                  className="w-9 h-9 flex items-center justify-center font-cormorant text-xl rounded-full transition-colors duration-300"
                  style={{ color: `rgba(${fl.accentRgb}, 0.5)`, border: `1px solid rgba(${fl.accentRgb}, 0.15)` }}>−</button>
                <span className="font-instrument text-3xl" style={{ color: fl.accent, transition: "color 0.5s" }}>{guestCount}</span>
                <button type="button" onClick={() => setGuestCount(Math.min(20, guestCount + 1))}
                  className="w-9 h-9 flex items-center justify-center font-cormorant text-xl rounded-full transition-colors duration-300"
                  style={{ color: `rgba(${fl.accentRgb}, 0.5)`, border: `1px solid rgba(${fl.accentRgb}, 0.15)` }}>+</button>
              </div>
            </div>
          </motion.div>

          {/* Row 2: Name (full width) */}
          <motion.div custom={2} variants={fade} className="bk-field">
            <label className="bk-lbl" style={{ color: `rgba(${fl.accentRgb}, 0.7)` }}>{t.name}</label>
            <input type="text" autoComplete="name" required value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bk-inp" style={{ borderColor: `rgba(${fl.accentRgb}, 0.25)` }} />
          </motion.div>

          {/* Row 3: Phone · Email */}
          <motion.div custom={3} variants={fade} className="grid grid-cols-2 gap-5">
            <div className="bk-field">
              <label className="bk-lbl" style={{ color: `rgba(${fl.accentRgb}, 0.7)` }}>{t.phone}</label>
              <input type="tel" inputMode="tel" autoComplete="tel" required value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bk-inp" style={{ borderColor: `rgba(${fl.accentRgb}, 0.25)` }} />
            </div>
            <div className="bk-field">
              <label className="bk-lbl" style={{ color: `rgba(${fl.accentRgb}, 0.7)` }}>{t.email}</label>
              <input type="email" inputMode="email" autoComplete="email" value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bk-inp" style={{ borderColor: `rgba(${fl.accentRgb}, 0.25)` }} />
            </div>
          </motion.div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="font-cormorant text-base text-center" style={{ color: "#c84466" }}>{error}</motion.p>
            )}
          </AnimatePresence>

          {/* Submit */}
          <motion.div custom={4} variants={fade}>
            <button type="submit" disabled={submitting}
              className="group relative w-full overflow-hidden py-4 font-cormorant text-base sm:text-lg tracking-[0.25em] uppercase transition-all duration-500"
              style={{
                background: submitting ? "transparent" : `rgba(${fl.accentRgb}, 0.15)`,
                border: `1px solid rgba(${fl.accentRgb}, ${submitting ? 0.1 : 0.5})`,
                color: submitting ? `rgba(${fl.accentRgb}, 0.25)` : fl.accent,
              }}>
              <span className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: `rgba(${fl.accentRgb}, 0.12)` }} />
              <span className="relative">{submitting ? "···" : t.submit}</span>
            </button>
          </motion.div>
        </motion.form>

      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <BookingForm />
    </Suspense>
  );
}
