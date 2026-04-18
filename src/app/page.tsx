"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface NextEvent {
  id: string;
  title: string;
  start_time: string;
  cover_url: string | null;
}

interface InstaPost {
  id: string;
  media_url: string;
  permalink: string;
  media_type: string;
  thumbnail_url: string | null;
}

const texts = {
  no: {
    hero: { sub: "Tre etasjer. Tre verdener.", cta: "Velg din kveld" },
    gastro: { floor: "1. etasje", title: "The Gastro Bar", sub: "Where fire meets flavor.", menu: "Se meny", book: "Book bord" },
    lounge: { floor: "2. etasje", title: "The Cocktail Lounge", sub: "Sip slow. Stay late.", book: "Book bord" },
    underground: { floor: "Kjelleren", title: "The Underground", sub: "You weren't supposed to find this place.", events: "Kommende events", book: "Book bord", next: "Neste event" },
    footer: { hours: "\u00c5pningstider", address: "Adresse", follow: "F\u00f8lg oss" },
  },
  en: {
    hero: { sub: "Three floors. Three worlds.", cta: "Choose your night" },
    gastro: { floor: "1st floor", title: "The Gastro Bar", sub: "Where fire meets flavor.", menu: "See menu", book: "Book a table" },
    lounge: { floor: "2nd floor", title: "The Cocktail Lounge", sub: "Sip slow. Stay late.", book: "Book a table" },
    underground: { floor: "Basement", title: "The Underground", sub: "You weren't supposed to find this place.", events: "Upcoming events", book: "Book a table", next: "Next event" },
    footer: { hours: "Opening hours", address: "Address", follow: "Follow us" },
  },
};

