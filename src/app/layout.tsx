import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://studyitall.com"),
  title: {
    default: "StudyItAll.com — Learn Coding, AI, Languages & More Free",
    template: "%s | StudyItAll.com",
  },
  description:
    "Free interactive lessons in coding, AI, math, science, history, English, Spanish, and Thai. Live code editor, audio narration, quizzes, and structured courses. No sign-up required.",
  keywords: [
    "learn coding free",
    "learn programming online",
    "python tutorial",
    "javascript tutorial",
    "learn AI",
    "machine learning course",
    "learn thai online",
    "learn spanish free",
    "free online courses",
    "coding for beginners",
    "studyitall",
    "study it all",
    "interactive coding lessons",
    "programming quizzes",
  ],
  authors: [{ name: "StudyItAll.com" }],
  creator: "StudyItAll.com",
  publisher: "Newra.io",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://studyitall.com",
    siteName: "StudyItAll.com",
    title: "StudyItAll.com — Learn Coding, AI, Languages & More Free",
    description:
      "Free interactive lessons in coding, AI, math, science, and languages. Live code editor, audio narration, and structured courses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "StudyItAll.com — Learn Coding, AI, Languages & More Free",
    description:
      "Free interactive lessons in coding, AI, math, science, and languages.",
  },
  alternates: {
    canonical: "https://studyitall.com",
  },
};

// JSON-LD structured data for the entire site
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "StudyItAll.com",
  url: "https://studyitall.com",
  description:
    "Free interactive education platform for coding, AI, math, science, history, and languages.",
  publisher: {
    "@type": "Organization",
    name: "StudyItAll.com",
    url: "https://studyitall.com",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://studyitall.com/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
