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
    labelNo: "The Gastro Bar",
    floorNo: "1. etasje",
    floorEn: "1st floor",
    ghostText: "GASTRO",
    accent: "#c8a04c",
    accentRgb: "200,160,76",
    bg: "#1a1208",
    bgRgb: "26,18,8",
    glow: "radial-gradient(ellipse at 30% 80%, rgba(200,160,76,0.06) 0%, transparent 60%)",
    fontClass: "font-lora italic",
  },
  lounge: {
    id: "lounge",
    label: "The Cocktail Lounge",
    labelNo: "The Cocktail Lounge",
    floorNo: "2. etasje",
    floorEn: "2nd floor",
    ghostText: "LOUNGE",
    accent: "#c9a84c",
    accentRgb: "201,168,76",
    bg: "#0c0a14",
    bgRgb: "12,10,20",
    glow: "radial-gradient(ellipse at 70% 70%, rgba(201,168,76,0.05) 0%, transparent 55%)",
    fontClass: "font-cormorant font-light tracking-wide",
  },
  underground: {
    id: "underground",
    label: "The Underground",
    labelNo: "The Underground",
    floorNo: "Kjelleren",
    floorEn: "Basement",
    ghostText: "UNDER\nGROUND",
    accent: "#c84466",
    accentRgb: "200,68,102",
    bg: "#050505",
    bgRgb: "5,5,5",
    glow: "radial-gradient(ellipse at 50% 90%, rgba(155,27,48,0.07) 0%, transparent 50%)",
    fontClass: "font-bebas tracking-[0.12em]",
  },
} as const;

type FloorId = keyof typeof floorConfig;

const texts = {
  no: {
    title: "Reserver",
    floor: "Velg etasje",
    date: "Dato",
    time: "Tidspunkt",
    guests: "Gjester",
    name: "Navn",
    phone: "Telefon",
    email: "E-post",
    notes: "Notater",
    notesPlaceholder: "Spesielle ønsker, allergier...",
    submit: "Bekreft reservasjon",
    success: "Reservasjonen er mottatt",
    successSub: "Du vil motta en bekreftelse på SMS.",
    back: "Tilbake",
    another: "Ny reservasjon",
    optional: "valgfritt",
  },
  en: {
    title: "Reserve",
    floor: "Choose floor",
    date: "Date",
    time: "Time",
    guests: "Guests",
    name: "Name",
    phone: "Phone",
    email: "Email",
    notes: "Notes",
    notesPlaceholder: "Special requests, allergies...",
    submit: "Confirm reservation",
    success: "Reservation received",
    successSub: "You will receive a confirmation via SMS.",
    back: "Back",
    another: "New reservation",
    optional: "optional",
  },
};

