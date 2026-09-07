import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Restaurant in Tromsø City Centre — Huken Brygg, Storgata 39",
  description:
    "A restaurant and gastropub in the centre of Tromsø. Reindeer burgers, baked potatoes and Arctic plates from 165 kr, three floors, and a kitchen that stays open until 03:00 on weekends. Storgata 39.",
  alternates: { canonical: "/restaurant" },
  keywords: [
    "restaurant Tromsø",
    "restaurant in Tromsø",
    "where to eat in Tromsø",
    "Tromsø city centre restaurant",
    "reindeer Tromsø",
    "gastropub Tromsø",
    "spise i Tromsø",
  ],
  openGraph: {
    title: "Restaurant in Tromsø City Centre — Huken Brygg",
    description:
      "Three floors on Storgata 39: gastro bar, cocktail lounge and a basement club. Kitchen open late every night.",
    url: "/restaurant",
  },
};

export default function RestaurantPage() {
  return (
    <div className="meny-page">
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
          Est. 2017 — Storgata 39, Tromsø
        </p>

        <h1 className="font-bebas text-5xl sm:text-6xl tracking-[0.06em] text-white/90 leading-[0.95]">
          A restaurant in the centre of Tromsø
        </h1>

        <div className="mt-4 h-px w-16 bg-amber-400/30" />

        <p className="font-lora text-lg text-white/70 mt-8 leading-relaxed">
          Huken Brygg sits on Storgata, the main pedestrian street of Tromsø, five minutes from the
          harbour and the Arctic Cathedral bridge. Three floors, three rooms, one kitchen — and it
          runs later than almost any other kitchen in town.
        </p>

        <h2 className="font-bebas text-3xl tracking-[0.08em] text-white/85 mt-14 mb-2">
          The food
        </h2>
        <div className="h-px w-full mb-6" style={{ background: "linear-gradient(to right, rgba(200,160,76,0.3), transparent)" }} />

        <p className="font-lora text-base text-white/55 leading-relaxed">
          Arctic ingredients without the tasting-menu price tag. Reindeer with lingonberries, either on
          a baked potato at 275 kr or as a burger with bacon and garlic dressing at 325 kr. A house
          beef burger with fries at 299 kr. Loaded baked potatoes from 210 kr, savoury pancakes from
          165 kr, and a vegetarian option in every category. Nothing on the menu is complicated — it is
          the food you actually want in a town where it is dark and −8 outside.
        </p>

        <p className="font-lora text-base text-white/55 mt-5 leading-relaxed">
          Students get 20% off all food with a valid student ID, every day of the week.
        </p>

        <h2 className="font-bebas text-3xl tracking-[0.08em] text-white/85 mt-14 mb-2">
          Three floors
        </h2>
        <div className="h-px w-full mb-6" style={{ background: "linear-gradient(to right, rgba(200,160,76,0.3), transparent)" }} />

        <div className="space-y-6 font-lora text-base text-white/55 leading-relaxed">
          <p>
            <strong className="text-white/85">The Gastro Bar</strong>, first floor. Where you eat.
            Tables, the full menu, and the street outside the window.
          </p>
          <p>
            <strong className="text-white/85">The Cocktail Lounge</strong>, second floor. Slower,
            darker, built for a long drink after dinner.{" "}
            <Link href="/cocktails" className="underline decoration-amber-400/30 underline-offset-4 hover:text-white/80">
              See the cocktail lounge
            </Link>.
          </p>
          <p>
            <strong className="text-white/85">The Underground</strong>, basement. Live nights, DJs and
            events.{" "}
            <Link href="/events" className="underline decoration-amber-400/30 underline-offset-4 hover:text-white/80">
              What&apos;s on
            </Link>.
          </p>
        </div>

        <h2 className="font-bebas text-3xl tracking-[0.08em] text-white/85 mt-14 mb-2">
          Practical
        </h2>
        <div className="h-px w-full mb-6" style={{ background: "linear-gradient(to right, rgba(200,160,76,0.3), transparent)" }} />

        <dl className="font-cormorant text-base text-white/60 space-y-3">
          <div className="flex items-baseline gap-3">
            <dt className="shrink-0 tracking-[0.15em] uppercase text-[0.8rem] text-white/40">Address</dt>
            <span className="flex-1 border-b border-dotted border-white/10 translate-y-[-4px]" />
            <dd className="shrink-0 text-white/60">Storgata 39, 9008 Tromsø</dd>
          </div>
          <div className="flex items-baseline gap-3">
            <dt className="shrink-0 tracking-[0.15em] uppercase text-[0.8rem] text-white/40">Kitchen</dt>
            <span className="flex-1 border-b border-dotted border-white/10 translate-y-[-4px]" />
            <dd className="shrink-0 text-amber-400/80 tabular-nums">Until 01:30 / 03:00</dd>
          </div>
          <div className="flex items-baseline gap-3">
            <dt className="shrink-0 tracking-[0.15em] uppercase text-[0.8rem] text-white/40">Bar closes</dt>
            <span className="flex-1 border-b border-dotted border-white/10 translate-y-[-4px]" />
            <dd className="shrink-0 text-white/60 tabular-nums">02:00 / 03:30</dd>
          </div>
          <div className="flex items-baseline gap-3">
            <dt className="shrink-0 tracking-[0.15em] uppercase text-[0.8rem] text-white/40">Age limit</dt>
            <span className="flex-1 border-b border-dotted border-white/10 translate-y-[-4px]" />
            <dd className="shrink-0 text-white/60">20</dd>
          </div>
        </dl>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/meny" className="cta" style={{ borderColor: "rgba(200,160,60,0.4)", color: "#c8a04c" }}>
            See the menu
          </Link>
          <Link href="/book" className="cta" style={{ borderColor: "rgba(255,240,210,0.25)", color: "#fff0d2" }}>
            Book a table
          </Link>
          <Link href="/late-night-food" className="cta" style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)" }}>
            Late night food
          </Link>
        </div>

        <section lang="no" className="mt-16 pt-10 border-t border-white/10">
          <h2 className="font-bebas text-3xl tracking-[0.08em] text-white/85 mb-2">
            Restaurant i Tromsø sentrum
          </h2>
          <div className="h-px w-full mb-6" style={{ background: "linear-gradient(to right, rgba(200,160,76,0.3), transparent)" }} />
          <p className="font-lora text-base text-white/55 leading-relaxed">
            Huken Brygg ligger midt i Storgata, over tre etasjer. Første etasje er restauranten, andre
            etasje er cocktailbaren, kjelleren er The Underground med events og DJ-er. Reinsdyr med
            tyttebær, burgere, bakt potet og pannekaker fra 165 kr — og kjøkkenet står åpent til 01:30
            i ukedagene og 03:00 i helgene.
          </p>
          <p className="font-lora text-base text-white/55 mt-4 leading-relaxed">
            20 % studentrabatt på all mat, alle dager. Aldersgrense 20 år. Bordbestilling på nett.
          </p>
        </section>
      </article>
    </div>
  );
}
