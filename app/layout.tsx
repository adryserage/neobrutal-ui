import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next"

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    default: "NeoBrutal UI",
    template: "%s | NeoBrutal UI",
  },
  description: "A neobrutalistic React component library built with Next.js and Tailwind CSS.",
  keywords: ["react", "next.js", "tailwindcss", "neobrutalism", "component library", "ui kit", "design system"],
  authors: [{ name: "Bridget", url: "https://github.com/bridgetamana" }],
  creator: "Bridget",
  metadataBase: new URL("https://neobrutal-ui.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://neobrutal-ui.vercel.app",
    title: "NeoBrutal UI",
    description: "A neobrutalistic React component library built with Next.js and Tailwind CSS.",
    siteName: "NeoBrutal UI",
    // images: [
    //   {
    //     url: "/og-image.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "NeoBrutal UI",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NeoBrutal UI",
    description: "A neobrutalistic React component library built with Next.js and Tailwind CSS.",
    // images: ["/og-image.png"],
    creator: "@bridgetamana",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${publicSans.variable} antialiased`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
