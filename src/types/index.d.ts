export interface CollectionData {
  contractAddress?: `0x${string}`;
  chainId?: undefined | number;
  publicSaleActive?: boolean;
  publicSaleStart?: string;
  imageUrl?: string | any;
  publicSaleEnd?: string;
  message?: string | any;
  contractType?: string;
  totalMinted?: string;
  royaltyBPS?: string;
  maxSupply?: string;
  price?: string;
  title?: string;
}

export interface MintParams {
  address: `0x${string}`;
  functionName: string;
  chainId: number;
  value: bigint;
  abi: Object;
  args: [];
}

export interface MintFunction {
  (): void;
}
