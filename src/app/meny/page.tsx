"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const menu = [
  {
    category: "Baked Potatos",
    items: [
      { name: "Bacon & Corn", desc: "Bacon, corn, cheese & garlic dressing", price: 210 },
      { name: "Taco & Corn", desc: "Grinded beef with taco spice, corn, cheese & garlic dressing", price: 210 },
      { name: "Ham & Corn", desc: "Ham, corn, cheese & garlic dressing", price: 210 },
      { name: "Veggie", desc: "Salad, cucumber, cheese, corn, ranch & garlic dressing", price: 210 },
      { name: "Reindeer", desc: "Reindeer meat & lingonberries", price: 275 },
      { name: "Full Fettling", desc: "Bacon, ham, grinded beef, salad, corn & garlic dressing", price: 275 },
    ],
  },
  {
    category: "Pancakes",
    items: [
      { name: "Blueberry & Bacon", desc: null, price: 165 },
      { name: "Taco Pancake", desc: "Grinded beef with taco spice, corn, salad, salsa & garlic dressing", price: 195 },
      { name: "Veggie", desc: "Salad, cucumber, corn, salsa & garlic dressing", price: 195 },
      { name: "Full Rulle", desc: "Double pancake with bacon, taco meat, corn, salad, garlic dressing & salsa", price: 275 },
    ],
  },
  {
    category: "Burgers",
    items: [
      { name: "Classic Burger & Fries", desc: "House beef burger with bacon, cheese, salad & ranch dressing", price: 299 },
      { name: "Reindeer Burger & Fries", desc: "Reindeer burger, bacon, salad, garlic dressing & lingonberries", price: 325 },
    ],
  },
];

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function MenyPage() {
  let itemIndex = 0;

  return (
    <div className="meny-page">
      {/* Warm ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 20%, rgba(200,160,76,0.06) 0%, transparent 60%)" }} />

      {/* Ghost text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-bebas text-center leading-[0.75]"
          style={{ fontSize: "clamp(10rem, 35vw, 24rem)", color: "rgba(200,160,76,0.02)" }}>
          MENY
        </span>
      </div>

      {/* Back */}
      <div className="fixed top-4 left-6 z-50 sm:left-8">
        <Link href="/" className="inline-flex items-center gap-2 font-cormorant text-xs tracking-[0.25em] uppercase text-white/20 transition hover:text-white/50">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1"><path d="M8 3L4 7L8 11" /></svg>
          Tilbake
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-xl px-7 sm:px-10 pt-16 pb-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          <p className="font-cormorant text-[0.7rem] tracking-[0.4em] uppercase text-amber-400/50 mb-3">
            The Gastro Bar — 1st floor
          </p>
          <h1 className="font-bebas text-6xl sm:text-7xl tracking-[0.08em] text-white/90 leading-none">
            Food Menu
          </h1>
          <div className="mt-3 mx-auto h-px w-16 bg-amber-400/30" />
          <p className="font-cormorant text-sm tracking-[0.15em] text-white/35 mt-4">
            Kitchen open every night 15:00 – 02:00
          </p>
        </motion.div>

        {/* Student badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mx-auto mb-10 w-fit px-5 py-2.5 text-center"
          style={{ border: "1px solid rgba(200,160,76,0.25)", background: "rgba(200,160,76,0.04)" }}
        >
          <span className="font-cormorant text-[0.7rem] tracking-[0.3em] uppercase" style={{ color: "#c8a04c" }}>
            Student rabatt 20% på alle matretter
          </span>
        </motion.div>

        {/* Menu sections */}
        {menu.map((section, si) => (
          <motion.div key={section.category} className="mb-10 last:mb-0" initial="hidden" animate="show">

            {/* Category title */}
            <motion.div custom={itemIndex++} variants={fade} className="mb-5">
              <h2 className="font-bebas text-3xl sm:text-4xl tracking-[0.1em] text-white/85">
                {section.category}
              </h2>
              <div className="h-px w-full mt-1" style={{ background: "linear-gradient(to right, rgba(200,160,76,0.3), transparent)" }} />
            </motion.div>

            {/* Items */}
            <div className="flex flex-col gap-4">
              {section.items.map((item) => {
                const idx = itemIndex++;
                return (
                  <motion.div key={item.name} custom={idx} variants={fade}>
                    {/* Name + price row */}
                    <div className="flex items-baseline gap-2">
                      <span className="font-lora text-[1rem] sm:text-lg text-white/90 shrink-0">
                        {item.name}
                      </span>
                      <span className="flex-1 border-b border-dotted border-white/10 translate-y-[-4px] min-w-[20px]" />
                      <span className="font-cormorant text-base sm:text-lg text-amber-400/70 shrink-0 tabular-nums">
                        {item.price},–
                      </span>
                    </div>
                    {/* Description */}
                    {item.desc && (
                      <p className="font-cormorant text-[0.85rem] sm:text-sm text-white/30 mt-0.5 leading-snug">
                        {item.desc}
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Footer flourish */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="mx-auto h-px w-24 bg-amber-400/15 mb-4" />
          <p className="font-cormorant text-[0.65rem] tracking-[0.4em] uppercase text-white/15">
            Huken Brygg — Est. 2017
          </p>
        </motion.div>
      </div>
    </div>
  );
}