const rise = {
  hidden: { opacity: 0, y: 50 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

function formatShortDate(isoStr: string, lang: "no" | "en") {
  const d = new Date(isoStr);
  return d.toLocaleDateString(lang === "no" ? "nb-NO" : "en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export default function Home() {
  const [lang, setLang] = useState<"no" | "en">("no");
  const [nextEvent, setNextEvent] = useState<NextEvent | null>(null);
  const [instaPosts, setInstaPosts] = useState<InstaPost[]>([]);
  const t = texts[lang];

  useEffect(() => {
    // Fetch next upcoming event
    supabase
      .from("events")
      .select("id, title, start_time, cover_url")
      .gte("start_time", new Date().toISOString())
      .order("start_time", { ascending: true })
      .limit(1)
      .then(({ data }) => {
        if (data && data.length > 0) setNextEvent(data[0]);
      });

    // Fetch latest Instagram posts
    supabase
      .from("instagram_posts")
      .select("id, media_url, permalink, media_type, thumbnail_url")
      .order("timestamp", { ascending: false })
      .limit(6)
      .then(({ data }) => {
        if (data) setInstaPosts(data);
      });
  }, []);

  return (
    <>
      {/* Lang */}
      <div className="lang-toggle">
        <button className={lang === "no" ? "active" : ""} onClick={() => setLang("no")}>NO</button>
        <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
        <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
      </div>

      {/* ────────── HERO ────────── */}
      <section className="snap-section bg-black">
        <video className="bg-photo" autoPlay muted loop playsInline>
          <source src="https://shlkqnemrnvdbdqebdzw.supabase.co/storage/v1/object/public/media/hero.mp4" type="video/mp4" />
        </video>
        <div className="overlay-hero" />

        <motion.div
          className="section-inner items-center justify-center text-center"
          initial="hidden" animate="show"
        >
          <motion.img
            custom={0} variants={rise}
            src="/logo.png" alt="Huken Brygg"
            className="w-44 sm:w-56 invert mb-8"
          />
          <motion.p custom={1} variants={rise}
            className="font-cormorant text-base sm:text-lg font-light tracking-[0.3em] text-white/50"
          >
            {t.hero.sub}
          </motion.p>
          <motion.div custom={2} variants={rise} className="mt-16 float">
            <span className="font-cormorant text-[0.65rem] tracking-[0.4em] uppercase text-white/25 block mb-2">
              {t.hero.cta}
            </span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2">
              <path d="M9 2L9 16M3 10L9 16L15 10" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ────────── THE GASTRO BAR ────────── */}
      <section className="snap-section" style={{ background: "var(--gastro-warm)" }}>
        <img className="bg-photo" src="/images/gastro.jpg" alt="" />
        <div className="overlay-gastro" />
        <div className="floor-number">1</div>

        <motion.div className="section-inner" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
          <motion.span custom={0} variants={rise}
            className="font-cormorant text-[0.65rem] tracking-[0.5em] uppercase text-amber-400/70"
          >
            {t.gastro.floor}
          </motion.span>

          <motion.h2 custom={1} variants={rise}
            className="font-lora mt-2 text-[2.75rem] sm:text-7xl font-semibold italic leading-[0.95] text-amber-50"
          >
            The<br />Gastro Bar
          </motion.h2>

          <motion.p custom={2} variants={rise}
            className="font-lora mt-5 text-sm sm:text-base italic text-amber-100/50 tracking-wide"
          >
            {t.gastro.sub}
          </motion.p>

          <motion.div custom={3} variants={rise} className="mt-8 flex gap-3">
            <Link href="/meny" className="cta" style={{ borderColor: "rgba(200,160,60,0.4)", color: "#c8a04c" }}>
              {t.gastro.menu}
            </Link>
            <Link href="/book?floor=gastro" className="cta" style={{ borderColor: "rgba(255,240,210,0.25)", color: "#fff0d2" }}>
              {t.gastro.book}
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ────────── THE COCKTAIL LOUNGE ────────── */}
      <section className="snap-section" style={{ background: "var(--lounge-deep)" }}>
        <img className="bg-photo" src="/images/lounge.jpg" alt="" />
        <div className="overlay-lounge" />
        <div className="floor-number">2</div>

        <motion.div className="section-inner" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
          <motion.span custom={0} variants={rise}
            className="font-cormorant text-[0.65rem] tracking-[0.5em] uppercase text-yellow-500/60"
          >
            {t.lounge.floor}
          </motion.span>

          <motion.h2 custom={1} variants={rise}
            className="font-cormorant mt-2 text-[2.75rem] sm:text-7xl font-light tracking-wide leading-[0.95] text-stone-200"
          >
            The<br />Cocktail<br />Lounge
          </motion.h2>

          <motion.p custom={2} variants={rise}
            className="font-cormorant mt-5 text-sm sm:text-lg font-light tracking-[0.2em] text-stone-400/60"
          >
            {t.lounge.sub}
          </motion.p>

          <motion.div custom={3} variants={rise} className="mt-8">
            <Link href="/book?floor=lounge" className="cta" style={{ borderColor: "rgba(200,168,76,0.4)", color: "#c9a84c" }}>
              {t.lounge.book}
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ────────── THE UNDERGROUND ────────── */}
      <section className="snap-section" style={{ background: "var(--underground-void)" }}>
        <img className="bg-photo" src="/images/underground.jpg" alt="" />
        <div className="overlay-underground" />
        <div className="floor-number" style={{ color: "rgba(155,27,48,0.06)" }}>B</div>

        <motion.div className="section-inner" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
          <motion.span custom={0} variants={rise}
            className="font-cormorant text-[0.65rem] tracking-[0.5em] uppercase text-red-500/50"
          >
            {t.underground.floor}
          </motion.span>

          <motion.h2 custom={1} variants={rise}
            className="font-bebas mt-2 text-6xl sm:text-[7rem] tracking-[0.12em] leading-[0.85] text-white/90"
          >
            THE<br />UNDER<br />GROUND
          </motion.h2>

          <motion.p custom={2} variants={rise}
            className="font-cormorant mt-5 text-sm sm:text-base italic text-white/30 tracking-wider"
          >
            {t.underground.sub}
          </motion.p>

          {/* Next event teaser — auto-fetched from Facebook */}
          {nextEvent && (
            <motion.div custom={2.5} variants={rise} className="mt-6">
              <Link href="/events" className="group flex items-center gap-4 p-3 -ml-3 rounded transition hover:bg-white/5">
                {nextEvent.cover_url ? (
                  <img
                    src={nextEvent.cover_url}
                    alt=""
                    className="w-14 h-14 rounded-sm object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-sm bg-white/5 flex items-center justify-center flex-shrink-0">
                    <span className="font-bebas text-xs text-white/20">EVENT</span>
                  </div>
                )}
                <div className="min-w-0">
                  <span className="font-cormorant text-[0.6rem] tracking-[0.3em] uppercase block" style={{ color: "rgba(200,68,102,0.6)" }}>
                    {t.underground.next}
                  </span>
                  <span className="font-bebas text-lg tracking-wide text-white/80 block truncate">
                    {nextEvent.title}
                  </span>
                  <span className="font-cormorant text-xs text-white/30">
                    {formatShortDate(nextEvent.start_time, lang)}
                  </span>
                </div>
                <svg className="ml-auto flex-shrink-0 text-white/20 group-hover:text-white/50 transition" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M6 4L10 8L6 12" />
                </svg>
              </Link>
            </motion.div>
          )}

          <motion.div custom={3} variants={rise} className="mt-6 flex gap-3">
            <Link href="/events" className="cta" style={{ borderColor: "rgba(155,27,48,0.5)", color: "#c84466" }}>
              {t.underground.events}
            </Link>
            <Link href="/book?floor=underground" className="cta" style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)" }}>
              {t.underground.book}
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ────────── FOOTER ────────── */}
      <footer className="snap-section flex flex-col justify-between bg-black px-6 py-12 sm:px-12">
        <div className="flex flex-col gap-12">
          <img src="/logo.png" alt="Huken Brygg" className="w-20 invert" />

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            <div>
              <h3 className="font-cormorant mb-3 text-[0.6rem] tracking-[0.4em] uppercase" style={{ color: "var(--brand)" }}>
                {t.footer.hours}
              </h3>
              <div className="space-y-1 font-cormorant text-sm text-white/40">
                <p>Man – Tor: 16:00 – 01:00</p>
                <p>Fre – L\u00f8r: 16:00 – 03:00</p>
                <p>S\u00f8n: Stengt</p>
              </div>
            </div>
            <div>
              <h3 className="font-cormorant mb-3 text-[0.6rem] tracking-[0.4em] uppercase" style={{ color: "var(--brand)" }}>
                {t.footer.address}
              </h3>
              <div className="font-cormorant text-sm text-white/40">
                <p>Strandgata 1</p>
                <p>9008 Troms\u00f8</p>
              </div>
            </div>
            <div>
              <h3 className="font-cormorant mb-3 text-[0.6rem] tracking-[0.4em] uppercase" style={{ color: "var(--brand)" }}>
                {t.footer.follow}
              </h3>
              <div className="flex gap-4 font-cormorant text-sm text-white/40">
                <a href="https://instagram.com/hukenbrygg" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">Instagram</a>
                <a href="https://facebook.com/HukenBrygg" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">Facebook</a>
              </div>
            </div>
          </div>

          {/* Instagram feed — live from @hukenbrygg */}
          <div className="border-t border-white/8 pt-8">
            <a
              href="https://instagram.com/hukenbrygg"
              target="_blank"
              rel="noopener noreferrer"
              className="font-cormorant mb-4 text-[0.6rem] tracking-[0.4em] uppercase block transition hover:opacity-80"
              style={{ color: "var(--brand)" }}
            >
              @hukenbrygg
            </a>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {instaPosts.length > 0
                ? instaPosts.map((post) => (
                    <a
                      key={post.id}
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aspect-square overflow-hidden rounded-sm bg-white/5 group"
                    >
                      <img
                        src={post.media_type === "VIDEO" ? (post.thumbnail_url || post.media_url) : post.media_url}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </a>
                  ))
                : [...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-square bg-white/5 rounded-sm" />
                  ))
              }
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-6 text-center">
          <p className="font-cormorant text-[0.6rem] text-white/15 tracking-[0.3em]">
            &copy; 2026 Huken Brygg
          </p>
        </div>
      </footer>
    </>
  );
}
