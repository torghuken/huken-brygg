import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Food Menu — Burgers, Baked Potatoes & Reindeer",
  description:
    "The food menu at Huken Brygg in Tromsø: reindeer burgers, baked potatoes, pancakes and classic burgers from 165 kr. Kitchen open until 01:30 Sun–Thu and 03:00 Fri–Sat. Storgata 39.",
  alternates: { canonical: "/meny" },
  openGraph: {
    title: "Food Menu | Huken Brygg Tromsø",
    description: "Reindeer burgers, baked potatoes and pancakes in the centre of Tromsø. Kitchen open late.",
    url: "/meny",
  },
};

export default function MenyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
