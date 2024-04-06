'use client';

import { useConnectModal, useAccountModal } from '@rainbow-me/rainbowkit';
import { formatAddress } from '@/utils';
import { useAccount } from 'wagmi';
import { Button } from '@/ui';

const ConnectButton = () => {
  const { address: EVMAddress, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();

  return isConnected ? (
    <Button
      title={formatAddress(EVMAddress as `0x${string}`)}
      onClick={openAccountModal}
    />
  ) : (
    <Button onClick={openConnectModal} title="Connect wallet" />
  );
};

export default ConnectButton;
