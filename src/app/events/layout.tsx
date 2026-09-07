import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Live Nights at The Underground",
  description:
    "What's on at Huken Brygg in Tromsø — live nights, DJs and events in The Underground, our basement room at Storgata 39.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Events | Huken Brygg Tromsø",
    description: "Live nights, DJs and events in The Underground, Storgata 39, Tromsø.",
    url: "/events",
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
