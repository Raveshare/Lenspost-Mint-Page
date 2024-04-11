export interface CollectionData {
  contractAddress?: `0x${string}`;
  chainId?: undefined | number;
  imageUrl?: string | any;
  message?: string | any;
  contractType?: string;
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
