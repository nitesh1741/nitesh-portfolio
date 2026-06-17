import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/data/portfolio";

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
    template: "%s | Nitesh Kumar",
  },
  description:
    "Portfolio of Nitesh Kumar Mehta, a software engineer in Hyderabad building .NET microservices, Azure/Kafka event pipelines, Redis caching systems, and Agentic AI apps.",
  keywords: [
    "Nitesh Kumar Mehta",
    ".NET Backend Engineer",
    "Agentic AI Engineer",
    "Azure Microservices Engineer",
    "Kafka Software Engineer",
    "Distributed Systems Engineer",
    "LangChain Developer",
    "RAG Developer",
    "Backend Software Engineer Hyderabad",
    "Redis Caching",
    "TypeScript",
  ],
  authors: [{ name: "Nitesh Kumar Mehta" }],
  creator: "Nitesh Kumar Mehta",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nitesh Kumar Mehta | .NET Backend & Agentic AI Engineer",
    description:
      "Backend, cloud, and AI engineering portfolio covering .NET microservices, Azure, Kafka, Redis, LangChain, RAG, and production systems.",
    url: "/",
    siteName: "Nitesh Kumar Mehta Portfolio",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Nitesh Kumar Mehta .NET Backend and Agentic AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitesh Kumar Mehta | .NET Backend & Agentic AI Engineer",
    description:
      "Software engineer building .NET microservices, Azure/Kafka pipelines, Redis caching systems, and Agentic AI apps.",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
