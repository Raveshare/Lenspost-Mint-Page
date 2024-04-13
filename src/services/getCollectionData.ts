import { BACKEND_ENDPOINT } from '@/data';
import { CollectionData } from '@/types';

export const getCollectionData = async (
  slug: string
): Promise<CollectionData> => {
  try {
    const response = await fetch(
      `${BACKEND_ENDPOINT}/util/get-slug-details?slug=${slug}`
    );

    if (response.ok) {
      const data = await response.json();
      return {
        publicSaleStart: data?.metadata?.publicSaleStart,
        publicSaleEnd: data?.metadata?.publicSaleEnd,
        activeSale: data?.metadata?.publicSaleActive,
        totalMinted: data?.metadata?.totalMinted,
        price: data?.metadata?.publicSalePrice,
        maxSupply: data?.metadata?.maxSupply,
        contractType: data?.contractType,
        contractAddress: data?.contract,
        title: data?.metadata?.name,
        chainId: data?.chainId,
        imageUrl: data?.image
      };
    } else {
      return {
        message: response?.status + ' - ' + response?.statusText
      };
    }
  } catch (error) {
    return {
      message: "Couldn't fetch data"
    };
  }
};
