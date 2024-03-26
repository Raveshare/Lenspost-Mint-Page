import { BACKEND_ENDPOINT } from "@/data";
import { CollectionData } from "@/types";
import { errorMsg } from "@/utils";

export const getCollectionData = async (
  slug: string
): Promise<CollectionData> => {
  try {
    const response = await fetch(
      `${BACKEND_ENDPOINT}/util/get-slug-details?slug=${slug}`
    );
    const data = await response.json();
    return {
      imageUrl: data?.image,
      contractAddress: data?.contract,
      chainId: data?.chainId,
      contractType: data?.contractType,
    };
  } catch (error: any) {
    console.error("Error fetching collection data", error);
    return {
      imageUrl: "",
      contractAddress: "0x",
      chainId: "eip155:1",
      contractType: "",
      message: errorMsg(error),
    };
  }
};
