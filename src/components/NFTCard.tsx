'use client';

import {
  useWaitForTransactionReceipt,
  useSimulateContract,
  useWriteContract,
  useSwitchChain,
  useAccount
} from 'wagmi';
import { LENSPOST_ETH_ADDRESS, ZORA_REWARD_FEE, chainName } from '@/data';
import { erc721DropABI } from '@zoralabs/zora-721-contracts';
// import { ConnectButton } from '@rainbow-me/rainbowkit';
import { CollectionData } from '@/types';
import { Button, Input } from '@/ui';
import { base } from 'viem/chains';
import { parseEther } from 'viem';
import { useEffect } from 'react';
import { Share } from '@/assets';
import Image from 'next/image';

import { ConnectButton } from '.';

const NFTCard = ({
  contractAddress,
  contractType,
  imageUrl,
  chainId
}: CollectionData) => {
  const {
    chainId: currentChainId,
    address: EVMAddress,
    isConnected
  } = useAccount();
  const { isSuccess: isSwitchChainSuccess, switchChain } = useSwitchChain();

  const isSupportedChain: Boolean = chainId === currentChainId;
  // const bigIntQuantity = BigInt(`${quantity}`);
  //const mintNo=BigInt(quantity);
  const comment = '';
  const mintReferral = LENSPOST_ETH_ADDRESS;
  //const mintFee=BigInt(ZORA_REWARD_FEE);
  const mintFee = parseEther(ZORA_REWARD_FEE);
  const mintTotalFee = mintFee * 1n;

  const config = {
    args: [EVMAddress as `0x${string}`, 1n, comment, mintReferral],
    functionName: 'mintWithRewards',
    address: contractAddress,
    value: mintTotalFee,
    abi: erc721DropABI,
    chainId: chainId
  };

  const {
    isError: isSimulateError,
    isLoading: isSimulating,
    error: simulateError,
    data: simulateData,
    refetch
  } = useSimulateContract(config as any);

  const {
    writeContract: handleMint721,
    isError: isWriteError,
    isPending: isWriting,
    error: writeError,
    data: writeData
  } = useWriteContract();

  const {
    isLoading: isTxConfirming,
    isSuccess: isTxSuccess,
    isError: isTxError,
    error: txError,
    data: txData
  } = useWaitForTransactionReceipt({
    hash: writeData
  });

  const handleMint1155 = () => {};

  const handleMint = () => {
    if (contractType == '721') {
      handleMint721(simulateData?.request as any);
    } else {
      handleMint1155();
    }
  };

  useEffect(() => {
    if (isSwitchChainSuccess) {
      refetch();
    }
  }, [isSwitchChainSuccess, refetch]);

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
          <ConnectButton />
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
        <hr className="my-4 border border-dashed border-[#9E9EAD] border-opacity-30" />
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

        {/* TODO: Dropdown */}

        <div className="mt-2 w-full rounded-lg bg-[#EBE8FD] px-4 py-2 text-center sm:w-fit">
          {isSupportedChain ? (
            <Button
              disabled={!isConnected || isSimulateError || !simulateData}
              onClick={handleMint}
              title="Mint NFT"
            />
          ) : (
            <Button
              onClick={() => switchChain({ chainId: chainId as number })}
              title="Switch chain"
            />
          )}
        </div>

        {(isSimulating || isWriting || isTxConfirming) && (
          <div className="mt-2 text-sm font-semibold ">
            {isSimulating && 'Simulating...'}
            {isTxConfirming && 'Confirming...'}
            {isWriting && 'Writing...'}
          </div>
        )}

        {isSimulateError && (
          <div className="mt-2 text-sm text-red-500">
            <span className="font-bold">Error:</span>{' '}
            {simulateError?.message?.split('\n')[0]}
          </div>
        )}

        {isWriteError && (
          <div className="mt-2 text-sm text-red-500">
            <span className="font-bold">Error:</span>{' '}
            {writeError?.message?.split('\n')[0]}
          </div>
        )}

        {isTxError && (
          <div className="mt-2 text-sm text-red-500">
            <span className="font-bold">Error:</span>{' '}
            {txError?.message?.split('\n')[0]}
          </div>
        )}

        {isTxSuccess && (
          <div className="mt-2 text-sm text-green-500">
            <span className="font-bold">Success:</span> Transaction confirmed
            <a
              href={
                base?.blockExplorers?.default?.url +
                '/tx/' +
                txData?.transactionHash
              }
              rel="noreferrer"
              target="_blank"
            >
              {' '}
              View here
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTCard;
