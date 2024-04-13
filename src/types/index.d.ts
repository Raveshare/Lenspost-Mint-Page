export interface CollectionData {
  contractAddress?: `0x${string}`;
  chainId?: undefined | number;
  publicSaleStart?: string;
  imageUrl?: string | any;
  publicSaleEnd?: string;
  message?: string | any;
  contractType?: string;
  activeSale?: boolean;
  totalMinted?: string;
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
