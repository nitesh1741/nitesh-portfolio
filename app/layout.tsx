import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile, siteUrl } from "@/data/portfolio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nitesh Kumar Mehta | .NET Backend & Agentic AI Engineer",
    template: "%s | Nitesh Kumar Mehta",
  },
  description:
    "Portfolio of Nitesh Kumar Mehta (Neetesh), a software engineer from Bhokraha, Sunsari, Nepal — now at CHUBB India, Hyderabad — building .NET microservices, Azure/Kafka event pipelines, Redis caching systems, and Agentic AI apps.",
  keywords: profile.seoKeywords,
  authors: [{ name: "Nitesh Kumar Mehta" }],
  creator: "Nitesh Kumar Mehta",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nitesh Kumar Mehta | .NET Backend & Agentic AI Engineer",
    description:
      "Backend, cloud, and AI engineering portfolio — .NET microservices, Azure, Kafka, Redis, LangChain, RAG, and production systems. Engineer from Sunsari, Nepal at CHUBB India, Hyderabad.",
    url: "/",
    siteName: "Nitesh Kumar Mehta Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Nitesh Kumar Mehta — .NET Backend and Agentic AI Engineer from Nepal, based in Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitesh Kumar Mehta | .NET Backend & Agentic AI Engineer",
    description:
      "Software engineer from Sunsari, Nepal — building .NET microservices, Azure/Kafka pipelines, Redis caching, and Agentic AI apps at CHUBB India, Hyderabad.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        {/* Geo targeting — current location */}
        <meta name="geo.region" content="IN-TG" />
        <meta name="geo.placename" content="Hyderabad, Telangana, India" />
        <meta name="geo.position" content="17.3850;78.4867" />
        <meta name="ICBM" content="17.3850, 78.4867" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
