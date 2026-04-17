"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

const floors = [
  { id: "gastro", label: "The Gastro Bar", labelNo: "The Gastro Bar – 1. etasje", accent: "var(--gastro-accent)" },
  { id: "lounge", label: "The Cocktail Lounge", labelNo: "The Cocktail Lounge – 2. etasje", accent: "var(--lounge-accent)" },
  { id: "underground", label: "The Underground", labelNo: "The Underground – Kjelleren", accent: "var(--underground-accent)" },
];

const texts = {
  no: {
    title: "Book bord",
    floor: "Velg etasje",
    date: "Dato",
    time: "Tidspunkt",
    guests: "Antall gjester",
    name: "Navn",
    phone: "Telefon",
    email: "E-post",
    notes: "Notater (valgfritt)",
    submit: "Send booking",
    success: "Booking sendt!",
    successSub: "Du vil motta en bekreftelse på SMS.",
    back: "Tilbake",
    another: "Ny booking",
  },
  en: {
    title: "Book a table",
    floor: "Choose floor",
    date: "Date",
    time: "Time",
    guests: "Number of guests",
    name: "Name",
    phone: "Phone",
    email: "Email",
    notes: "Notes (optional)",
    submit: "Send booking",
    success: "Booking sent!",
    successSub: "You will receive a confirmation via SMS.",
    back: "Back",
    another: "New booking",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function BookingForm() {
  const searchParams = useSearchParams();
  const [lang, setLang] = useState<"no" | "en">("no");
  const [selectedFloor, setSelectedFloor] = useState("gastro");
  const [guestCount, setGuestCount] = useState(2);
  const [submitted, setSubmitted] = useState(false);
  const t = texts[lang];

  useEffect(() => {
    const floor = searchParams.get("floor");
    if (floor && floors.some((f) => f.id === floor)) {
      setSelectedFloor(floor);
    }
  }, [searchParams]);

  const currentFloor = floors.find((f) => f.id === selectedFloor)!;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: connect to Supabase + Twilio
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <motion.div
        className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div
          className="mb-4 text-4xl"
          style={{ color: currentFloor.accent }}
        >
          ✓
        </div>
        <h1 className="font-cormorant text-3xl font-light tracking-wide text-white">
          {t.success}
        </h1>
        <p className="font-cormorant mt-3 text-base text-white/50">
          {t.successSub}
        </p>
        <div className="mt-10 flex gap-4">
          <Link
            href="/"
            className="cta-btn"
            style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.5)" }}
          >
            {t.back}
          </Link>
          <button
            onClick={() => setSubmitted(false)}
            className="cta-btn"
            style={{ borderColor: currentFloor.accent, color: currentFloor.accent }}
          >
            {t.another}
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-6 pb-16 pt-8">
      {/* Language toggle */}
      <div className="lang-toggle">
        <button className={lang === "no" ? "active" : ""} onClick={() => setLang("no")}>NO</button>
        <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
        <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
      </div>

      <div className="mx-auto max-w-md">
        {/* Back link */}
        <Link href="/" className="font-cormorant mb-8 inline-block text-xs tracking-[0.3em] uppercase text-white/30 transition hover:text-white/60">
          ← {t.back}
        </Link>

        <motion.h1
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
          className="font-instrument mb-10 text-4xl tracking-wide text-white sm:text-5xl"
        >
          {t.title}
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
          initial="hidden"
          animate="visible"
        >
          {/* Floor selector */}
          <motion.div custom={1} variants={fadeUp}>
            <label className="font-cormorant mb-2 block text-xs tracking-[0.3em] uppercase text-white/40">
              {t.floor}
            </label>
            <div className="flex flex-col gap-2">
              {floors.map((floor) => (
                <button
                  key={floor.id}
                  type="button"
                  onClick={() => setSelectedFloor(floor.id)}
                  className="rounded-sm border px-4 py-3 text-left font-cormorant text-sm tracking-wide transition"
                  style={{
                    borderColor: selectedFloor === floor.id ? floor.accent : "rgba(255,255,255,0.1)",
                    color: selectedFloor === floor.id ? floor.accent : "rgba(255,255,255,0.4)",
                    background: selectedFloor === floor.id ? "rgba(255,255,255,0.03)" : "transparent",
                  }}
                >
                  {lang === "no" ? floor.labelNo : floor.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Date + Time */}
          <motion.div custom={2} variants={fadeUp} className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-cormorant mb-2 block text-xs tracking-[0.3em] uppercase text-white/40">
                {t.date}
              </label>
              <input
                type="date"
                required
                className="w-full rounded-sm border border-white/10 bg-transparent px-4 py-3 font-cormorant text-sm text-white outline-none transition focus:border-white/30"
              />
            </div>
            <div>
              <label className="font-cormorant mb-2 block text-xs tracking-[0.3em] uppercase text-white/40">
                {t.time}
              </label>
              <input
                type="time"
                required
                className="w-full rounded-sm border border-white/10 bg-transparent px-4 py-3 font-cormorant text-sm text-white outline-none transition focus:border-white/30"
              />
            </div>
          </motion.div>

          {/* Guest count */}
          <motion.div custom={3} variants={fadeUp}>
            <label className="font-cormorant mb-2 block text-xs tracking-[0.3em] uppercase text-white/40">
              {t.guests}
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 font-cormorant text-lg text-white/60 transition hover:border-white/30"
              >
                −
              </button>
              <span className="font-cormorant text-2xl text-white w-8 text-center">
                {guestCount}
              </span>
              <button
                type="button"
                onClick={() => setGuestCount(Math.min(20, guestCount + 1))}
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 font-cormorant text-lg text-white/60 transition hover:border-white/30"
              >
                +
              </button>
            </div>
          </motion.div>

          {/* Name */}
          <motion.div custom={4} variants={fadeUp}>
            <label className="font-cormorant mb-2 block text-xs tracking-[0.3em] uppercase text-white/40">
              {t.name}
            </label>
            <input
              type="text"
              required
              className="w-full rounded-sm border border-white/10 bg-transparent px-4 py-3 font-cormorant text-sm text-white outline-none transition focus:border-white/30"
            />
          </motion.div>

          {/* Phone + Email */}
          <motion.div custom={5} variants={fadeUp} className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-cormorant mb-2 block text-xs tracking-[0.3em] uppercase text-white/40">
                {t.phone}
              </label>
              <input
                type="tel"
                required
                className="w-full rounded-sm border border-white/10 bg-transparent px-4 py-3 font-cormorant text-sm text-white outline-none transition focus:border-white/30"
              />
            </div>
            <div>
              <label className="font-cormorant mb-2 block text-xs tracking-[0.3em] uppercase text-white/40">
                {t.email}
              </label>
              <input
                type="email"
                className="w-full rounded-sm border border-white/10 bg-transparent px-4 py-3 font-cormorant text-sm text-white outline-none transition focus:border-white/30"
              />
            </div>
          </motion.div>

          {/* Notes */}
          <motion.div custom={6} variants={fadeUp}>
            <label className="font-cormorant mb-2 block text-xs tracking-[0.3em] uppercase text-white/40">
              {t.notes}
            </label>
            <textarea
              rows={3}
              className="w-full resize-none rounded-sm border border-white/10 bg-transparent px-4 py-3 font-cormorant text-sm text-white outline-none transition focus:border-white/30"
            />
          </motion.div>

          {/* Submit */}
          <motion.div custom={7} variants={fadeUp} className="mt-4">
            <button
              type="submit"
              className="cta-btn w-full justify-center"
              style={{
                borderColor: currentFloor.accent,
                color: currentFloor.accent,
              }}
            >
              {t.submit}
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