const rise = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
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
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });
  const t = texts[lang];
  const floor = floorConfig[selectedFloor];

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
          floor: selectedFloor,
          date: formData.date,
          time: formData.time,
          guests: guestCount,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          notes: formData.notes,
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

  /* ── Success state ── */
  if (submitted) {
    return (
      <motion.div
        className="fixed inset-0 flex flex-col items-center justify-center px-8 text-center"
        style={{ background: floor.bg }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: floor.glow }} />

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8 flex h-20 w-20 items-center justify-center"
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{ border: `1px solid rgba(${floor.accentRgb}, 0.3)` }}
          />
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke={floor.accent} strokeWidth="1.5">
            <path d="M6 14L12 20L22 8" />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="font-instrument text-3xl sm:text-4xl text-white tracking-wide"
        >
          {t.success}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="font-cormorant mt-4 text-base tracking-wider"
          style={{ color: `rgba(${floor.accentRgb}, 0.5)` }}
        >
          {t.successSub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex gap-4"
        >
          <Link href="/" className="cta" style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.4)" }}>
            {t.back}
          </Link>
          <button
            onClick={() => { setSubmitted(false); setFormData({ date: "", time: "", name: "", phone: "", email: "", notes: "" }); }}
            className="cta"
            style={{ borderColor: `rgba(${floor.accentRgb}, 0.4)`, color: floor.accent }}
          >
            {t.another}
          </button>
        </motion.div>
      </motion.div>
    );
  }

  /* ── Booking form ── */
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: floor.bg, transition: "background 0.8s ease" }}>
      {/* Ambient glow — shifts with floor */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{ background: floor.glow }}
      />

      {/* Ghost typography — floor name behind form */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedFloor}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        >
          <span
            className={`${selectedFloor === "underground" ? "font-bebas" : selectedFloor === "lounge" ? "font-cormorant" : "font-lora"} text-center leading-[0.8] whitespace-pre-line`}
            style={{
              fontSize: "clamp(8rem, 28vw, 22rem)",
              color: `rgba(${floor.accentRgb}, 0.03)`,
              letterSpacing: selectedFloor === "underground" ? "0.15em" : "0.05em",
            }}
          >
            {floor.ghostText}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Language toggle */}
      <div className="lang-toggle">
        <button className={lang === "no" ? "active" : ""} onClick={() => setLang("no")}>NO</button>
        <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
        <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-lg px-6 pb-20 pt-8 sm:px-8">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-cormorant text-[0.65rem] tracking-[0.4em] uppercase text-white/25 transition hover:text-white/50 mb-16 sm:mb-20"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M8 3L4 7L8 11" />
          </svg>
          {t.back}
        </Link>

        {/* Title */}
        <motion.div initial="hidden" animate="show" className="mb-14">
          <motion.h1
            custom={0}
            variants={rise}
            className="font-instrument text-5xl sm:text-6xl tracking-wide text-white"
          >
            {t.title}
          </motion.h1>
          <motion.div
            custom={1}
            variants={rise}
            className="mt-3 h-px w-12"
            style={{ background: `rgba(${floor.accentRgb}, 0.4)`, transition: "background 0.6s" }}
          />
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col gap-10"
          initial="hidden"
          animate="show"
        >

          {/* ── Floor selector ── */}
          <motion.div custom={1} variants={rise}>
            <label className="book-label" style={{ color: `rgba(${floor.accentRgb}, 0.5)` }}>
              {t.floor}
            </label>
            <div className="mt-4 flex gap-2">
              {(Object.keys(floorConfig) as FloorId[]).map((fId) => {
                const f = floorConfig[fId];
                const active = selectedFloor === fId;
                return (
                  <button
                    key={fId}
                    type="button"
                    onClick={() => setSelectedFloor(fId)}
                    className="relative flex-1 py-4 text-center font-cormorant text-[0.65rem] tracking-[0.25em] uppercase transition-all duration-500"
                    style={{
                      color: active ? f.accent : "rgba(255,255,255,0.25)",
                      borderBottom: `1px solid ${active ? `rgba(${f.accentRgb}, 0.6)` : "rgba(255,255,255,0.08)"}`,
                      background: active ? `rgba(${f.accentRgb}, 0.04)` : "transparent",
                    }}
                  >
                    {lang === "no" ? f.floorNo : f.floorEn}
                    <br />
                    <span className="text-[0.55rem] tracking-[0.15em] mt-0.5 block" style={{ opacity: active ? 0.7 : 0.4 }}>
                      {f.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* ── Date + Time ── */}
          <motion.div custom={2} variants={rise} className="grid grid-cols-2 gap-8">
            <div>
              <label className="book-label" style={{ color: `rgba(${floor.accentRgb}, 0.5)` }}>
                {t.date}
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="book-input"
                style={{ borderColor: `rgba(${floor.accentRgb}, 0.15)` }}
              />
            </div>
            <div>
              <label className="book-label" style={{ color: `rgba(${floor.accentRgb}, 0.5)` }}>
                {t.time}
              </label>
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="book-input"
                style={{ borderColor: `rgba(${floor.accentRgb}, 0.15)` }}
              />
            </div>
          </motion.div>

          {/* ── Guest count ── */}
          <motion.div custom={3} variants={rise}>
            <label className="book-label" style={{ color: `rgba(${floor.accentRgb}, 0.5)` }}>
              {t.guests}
            </label>
            <div className="mt-4 flex items-center gap-6">
              <button
                type="button"
                onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                className="flex h-11 w-11 items-center justify-center font-cormorant text-xl transition"
                style={{
                  border: `1px solid rgba(${floor.accentRgb}, 0.15)`,
                  color: `rgba(${floor.accentRgb}, 0.5)`,
                }}
              >
                −
              </button>
              <span
                className="font-instrument text-4xl w-8 text-center"
                style={{ color: floor.accent, transition: "color 0.5s" }}
              >
                {guestCount}
              </span>
              <button
                type="button"
                onClick={() => setGuestCount(Math.min(20, guestCount + 1))}
                className="flex h-11 w-11 items-center justify-center font-cormorant text-xl transition"
                style={{
                  border: `1px solid rgba(${floor.accentRgb}, 0.15)`,
                  color: `rgba(${floor.accentRgb}, 0.5)`,
                }}
              >
                +
              </button>
            </div>
          </motion.div>

          {/* ── Name ── */}
          <motion.div custom={4} variants={rise}>
            <label className="book-label" style={{ color: `rgba(${floor.accentRgb}, 0.5)` }}>
              {t.name}
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="book-input"
              style={{ borderColor: `rgba(${floor.accentRgb}, 0.15)` }}
            />
          </motion.div>

          {/* ── Phone ── */}
          <motion.div custom={5} variants={rise}>
            <label className="book-label" style={{ color: `rgba(${floor.accentRgb}, 0.5)` }}>
              {t.phone}
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="book-input"
              style={{ borderColor: `rgba(${floor.accentRgb}, 0.15)` }}
            />
          </motion.div>

          {/* ── Email ── */}
          <motion.div custom={6} variants={rise}>
            <label className="book-label" style={{ color: `rgba(${floor.accentRgb}, 0.5)` }}>
              {t.email}
              <span className="ml-2 text-white/15">({t.optional})</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="book-input"
              style={{ borderColor: `rgba(${floor.accentRgb}, 0.15)` }}
            />
          </motion.div>

          {/* ── Notes ── */}
          <motion.div custom={7} variants={rise}>
            <label className="book-label" style={{ color: `rgba(${floor.accentRgb}, 0.5)` }}>
              {t.notes}
              <span className="ml-2 text-white/15">({t.optional})</span>
            </label>
            <textarea
              rows={2}
              placeholder={t.notesPlaceholder}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="book-input resize-none"
              style={{ borderColor: `rgba(${floor.accentRgb}, 0.15)` }}
            />
          </motion.div>

          {/* ── Error ── */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-cormorant text-sm text-center tracking-wider"
                style={{ color: "#c84466" }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Submit ── */}
          <motion.div custom={8} variants={rise} className="mt-2">
            <button
              type="submit"
              disabled={submitting}
              className="group relative w-full overflow-hidden py-5 font-cormorant text-[0.7rem] tracking-[0.35em] uppercase transition-all duration-500"
              style={{
                border: `1px solid rgba(${floor.accentRgb}, ${submitting ? 0.15 : 0.35})`,
                color: submitting ? `rgba(${floor.accentRgb}, 0.3)` : floor.accent,
              }}
            >
              {/* Hover fill */}
              <span
                className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: `rgba(${floor.accentRgb}, 0.06)` }}
              />
              <span className="relative">
                {submitting ? "···" : t.submit}
              </span>
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
