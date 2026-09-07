import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Late Night Food in Tromsø — Kitchen Open Until 03:00",
  description:
    "Hungry after midnight in Tromsø? The kitchen at Huken Brygg stays open until 01:30 Sun–Thu and 03:00 Fri–Sat. Burgers, reindeer and baked potatoes at Storgata 39, in the centre of town.",
  alternates: { canonical: "/late-night-food" },
  keywords: [
    "late night food Tromsø",
    "kitchen open late Tromsø",
    "food after midnight Tromsø",
    "restaurant open late Tromsø",
    "where to eat late Tromsø",
    "nattmat Tromsø",
  ],
  openGraph: {
    title: "Late Night Food in Tromsø — Kitchen Open Until 03:00",
    description:
      "The kitchen at Huken Brygg stays open until 01:30 on weeknights and 03:00 on weekends. Storgata 39, Tromsø.",
    url: "/late-night-food",
  },
};

const faq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where can I get food late at night in Tromsø?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Huken Brygg at Storgata 39 in central Tromsø serves food from its own kitchen until 01:30 Sunday to Thursday and until 03:00 on Friday and Saturday — long after most restaurants in Tromsø have closed their kitchens.",
      },
    },
    {
      "@type": "Question",
      name: "How late is the kitchen open at Huken Brygg?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The kitchen is open until 01:30 Sunday to Thursday and until 03:00 on Friday and Saturday. The bar stays open until 02:30 on weeknights and 04:30 on weekends.",
      },
    },
    {
      "@type": "Question",
      name: "Can I eat after a northern lights tour?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Most aurora tours return to Tromsø between 23:00 and 01:00, when almost every kitchen in town is closed. Huken Brygg is a five minute walk from the harbour and is still serving hot food.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to book a table for late night food?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No booking is needed for late night food, but you can reserve a table on hukenbrygg.no if you are a larger group. The age limit is 20.",
      },
    },
  ],
};

