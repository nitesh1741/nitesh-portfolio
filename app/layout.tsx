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
    default: "Nitesh Kumar | Software Engineer",
    template: "%s | Nitesh Kumar",
  },
  description:
    "Personal portfolio of Nitesh Kumar, a Software Engineer focused on modern frontend systems, product engineering, and reliable web experiences.",
  keywords: [
    "Nitesh Kumar",
    "Software Engineer",
    "Frontend Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Nitesh Kumar" }],
  creator: "Nitesh Kumar",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nitesh Kumar | Software Engineer",
    description:
      "Modern professional portfolio showcasing engineering experience, projects, skills, education, and contact information.",
    url: "/",
    siteName: "Nitesh Kumar Portfolio",
    type: "website",
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
