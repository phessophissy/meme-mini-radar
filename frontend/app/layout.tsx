import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meme Mini-Radar - Base Meme Token Whale Tracker",
  description: "Real-time radar tracking the top 15 meme tokens smart money and whales are accumulating on Base. Dynamic data updates every 5 minutes.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Meme Mini-Radar",
    description: "Track whale activity and smart money flow on Base meme tokens",
    images: ["/logo.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meme Mini-Radar",
    description: "Track whale activity and smart money flow on Base meme tokens",
    images: ["/logo.png"],
  },
  other: {
    "fc:miniapp": JSON.stringify({
      version: "next",
      imageUrl: "https://meme-mini-radar.vercel.app/logo.png",
      button: {
        title: "Track Whales Now",
        action: {
          type: "launch_miniapp",
          name: "Meme Mini-Radar",
          url: "https://meme-mini-radar.vercel.app"
        }
      }
    })
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
