import formatAddress from "@/utils/formatAddress";
import { ConnectButton, useAccountModal } from "@rainbow-me/rainbowkit";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function CustomConnectButton({
  isEVM = false,
}: {
  isEVM?: boolean;
}) {
  const { setVisible } = useWalletModal();
  const [address, setAddress] = useState<undefined | string>();

  const { isConnected, address: EVMAddress } = useAccount();
  const { connected, disconnect, publicKey } = useWallet();
  const { openAccountModal } = useAccountModal();

  useEffect(() => {
    if (isConnected || connected) {
      isEVM ? setAddress(EVMAddress) : setAddress(publicKey?.toString());
    } else {
      setAddress(undefined)
    }
  }, [isConnected, connected]);

  return (
    <>
      {address ? (
        <>
          {isEVM ? (
            <button
              className="bg-[#F0F0F8] flex items-center gap-1 px-3 py-2 rounded-lg w-fit ml-auto"
              onClick={openAccountModal}
            >
              <img
                src="https://solflare.com/assets/logo.26659b6d..svg"
                alt=""
                className="w-5 h-5"
              />
              <p className="font-medium text-xs md:text-sm">
                {formatAddress(address)}
              </p>
            </button>
          ) : (
            <button
              className="bg-[#F0F0F8] flex items-center gap-1 px-3 py-2 rounded-lg w-fit ml-auto"
              onClick={disconnect}
            >
              <img
                src="https://solflare.com/assets/logo.26659b6d..svg"
                alt=""
                className="w-5 h-5"
              />
              <p className="font-medium text-xs md:text-sm">
                {formatAddress(address)}
              </p>
            </button>
          )}
        </>
      ) : (
        <>
          {isEVM ? (
            <ConnectButton />
          ) : (
            <button
              className="block w-full px-4 py-2.5 text-sm text-center text-white font-bold bg-blue-500 hover:bg-blue-600 rounded-lg"
              onClick={() => {
                setVisible(true);
              }}
            >
              Connect wallet
            </button>
          )}
        </>
      )}
    </>
  );
}
