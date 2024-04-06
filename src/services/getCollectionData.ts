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
        contractType: data?.contractType,
        contractAddress: data?.contract,
        chainId: data?.chainId,
        imageUrl: data?.image
      };
    } else {
      console.error('response', response);
      return {
        message: response?.status + ' - ' + response?.statusText
      };
    }
  } catch (error) {
    console.error('error', error);
    return {
      message: "Couldn't fetch data"
    };
  }
};
