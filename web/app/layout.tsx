import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import JsonLd from "./components/JsonLd";

const inter = Inter({ subsets: ["latin"] });
const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  title: {
    default: "Flashot - Rapidly snapshot code snippets as images",
    template: "%s | Flashot",
  },
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
    "code screenshot",
    "beautify code",
    "code formatter",
    "developer productivity",
    "coding tools",
    "github code",
    "code presentation",
  ],
  authors: [
    {
      name: "Tran Nguyen Thuong Truong",
      url: "https://github.com/thuongtruong109",
    },
  ],
  creator: "Tran Nguyen Thuong Truong",
  publisher: "Tran Nguyen Thuong Truong",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://flashot.vercel.app"),
  alternates: {
    canonical: "/",
  },
  applicationName: "Flashot",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Flashot",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Flashot - Rapidly snapshot code snippets as images",
    description:
      "Transform your code snippets into beautiful, shareable images with syntax highlighting and customizable themes. Perfect for social media, documentation, and presentations.",
    url: "https://flashot.vercel.app",
    siteName: "Flashot",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flashot - Code to Image Converter",
        type: "image/png",
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
    site: "@flashot_dev",
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
    yandex: "your-yandex-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className} ${firaCode.variable}`}>
      <head>
        <JsonLd />
        <link rel="icon" href="/favicon.png" />
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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Flashot" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
