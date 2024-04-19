import {
  LENSPOST_TWITTER_USERNAME,
  LENSPOST_APP_URL,
  CDN_IMAGE_URL,
  S3_IMAGE_URL,
  DESCRIPTION,
  APP_NAME,
  APP_URL,
  AUTHOR
} from '@/data';
import { Default, NFTCard } from '@/components';
import { getCollectionData } from '@/services';
import { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export const generateMetadata = async ({
  params
}: Props): Promise<Metadata> => {
  const slug = params.slug;

  const { imageUrl } = await getCollectionData(slug);
  const imageCdnUrl = imageUrl.replace(S3_IMAGE_URL, CDN_IMAGE_URL);

  return {
    twitter: {
      creator: LENSPOST_TWITTER_USERNAME,
      site: LENSPOST_TWITTER_USERNAME,
      card: 'summary_large_image',
      description: DESCRIPTION,
      images: [imageCdnUrl],
      title: APP_NAME
    },
    keywords: [
      'Lenspost Mint',
      'Lenspost NFT',
      'Lenspost',
      'Poster',
      'Mint',
      'NFT'
    ],
    openGraph: {
      description: DESCRIPTION,
      images: [imageCdnUrl],
      title: APP_NAME,
      url: APP_URL
    },
    authors: [{ url: LENSPOST_APP_URL, name: AUTHOR }],
    metadataBase: new URL(APP_URL),
    description: DESCRIPTION,
    icons: ['/favicon.ico'],
    creator: AUTHOR,
    title: APP_NAME
  };
};

const Home = async ({ params }: Props) => {
  const {
    publicSaleActive,
    contractAddress,
    publicSaleStart,
    publicSaleEnd,
    contractType,
    totalMinted,
    royaltyBPS,
    maxSupply,
    imageUrl,
    chainId,
    message,
    price,
    title
  } = await getCollectionData(params?.slug);

  if (message) {
    return <Default text={message} />;
  }

  return (
    <NFTCard
      publicSaleActive={publicSaleActive}
      contractAddress={contractAddress}
      publicSaleStart={publicSaleStart}
      publicSaleEnd={publicSaleEnd}
      contractType={contractType}
      totalMinted={totalMinted}
      royaltyBPS={royaltyBPS}
      maxSupply={maxSupply}
      imageUrl={imageUrl}
      chainId={chainId}
      title={title}
      price={price}
    />
  );
};

export default Home;
