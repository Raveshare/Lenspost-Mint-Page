import { BACKEND_ENDPOINT, ResMsg } from '@/data';
import { CollectionData } from '@/types';

export const getCollectionData = async (
  slug: string
): Promise<CollectionData> => {
  console.log('getCollectionData-BACKEND_ENDPOINT', BACKEND_ENDPOINT);
  console.log('getCollectionData-slug', slug);
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
    return {
      message: ResMsg[response?.status as keyof typeof ResMsg],
      contractAddress: '0x',
      chainId: undefined,
      contractType: '',
      imageUrl: ''
    };
  }
};
