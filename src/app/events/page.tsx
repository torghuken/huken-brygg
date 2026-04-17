"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Placeholder events — will be replaced by Supabase data
const dummyEvents = [
  {
    id: "1",
    title: "MASK NIGHT",
    date: "2026-04-25",
    time: "23:00",
    image: null,
    description: "Identity fades. The night begins.",
    descriptionNo: "Identiteten forsvinner. Natten begynner.",
  },
  {
    id: "2",
    title: "VINYL SESSIONS",
    date: "2026-05-02",
    time: "22:00",
    image: null,
    description: "Analog warmth in the deep.",
    descriptionNo: "Analog varme i dypet.",
  },
  {
    id: "3",
    title: "NEON RITUAL",
    date: "2026-05-09",
    time: "23:00",
    image: null,
    description: "Lights down. Bass up.",
    descriptionNo: "Lys ned. Bass opp.",
  },
];

const texts = {
  no: {
    title: "Kommende events",
    subtitle: "The Underground",
    book: "Book bord",
    back: "Tilbake",
    noEvents: "Ingen kommende events.",
  },
  en: {
    title: "Upcoming events",
    subtitle: "The Underground",
    book: "Book a table",
    back: "Back",
    noEvents: "No upcoming events.",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function formatDate(dateStr: string, lang: "no" | "en") {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(lang === "no" ? "nb-NO" : "en-US", {
    weekday: "short",
    day: "numeric",
    month: "long",
  });
}

export default function EventsPage() {
  const [lang, setLang] = useState<"no" | "en">("no");
  const t = texts[lang];

  return (
    <div className="min-h-screen bg-black px-6 pb-16 pt-8" style={{ background: "var(--underground-bg)" }}>
      {/* Language toggle */}
      <div className="lang-toggle">
        <button className={lang === "no" ? "active" : ""} onClick={() => setLang("no")}>NO</button>
        <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
        <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
      </div>

      <div className="mx-auto max-w-lg">
        {/* Back */}
        <Link href="/" className="font-cormorant mb-8 inline-block text-xs tracking-[0.3em] uppercase text-white/30 transition hover:text-white/60">
          ← {t.back}
        </Link>

        {/* Header */}
        <motion.div initial="hidden" animate="visible">
          <motion.span
            custom={0}
            variants={fadeUp}
            className="font-cormorant block text-xs tracking-[0.4em] uppercase"
            style={{ color: "var(--underground-accent)" }}
          >
            {t.subtitle}
          </motion.span>
          <motion.h1
            custom={1}
            variants={fadeUp}
            className="font-bebas mt-2 text-5xl tracking-[0.06em] text-white sm:text-6xl"
          >
            {t.title}
          </motion.h1>
          <motion.div
            custom={2}
            variants={fadeUp}
            className="mt-3 h-px w-16"
            style={{ background: "var(--underground-accent)" }}
          />
        </motion.div>

        {/* Event list */}
        <motion.div className="mt-12 flex flex-col gap-8" initial="hidden" animate="visible">
          {dummyEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              custom={idx + 3}
              variants={fadeUp}
              className="group border-l-2 pl-6 transition"
              style={{ borderColor: "var(--underground-accent)" }}
            >
              {/* Event image placeholder */}
              {event.image ? (
                <div className="mb-4 aspect-[2/1] overflow-hidden rounded-sm bg-white/5">
                  {/* <img src={event.image} alt="" className="w-full h-full object-cover" /> */}
                </div>
              ) : (
                <div className="mb-4 aspect-[2/1] overflow-hidden rounded-sm bg-white/5 flex items-center justify-center">
                  <span className="font-bebas text-3xl tracking-widest text-white/10">
                    {event.title}
                  </span>
                </div>
              )}

              {/* Date */}
              <span className="font-cormorant text-xs tracking-[0.3em] uppercase text-white/30">
                {formatDate(event.date, lang)} · {event.time}
              </span>

              {/* Title */}
              <h2 className="font-bebas mt-1 text-3xl tracking-[0.05em] text-white sm:text-4xl">
                {event.title}
              </h2>

              {/* Description */}
              <p className="font-cormorant mt-2 text-sm italic text-white/40">
                {lang === "no" ? event.descriptionNo : event.description}
              </p>

              {/* Book */}
              <Link
                href={`/book?floor=underground`}
                className="cta-btn mt-4 inline-flex text-xs"
                style={{
                  borderColor: "var(--underground-accent)",
                  color: "var(--underground-accent)",
                }}
              >
                {t.book}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
