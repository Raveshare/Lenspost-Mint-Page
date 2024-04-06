'use client';

import { useAccountModal } from '@rainbow-me/rainbowkit';
import { useDisconnect, useAccount } from 'wagmi';
import { formatAddress } from '@/utils';

const CustomConnectButton = () => {
  const { address: EVMAddress, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { openAccountModal } = useAccountModal();

  return (
    <>
      {!isConnected ? (
        <button
          className="ml-auto flex w-fit items-center gap-1 rounded-lg bg-[#F0F0F8] px-3 py-2"
          onClick={openAccountModal && openAccountModal}
        >
          Connect Wallet
        </button>
      ) : (
        <button
          className="ml-auto flex w-fit items-center gap-1 rounded-lg bg-[#F0F0F8] px-3 py-2"
          onClick={() => disconnect()}
        >
          <p className="text-xs font-medium md:text-sm">
            {formatAddress(EVMAddress as any)}
          </p>
        </button>
      )}
    </>
  );
};

export default CustomConnectButton;
