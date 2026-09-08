import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cocktail Bar in Tromsø — The Cocktail Lounge",
  description:
    "The Cocktail Lounge on the second floor at Huken Brygg, Storgata 39. Classic and house cocktails in the centre of Tromsø, open late every night — until 02:00 on weeknights and 03:30 at weekends.",
  alternates: { canonical: "/cocktails" },
  keywords: [
    "cocktails Tromsø",
    "cocktail bar Tromsø",
    "good cocktails Tromsø",
    "best cocktails Tromsø",
    "drinks Tromsø",
    "bar Tromsø sentrum",
  ],
  openGraph: {
    title: "Cocktail Bar in Tromsø — The Cocktail Lounge",
    description: "Second floor at Storgata 39. Classics, house drinks and a room built for staying late.",
    url: "/cocktails",
  },
};

export default function CocktailsPage() {
  return (
    <div className="meny-page" style={{ background: "#0c0a14" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 15%, rgba(201,168,76,0.08) 0%, transparent 60%)" }}
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
        <p className="font-cormorant text-[0.7rem] tracking-[0.4em] uppercase text-yellow-500/50 mb-4">
          Second floor — Storgata 39, Tromsø
        </p>

        <h1 className="font-cormorant text-5xl sm:text-6xl font-light tracking-wide text-stone-200 leading-[1]">
          The Cocktail Lounge
        </h1>

        <div className="mt-4 h-px w-16 bg-yellow-600/30" />

        <p className="font-lora text-lg text-white/70 mt-8 leading-relaxed">
          Cocktails in Tromsø usually mean a hotel bar or a queue. The second floor at Huken Brygg is
          neither: low light, deep seats, and a bar that keeps pouring until 02:00 on weeknights and
          03:30 on Friday and Saturday.
        </p>

        <h2 className="font-cormorant text-3xl font-light tracking-wide text-stone-200 mt-14 mb-2">
          What we pour
        </h2>
        <div className="h-px w-full mb-6" style={{ background: "linear-gradient(to right, rgba(201,168,76,0.3), transparent)" }} />

        <p className="font-lora text-base text-white/55 leading-relaxed">
          The classics, made properly — an Amaretto Sour, an Espresso Martini, a Negroni, a Pink Gin
          and tonic. Then the house drinks the bartenders here invented and refuse to take off the
          list, like the Shrek: Tullamore Dew and Cointreau, and no, it is not green because of
          anything sensible.
        </p>

        <p className="font-lora text-base text-white/55 mt-5 leading-relaxed">
          Prosecco by the bottle, house wine by the glass, and a proper beer list downstairs if the
          night turns that way. Order at the bar or from your table.
        </p>

        <h2 className="font-cormorant text-3xl font-light tracking-wide text-stone-200 mt-14 mb-2">
          For students and regulars
        </h2>
        <div className="h-px w-full mb-6" style={{ background: "linear-gradient(to right, rgba(201,168,76,0.3), transparent)" }} />

        <p className="font-lora text-base text-white/55 leading-relaxed">
          Students, regulars and local businesses can pick up a Huken sticker at the bar. It gets you
          our regulars&apos; rates every day of the week. Thursdays the whole house runs on the
          Thursday list, food included &mdash; the burger is 199 kr.
        </p>
        <p className="font-lora text-base text-white/55 mt-5 leading-relaxed">
          Ask at the bar for the current list.
        </p>

        <h2 className="font-cormorant text-3xl font-light tracking-wide text-stone-200 mt-14 mb-2">
          Eat first, drink after
        </h2>
        <div className="h-px w-full mb-6" style={{ background: "linear-gradient(to right, rgba(201,168,76,0.3), transparent)" }} />

        <p className="font-lora text-base text-white/55 leading-relaxed">
          The kitchen on the first floor runs until 01:30 Sunday to Thursday and 03:00 on Friday and
          Saturday, so you can eat late and then come up, rather than the other way around. Age limit
          is 20.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/book?floor=lounge" className="cta" style={{ borderColor: "rgba(200,168,76,0.4)", color: "#c9a84c" }}>
            Book a table
          </Link>
          <Link href="/meny" className="cta" style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)" }}>
            Food menu
          </Link>
          <Link href="/late-night-food" className="cta" style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)" }}>
            Late night food
          </Link>
        </div>

        <section lang="no" className="mt-16 pt-10 border-t border-white/10">
          <h2 className="font-cormorant text-3xl font-light tracking-wide text-stone-200 mb-2">
            Cocktailbar i Tromsø
          </h2>
          <div className="h-px w-full mb-6" style={{ background: "linear-gradient(to right, rgba(201,168,76,0.3), transparent)" }} />
          <p className="font-lora text-base text-white/55 leading-relaxed">
            The Cocktail Lounge ligger i andre etasje på Storgata 39. Klassikerne laget skikkelig,
            pluss husets egne drinker. Åpent til 02:00 søndag til torsdag og 03:30 fredag og lørdag.
          </p>
          <p className="font-lora text-base text-white/55 mt-4 leading-relaxed">
            Studenter og stamgjester kan hente Huken-klistremerke i baren &mdash; det gir
            stamgjestpris alle dager. Torsdager gjelder torsdagsprisene i hele huset, også på maten:
            burger 199 kr. Spør i baren om gjeldende priser. Aldersgrense 20 år.
          </p>
        </section>
      </article>
    </div>
  );
}
