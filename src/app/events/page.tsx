"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface Event {
  id: string;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string | null;
  cover_url: string | null;
  place: string | null;
  facebook_event_id: string | null;
}

const texts = {
  no: {
    title: "Kommende events",
    subtitle: "The Underground",
    book: "Book bord",
    back: "Tilbake",
    noEvents: "Ingen kommende events akkurat n\u00e5.",
    loading: "Laster...",
  },
  en: {
    title: "Upcoming events",
    subtitle: "The Underground",
    book: "Book a table",
    back: "Back",
    noEvents: "No upcoming events right now.",
    loading: "Loading...",
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

function formatEventDate(isoStr: string, lang: "no" | "en") {
  const d = new Date(isoStr);
  return d.toLocaleDateString(lang === "no" ? "nb-NO" : "en-US", {
    weekday: "short",
    day: "numeric",
    month: "long",
  });
}

function formatEventTime(isoStr: string) {
  const d = new Date(isoStr);
  return d.toLocaleTimeString("nb-NO", { hour: "2-digit", minute: "2-digit" });
}

export default function EventsPage() {
  const [lang, setLang] = useState<"no" | "en">("no");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const t = texts[lang];

  useEffect(() => {
    async function fetchEvents() {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .gte("start_time", new Date().toISOString())
        .order("start_time", { ascending: true });

      if (!error && data) {
        setEvents(data);
      }
      setLoading(false);
    }
    fetchEvents();
  }, []);

  return (
    <div
      className="min-h-screen px-6 pb-16 pt-8"
      style={{ background: "var(--underground-void)" }}
    >
      {/* Language toggle */}
      <div className="lang-toggle">
        <button className={lang === "no" ? "active" : ""} onClick={() => setLang("no")}>NO</button>
        <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
        <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
      </div>

      <div className="mx-auto max-w-lg">
        {/* Back */}
        <Link
          href="/"
          className="font-cormorant mb-8 inline-block text-xs tracking-[0.3em] uppercase text-white/30 transition hover:text-white/60"
        >
          &larr; {t.back}
        </Link>

        {/* Header */}
        <motion.div initial="hidden" animate="visible">
          <motion.span
            custom={0}
            variants={fadeUp}
            className="font-cormorant block text-xs tracking-[0.4em] uppercase"
            style={{ color: "var(--underground-accent, #9b1b30)" }}
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
            style={{ background: "var(--underground-accent, #9b1b30)" }}
          />
        </motion.div>

        {/* Loading */}
        {loading && (
          <p className="font-cormorant mt-12 text-sm text-white/30 tracking-wider">
            {t.loading}
          </p>
        )}

        {/* No events */}
        {!loading && events.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-cormorant mt-12 text-base italic text-white/30 tracking-wider"
          >
            {t.noEvents}
          </motion.p>
        )}

        {/* Event list */}
        {!loading && events.length > 0 && (
          <motion.div className="mt-12 flex flex-col gap-10" initial="hidden" animate="visible">
            {events.map((event, idx) => (
              <motion.div
                key={event.id}
                custom={idx + 3}
                variants={fadeUp}
                className="group border-l-2 pl-6 transition"
                style={{ borderColor: "var(--underground-accent, #9b1b30)" }}
              >
                {/* Cover image */}
                {event.cover_url ? (
                  <div className="mb-4 aspect-[2/1] overflow-hidden rounded-sm">
                    <img
                      src={event.cover_url}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="mb-4 aspect-[2/1] overflow-hidden rounded-sm bg-white/5 flex items-center justify-center">
                    <span className="font-bebas text-3xl tracking-widest text-white/10">
                      {event.title}
                    </span>
                  </div>
                )}

                {/* Date & time */}
                <span className="font-cormorant text-xs tracking-[0.3em] uppercase text-white/30">
                  {formatEventDate(event.start_time, lang)} &middot; {formatEventTime(event.start_time)}
                </span>

                {/* Title */}
                <h2 className="font-bebas mt-1 text-3xl tracking-[0.05em] text-white sm:text-4xl">
                  {event.title}
                </h2>

                {/* Description */}
                {event.description && (
                  <p className="font-cormorant mt-2 text-sm italic text-white/40 line-clamp-3">
                    {event.description}
                  </p>
                )}

                {/* Place */}
                {event.place && (
                  <p className="font-cormorant mt-1 text-xs text-white/25 tracking-wider">
                    {event.place}
                  </p>
                )}

                {/* Book */}
                <Link
                  href="/book?floor=underground"
                  className="cta mt-4 inline-flex text-xs"
                  style={{
                    borderColor: "rgba(155,27,48,0.5)",
                    color: "#c84466",
                  }}
                >
                  {t.book}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
