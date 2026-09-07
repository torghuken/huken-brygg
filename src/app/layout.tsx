import type { Metadata } from "next";
import "./globals.css";

const SITE = "https://hukenbrygg.no";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Huken Brygg — Restaurant, Bar & Cocktail Lounge in Tromsø",
    template: "%s | Huken Brygg Tromsø",
  },
  description:
    "Restaurant, gastropub and cocktail lounge in the centre of Tromsø. Kitchen open late — until 01:30 Sun–Thu and 03:00 Fri–Sat. Reindeer burgers, baked potatoes and cocktails at Storgata 39.",
  keywords: [
    "restaurant Tromsø",
    "restaurant in Tromsø",
    "late night food Tromsø",
    "kitchen open late Tromsø",
    "cocktails Tromsø",
    "cocktail bar Tromsø",
    "gastropub Tromsø",
    "reindeer burger Tromsø",
    "where to eat in Tromsø",
    "bar Tromsø sentrum",
  ],
  applicationName: "Huken Brygg",
  authors: [{ name: "Huken Brygg" }],
  creator: "Huken Brygg",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    alternateLocale: ["nb_NO"],
    url: SITE,
    siteName: "Huken Brygg",
    title: "Huken Brygg — Restaurant, Bar & Cocktail Lounge in Tromsø",
    description:
      "Three floors in the centre of Tromsø. Gastro bar, cocktail lounge and a basement club — with the kitchen open until 01:30 on weeknights and 03:00 on weekends.",
    images: [{ url: "/images/gastro.jpg", width: 1200, height: 630, alt: "Huken Brygg, Storgata 39, Tromsø" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Huken Brygg — Restaurant & Cocktail Lounge in Tromsø",
    description: "Kitchen open late in the centre of Tromsø. Storgata 39.",
    images: ["/images/gastro.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: { icon: "/favicon.ico" },
  verification: {
    google: "VKVf59vZnHFIwU7Sr5Ln1W8amp_q-CyNVoocUHzE_Kk",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Restaurant",
      "@id": `${SITE}/#restaurant`,
      name: "Huken Brygg",
      alternateName: ["Huken BRYGG", "Huken"],
      url: SITE,
      description:
        "Restaurant, gastropub and cocktail lounge over three floors in the centre of Tromsø. Kitchen open late every night.",
      image: [`${SITE}/images/gastro.jpg`, `${SITE}/images/lounge.jpg`],
      logo: `${SITE}/logo.png`,
      priceRange: "$$",
      currenciesAccepted: "NOK",
      paymentAccepted: "Cash, Credit Card, Debit Card, Vipps",
      servesCuisine: ["Norwegian", "Arctic", "Burgers", "Pub food"],
      acceptsReservations: `${SITE}/book`,
      hasMenu: `${SITE}/meny`,
      foundingDate: "2017",
      slogan: "Three floors. Three worlds.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Storgata 39",
        postalCode: "9008",
        addressLocality: "Tromsø",
        addressRegion: "Troms",
        addressCountry: "NO",
      },
      geo: { "@type": "GeoCoordinates", latitude: 69.6497, longitude: 18.9553 },
      areaServed: { "@type": "City", name: "Tromsø" },
      sameAs: [
        "https://www.instagram.com/hukenbrygg",
        "https://www.facebook.com/HukenBrygg",
      ],
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"], opens: "15:00", closes: "02:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday", "Saturday"], opens: "15:00", closes: "03:30" },
      ],
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Kitchen open late", value: true },
        { "@type": "LocationFeatureSpecification", name: "Cocktail bar", value: true },
        { "@type": "LocationFeatureSpecification", name: "Live events", value: true },
        { "@type": "LocationFeatureSpecification", name: "Table reservations", value: true },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Huken Brygg",
      inLanguage: ["en", "no"],
      publisher: { "@id": `${SITE}/#restaurant` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Lora:ital,wght@0,400;0,600;1,400&family=Cormorant:wght@300;400;600&family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="grain">{children}</body>
    </html>
  );
}
