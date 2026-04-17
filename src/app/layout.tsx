import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Huken Brygg — Three Floors. Three Worlds.",
  description: "The Gastro Bar. The Cocktail Lounge. The Underground. Choose your night.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" className="h-full antialiased">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Lora:ital,wght@0,400;0,600;1,400&family=Cormorant:wght@300;400;600&family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="grain">{children}</body>
    </html>
  );
}
