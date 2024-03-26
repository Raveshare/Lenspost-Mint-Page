import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import {
  APP_NAME,
  APP_URL,
  AUTHOR,
  DESCRIPTION,
  LENSPOST_APP_URL,
  LENSPOST_TWITTER_USERNAME,
} from "@/data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: APP_NAME,
  description: DESCRIPTION,
  keywords: ["NFT", "Mint", "Lenspost", "Lenspost NFT", "Lenspost Mint"],
  authors: [{ name: AUTHOR, url: LENSPOST_APP_URL }],
  creator: AUTHOR,
  icons: ["/favicon.ico"],
  openGraph: {
    title: APP_NAME,
    description: DESCRIPTION,
    images: [`${APP_URL}/logo.png`],
    url: APP_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: DESCRIPTION,
    creator: LENSPOST_TWITTER_USERNAME,
    images: [`${APP_URL}/logo.png`], // Must be an absolute URL
    site: LENSPOST_TWITTER_USERNAME,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
