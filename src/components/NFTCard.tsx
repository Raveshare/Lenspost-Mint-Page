'use client';

import {
  LENSPOST_ETH_ADDRESS,
  CREATORS_REWARD_FEE,
  chainName,
  regex
} from '@/data';
import { erc721DropABI } from '@zoralabs/zora-721-contracts';
import { useSwitchChain, useAccount } from 'wagmi';
import { useEffect, useState, FC } from 'react';
import { CollectionData } from '@/types';
import { useMint721 } from '@/hooks';
import { base } from 'viem/chains';
import { parseEther } from 'viem';
import { Share } from '@/assets';
import Image from 'next/image';
import { toast } from 'sonner';
import { Button } from '@/ui';

import { ConnectButton } from '.';

const NFTCard: FC<CollectionData> = ({
  contractAddress,
  publicSaleStart,
  publicSaleEnd,
  contractType,
  totalMinted,
  activeSale,
  maxSupply,
  imageUrl,
  chainId,
  price,
  title
}) => {
  const [quantity, setQuantity] = useState(1n);
  const { isSuccess: isSwitchChainSuccess, switchChain } = useSwitchChain();
  const [isInputError, setIsInputError] = useState(false);
  const {
    chainId: currentChainId,
    address: EVMAddress,
    isConnected
  } = useAccount();

  const isSupportedChain: Boolean = isConnected && chainId === currentChainId;
  const mintFee = parseEther(CREATORS_REWARD_FEE);
  const mintReferral = LENSPOST_ETH_ADDRESS;
  const mintTotalFee = mintFee * quantity;
  const comment = '';

  const handleQuantity = (e: any) => {
    const value = e.target.value;

    if (!regex?.number.test(value)) {
      setIsInputError(true);
      return;
    } else {
      setIsInputError(false);
    }

    if (value < 1 || !value) {
      setQuantity(1n);
    } else {
      setQuantity(BigInt(value));
    }
  };

  const mintParams = {
    args: [EVMAddress as `0x${string}`, quantity, comment, mintReferral],
    functionName: 'mintWithRewards',
    address: contractAddress,
    value: mintTotalFee,
    abi: erc721DropABI,
    chainId: chainId
  };

  const {
    simulation: {
      refetchSimulation,
      isSimulateError,
      simulateError,
      isSimulating,
      simulateData
    },
    tx: { isTxConfirming, isTxSuccess, isTxError, txError, txData },
    write: { isWriteError, writeError, isWriting, mint721 }
  } = useMint721(mintParams);

  useEffect(() => {
    if (isSwitchChainSuccess) {
      refetchSimulation();
    }
  }, [isSwitchChainSuccess, refetchSimulation]);

  useEffect(() => {
    if (isTxSuccess) {
      toast.success('NFT minted successfully!');
    }
  }, [isTxSuccess]);

  useEffect(() => {
    if (isSimulateError || isWriteError || isTxError) {
      const error: any = simulateError || writeError || txError;
      toast.error(error?.message?.split('\n')[0]);
    }
  }, [
    isSimulateError,
    simulateError,
    isWriteError,
    writeError,
    isTxError,
    txError
  ]);

  // console.log({
  //   typeof: typeof erc721DropABI,
  //   currentChainId,
  //   simulateError,
  //   simulateData,
  //   isInputError,
  //   writeError,
  //   quantity
  // });

  return (
    <div className="mx-auto flex max-w-4xl flex-col justify-between gap-8 rounded-3xl bg-white p-6 shadow-2xl sm:flex-row sm:p-10">
      <Image
        className="w-full rounded-3xl shadow-xl sm:w-1/3"
        loading="lazy"
        src={imageUrl}
        height={300}
        width={500}
        alt="image"
      />
      <div className="w-full">
        <div className="ml-auto w-fit">
          <ConnectButton />
        </div>
        <div className="mt-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold sm:text-4xl">{title}</h3>
          <div
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success('Link copied!');
            }}
            className="cursor-pointer rounded-full border-2 border-[#E7D9E9] p-1"
          >
            <Share height={16} width={16} />
          </div>
        </div>
        <hr className="my-4 border border-dashed border-[#9E9EAD] border-opacity-30" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#11111b] sm:text-sm">
              Network
            </p>
            <p className="text-xs text-[#11111b] sm:text-sm">
              {chainName[chainId as keyof typeof chainName]}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#11111b] sm:text-sm">
              Price
            </p>
            <p className="text-xs text-[#11111b] sm:text-sm">
              {Number(price) > 0 ? price : 'Free'}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#11111b] sm:text-sm">
              Minting
            </p>
            <p className="text-xs text-[#11111b] sm:text-sm">
              {activeSale ? 'Now' : 'no'}
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#11111b] sm:text-sm">
              Minted
            </p>
            <p className="text-xs text-[#11111b] sm:text-sm">
              {totalMinted}/{maxSupply}
            </p>
          </div>
          {/* <div>
            <p className="text-xs font-semibold text-[#11111b] sm:text-sm">
              Price
            </p>
            <p className="text-xs text-[#11111b] sm:text-sm">Free</p>
          </div> */}
          {/* <div>
            <p className="text-xs font-semibold text-[#11111b] sm:text-sm">
              Royalty
            </p>
            <p className="text-xs text-[#11111b] sm:text-sm">10%</p>
          </div> */}
        </div>
        <hr className="my-4 border border-dashed border-[#9E9EAD] border-opacity-30" />

        <div className="mt-2 flex w-full items-center justify-between">
          <div className="flex w-full items-center gap-2">
            <label className="text-sm font-medium text-black">Quantity:</label>
            <input
              className={`w-16 rounded-md bg-slate-100 p-1 text-center outline-none ring-2 ${isInputError ? 'ring-red-500' : 'ring-blue-800'} focus:ring-${isInputError ? 'red' : 'blue'}-500`}
              onChange={handleQuantity}
              placeholder="1"
              type="text"
            />
          </div>
        </div>

        {/* TODO: Dropdown */}

        <div className="mt-2 w-full rounded-lg bg-[#EBE8FD] px-4 py-2 text-center sm:w-fit">
          {!isConnected ? (
            <ConnectButton />
          ) : !isSupportedChain ? (
            <Button
              onClick={() => switchChain({ chainId: chainId as number })}
              title="Switch Network"
            />
          ) : (
            <Button
              disabled={!isConnected || isSimulateError || !simulateData}
              onClick={mint721}
              title="Mint NFT"
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

        {isTxSuccess && (
          <div className="mt-2 text-sm text-green-500">
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
              View tx
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTCard;
