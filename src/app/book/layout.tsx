import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Table in Tromsø",
  description:
    "Reserve a table at Huken Brygg in the centre of Tromsø — The Gastro Bar, The Cocktail Lounge or The Underground. Storgata 39, open every day.",
  alternates: { canonical: "/book" },
  robots: { index: true, follow: true },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
