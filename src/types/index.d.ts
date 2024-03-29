export interface CollectionData {
  contractAddress: `0x${string}`;
  chainId: undefined | number;
  message?: string | any;
  contractType: string;
  imageUrl: string;
}

export interface ErrorMsg {
  response: {
    data: {
      message: {
        name: string;
      };
      name: string;
    };
    statusText: string;
    status: number;
  };
}
