import Head from "next/head";
import NFTCard from "./components/NFTCard";

export default function Mint() {
  return (
    <>
      <Head>
        <title>LensPost NFT</title>
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={`https://lh3.googleusercontent.com/yfRQyA1UzkKyB_vTrLkobf6xGnuNcKCRgezt7mcsxlpJU-7erg6kCrII_HgzKLchuBV0ODba_EH_BGvmu-TEijrigeXCz0eCqMyPf-k9hBCnx64QgEfHghRFZmH0vgkAHoXo3NPB8C3OaYCcc5xnNTs`}
        />
      </Head>
      <div className="p-4 sm:p-10 bg-[#B7DAEE] h-screen flex items-center justify-center">
        <NFTCard />
      </div>
    </>
  );
}