export default function LateNightFoodPage() {
  return (
    <div className="meny-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 15%, rgba(200,160,76,0.07) 0%, transparent 60%)" }}
      />

      <div className="fixed top-4 left-6 z-50 sm:left-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-cormorant text-xs tracking-[0.25em] uppercase text-white/20 transition hover:text-white/50"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M8 3L4 7L8 11" />
          </svg>
          Huken Brygg
        </Link>
      </div>

      <article lang="en" className="relative z-10 mx-auto max-w-2xl px-7 sm:px-10 pt-20 pb-20">
        <p className="font-cormorant text-[0.7rem] tracking-[0.4em] uppercase text-amber-400/50 mb-4">
          Storgata 39 — Tromsø
        </p>

        <h1 className="font-bebas text-5xl sm:text-6xl tracking-[0.06em] text-white/90 leading-[0.95]">
          Late night food in Tromsø
        </h1>

        <div className="mt-4 h-px w-16 bg-amber-400/30" />

        <p className="font-lora text-lg text-white/70 mt-8 leading-relaxed">
          Tromsø closes early. Most kitchens in town stop serving between 21:00 and 22:00, which is
          exactly when people come off the northern lights buses, out of the fjord cruises, or off a
          late flight to Langnes — hungry, cold and out of options.
        </p>

        <p className="font-lora text-base text-white/55 mt-5 leading-relaxed">
          Our kitchen does not. At Huken Brygg the kitchen runs until{" "}
          <strong className="text-white/85">01:30 Sunday to Thursday</strong> and until{" "}
          <strong className="text-white/85">03:00 on Friday and Saturday</strong>. Not a bag of crisps
          behind the bar — the full menu, cooked to order, in the middle of the night.
        </p>

        <h2 className="font-bebas text-3xl tracking-[0.08em] text-white/85 mt-14 mb-2">
          Kitchen hours
        </h2>
        <div className="h-px w-full mb-6" style={{ background: "linear-gradient(to right, rgba(200,160,76,0.3), transparent)" }} />

        <dl className="font-cormorant text-base text-white/60 space-y-3">
          <div className="flex items-baseline gap-3">
            <dt className="shrink-0 tracking-[0.15em] uppercase text-[0.8rem] text-white/40">Sunday – Thursday</dt>
            <span className="flex-1 border-b border-dotted border-white/10 translate-y-[-4px]" />
            <dd className="shrink-0 text-amber-400/80 tabular-nums">Kitchen until 01:30</dd>
          </div>
          <div className="flex items-baseline gap-3">
            <dt className="shrink-0 tracking-[0.15em] uppercase text-[0.8rem] text-white/40">Friday – Saturday</dt>
            <span className="flex-1 border-b border-dotted border-white/10 translate-y-[-4px]" />
            <dd className="shrink-0 text-amber-400/80 tabular-nums">Kitchen until 03:00</dd>
          </div>
          <div className="flex items-baseline gap-3">
            <dt className="shrink-0 tracking-[0.15em] uppercase text-[0.8rem] text-white/40">Bar closes</dt>
            <span className="flex-1 border-b border-dotted border-white/10 translate-y-[-4px]" />
            <dd className="shrink-0 text-white/50 tabular-nums">02:30 / 04:30</dd>
          </div>
        </dl>

        <h2 className="font-bebas text-3xl tracking-[0.08em] text-white/85 mt-14 mb-2">
          What you can actually order at 01:00
        </h2>
        <div className="h-px w-full mb-6" style={{ background: "linear-gradient(to right, rgba(200,160,76,0.3), transparent)" }} />

        <p className="font-lora text-base text-white/55 leading-relaxed">
          The same menu we serve at dinner. A classic house beef burger with bacon and fries at 299 kr,
          or the reindeer burger with lingonberries at 325 kr if you want the Arctic version. Baked
          potatoes from 210 kr — the reindeer and lingonberry one is the one people come back for.
          Savoury pancakes from 165 kr. Vegetarian options in every category.
        </p>

        <p className="font-lora text-base text-white/55 mt-5 leading-relaxed">
          Students get 20% off all food, any night, with a valid student ID.
        </p>

        <h2 className="font-bebas text-3xl tracking-[0.08em] text-white/85 mt-14 mb-2">
          Straight off a northern lights tour
        </h2>
        <div className="h-px w-full mb-6" style={{ background: "linear-gradient(to right, rgba(200,160,76,0.3), transparent)" }} />

        <p className="font-lora text-base text-white/55 leading-relaxed">
          Aurora tours drop back in the centre of Tromsø somewhere between 23:00 and 01:00. We are on
          Storgata, the main pedestrian street, a few minutes on foot from the harbour, the Radisson
          and the Clarion. Walk in, take the first floor for food, and stay upstairs for a cocktail if
          the night is still going. Age limit is 20.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/meny" className="cta" style={{ borderColor: "rgba(200,160,60,0.4)", color: "#c8a04c" }}>
            See the menu
          </Link>
          <Link href="/book" className="cta" style={{ borderColor: "rgba(255,240,210,0.25)", color: "#fff0d2" }}>
            Book a table
          </Link>
          <a
            href="https://maps.google.com/?q=Storgata+39,+9008+Tromsø"
            target="_blank"
            rel="noopener noreferrer"
            className="cta"
            style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)" }}
          >
            Directions
          </a>
        </div>

        <section lang="no" className="mt-16 pt-10 border-t border-white/10">
          <h2 className="font-bebas text-3xl tracking-[0.08em] text-white/85 mb-2">
            Nattmat i Tromsø
          </h2>
          <div className="h-px w-full mb-6" style={{ background: "linear-gradient(to right, rgba(200,160,76,0.3), transparent)" }} />
          <p className="font-lora text-base text-white/55 leading-relaxed">
            De fleste kjøkken i Tromsø stenger rundt 21–22. Hos oss på Storgata 39 er kjøkkenet åpent
            til 01:30 søndag til torsdag, og til 03:00 fredag og lørdag. Full meny, laget på bestilling
            — burgere, bakt potet og reinsdyr, ikke bare snacks over disk.
          </p>
          <p className="font-lora text-base text-white/55 mt-4 leading-relaxed">
            Studenter får 20 % på all mat mot gyldig studentbevis, alle dager. Torsdager har vi egne
            priser i baren. Aldersgrense 20 år.
          </p>
        </section>
      </article>
    </div>
  );
}
