import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import Footer from "app/components/Footer";

const inter = Inter({ subsets: ["latin"] });
const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  title: "Flashot - Code to Image Converter",
  description:
    "Transform your code snippets into beautiful, shareable images with syntax highlighting and customizable themes. Perfect for social media, documentation, and presentations.",
  keywords: [
    "code to image",
    "syntax highlighting",
    "code snippets",
    "programming",
    "developer tools",
    "code sharing",
    "screenshot",
    "flashot",
  ],
  authors: [{ name: "Flashot Team" }],
  creator: "Flashot Team",
  publisher: "Flashot",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://flashot.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Flashot - Code to Image Converter",
    description:
      "Transform your code snippets into beautiful, shareable images with syntax highlighting and customizable themes.",
    url: "https://flashot.dev",
    siteName: "Flashot",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flashot - Code to Image Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flashot - Code to Image Converter",
    description:
      "Transform your code snippets into beautiful, shareable images with syntax highlighting and customizable themes.",
    images: ["/og-image.png"],
    creator: "@flashot_dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className} ${firaCode.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
