import { handleMint } from "@/utils/handleMint";
import { Address, parseEther } from "viem";
import { erc721DropABI } from "@zoralabs/zora-721-contracts";
import {BigNumberish} from "ethers"
import { useSimulateContract, useWriteContract, useAccount, useWaitForTransactionReceipt, type BaseError,useConnectorClient } from "wagmi";
import { LENSPOST_ETH_ADDRESS, ZORA_REWARD_FEE, ZORA_REWARD_FEE_BIGINT } from "../../../constants";
//import { config } from "@/providers/RainbowProvider";
//import { config } from "@/utils/config";
export const MintButton = ({ contractType, contractAddress, quantity, signerAddress }: { contractType: string, contractAddress: `0x${string}`, quantity:any , signerAddress:`0x${string}`}) => {
  const { address } = useAccount();
  const {data: Connector} = useConnectorClient();
  const bigIntQuantity = BigInt(`${quantity}`);
  //const mintNo=BigInt(quantity);
  const comment=""
  const mintReferral=LENSPOST_ETH_ADDRESS;
  //const mintFee=BigInt(ZORA_REWARD_FEE);
  const mintFee=parseEther(ZORA_REWARD_FEE);
  const mintTotalFee=(mintFee*bigIntQuantity);
  const {
    data,
    error:prepareError,
    isError: isPrepareError,
  }=useSimulateContract({
    abi: erc721DropABI,
    address:contractAddress,
    functionName: 'mintWithRewards',
    args: [signerAddress, bigIntQuantity, comment, mintReferral],
    value:mintTotalFee,
    //@ts-ignore
    connector:Connector
  })
  console.log({
    simulateData: data,
    simulateIsError: isPrepareError,
    simulateError: prepareError
  })
  const {
    data:hash,
    error,
    isPending,
    writeContract
  } = useWriteContract({
    //@ts-ignore
    config: data?.request
  })

  console.log({
    writeData: hash,
    writeError: error
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    })
    //console.log("Contract Type::", contractType);
    //console.log("Contract Address::", contractAddress);
    //console.log("Contract Address::", quantity);
    return (
        <div className="bg-[#EBE8FD] px-4 py-2 rounded-lg mt-2 cursor-pointer w-full sm:w-fit text-center">
          
            <button className="text-sm bg-gradient-to-r from-[#4126E8] to-[#7B5CF8] 
            text-transparent bg-clip-text inline-block font-semibold"
            //@ts-ignore 
            onClick={writeContract}>
                Mint NFT
            </button>
            {hash && <div>Transaction Hash: {hash}</div>}
            {isConfirming && <div>Waiting for confirmation...</div>} 
            {isConfirmed && <div>Transaction confirmed.</div>} 
        </div>
    );
}
