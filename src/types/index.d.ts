export interface CollectionData {
  imageUrl: string;
  contractAddress: `0x${string}`;
  chainId: `eip155:${string}` | `solana:${string}`;
  contractType: string;
  message?: string | any;
}

export interface ErrorMsg {
  response: {
    data: {
      message: {
        name: string;
      };
      name: string;
    };
    status: number;
    statusText: string;
  };
}