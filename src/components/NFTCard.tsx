'use client';

import {
  useWaitForTransactionReceipt,
  useSimulateContract,
  useWriteContract,
  useAccount
} from 'wagmi';
import { LENSPOST_ETH_ADDRESS, ZORA_REWARD_FEE, chainName } from '@/data';
import { erc721DropABI } from '@zoralabs/zora-721-contracts';
import { CollectionData } from '@/types';
import { Button, Input } from '@/ui';
import { parseEther } from 'viem';
import { Share } from '@/assets';
import Image from 'next/image';

import { CustomConnectButton } from '.';

const NFTCard = ({
  contractAddress,
  contractType,
  imageUrl,
  chainId
}: CollectionData) => {
  const { address: EVMAddress } = useAccount();
  // const bigIntQuantity = BigInt(`${quantity}`);
  //const mintNo=BigInt(quantity);
  const comment = '';
  const mintReferral = LENSPOST_ETH_ADDRESS;
  //const mintFee=BigInt(ZORA_REWARD_FEE);
  const mintFee = parseEther(ZORA_REWARD_FEE);
  const mintTotalFee = mintFee * 1n;

  const {
    isError: isPrepareError,
    error: prepareError,
    data
  } = useSimulateContract({
    args: [EVMAddress as `0x${string}`, 1n, comment, mintReferral],
    functionName: 'mintWithRewards',
    address: contractAddress,
    value: mintTotalFee,
    abi: erc721DropABI,
    chainId: chainId
  });

  console.log('data', data);

  const {
    writeContract: handleMint721,
    data: hash,
    isPending,
    error
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash
    });

  const handleMint1155 = () => {};

  const handleMint = () => {
    if (contractType === 'ERC721') {
      handleMint721;
    } else {
      handleMint1155();
    }
  };

  return (
    <div className="mx-auto flex max-w-4xl flex-col justify-between gap-8 rounded-3xl bg-white p-6 shadow-2xl sm:flex-row sm:p-10">
      <Image
        className="w-full rounded-3xl shadow-xl sm:w-1/3"
        src={imageUrl}
        height={300}
        width={300}
        alt=""
      />
      <div className="w-full">
        <div className="ml-auto w-fit">
          <CustomConnectButton />
        </div>
        <div className="mt-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold sm:text-4xl">LensPost 2024</h3>
          <div className="cursor-pointer rounded-full border-2 border-[#E7D9E9] p-1">
            <Share height={16} width={16} />
          </div>
        </div>
        <p className="mt-2 text-xs text-[#11111b] sm:text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua ut labore.
        </p>
        <div className="my-4 border border-dashed border-[#9E9EAD] border-opacity-30"></div>
        <div>
          <p className="text-xs text-[#11111b] sm:text-sm">Claimable Period</p>
          <p className="text-xs text-[#11111b] sm:text-sm">
            Feb 16, 2024 00:00 (UTC) - Feb 04, 2024 23:59 (UTC)
          </p>
        </div>
        <div className="mt-2 inline-block cursor-pointer rounded-md bg-gray-100 p-2 hover:bg-gray-200">
          <div className="flex items-center gap-2">
            <p className="text-gray-700">
              <span className="font-semibold">Network:</span>{' '}
              {chainName[chainId as unknown as keyof typeof chainName]}
            </p>
          </div>
        </div>
        <div className="ml-2 inline-block">
          <label className="text-sm font-medium text-black">Quantity:</label>
          <Input />
        </div>
        {/* Dropdown */}
        <div className="mt-2 w-full cursor-pointer rounded-lg bg-[#EBE8FD] px-4 py-2 text-center sm:w-fit">
          <Button onClick={handleMint} title="Mint NFT" />
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
