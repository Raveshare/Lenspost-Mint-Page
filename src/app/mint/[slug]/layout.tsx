import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  APP_NAME,
  APP_URL,
  AUTHOR,
  DESCRIPTION,
  LENSPOST_APP_URL,
  LENSPOST_TWITTER_USERNAME,
} from "@/data";
import { getCollectionData } from "@/services";
import { EvmProvider } from "@/providers";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  console.log("layout-slug", slug);

  const { imageUrl } = await getCollectionData(slug);

  return {
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
      images: [imageUrl],
      url: APP_URL,
    },
    twitter: {
      card: "summary_large_image",
      title: APP_NAME,
      description: DESCRIPTION,
      creator: LENSPOST_TWITTER_USERNAME,
      images: [imageUrl], // Must be an absolute URL
      site: LENSPOST_TWITTER_USERNAME,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <EvmProvider>{children}</EvmProvider>
      </body>
    </html>
  );
}
