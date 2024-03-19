import {erc721DropABI} from "@zoralabs/zora-721-contracts" 
import { LENSPOST_ETH_ADDRESS, ZORA_REWARD_FEE } from "../../constants";
import { useSimulateContract, useWriteContract } from "wagmi";
import { Address, parseEther } from "viem";
const mintFee = parseEther(ZORA_REWARD_FEE); // 0.000777 ETH
//const totalMintFee = (mintFee * quantity).toString();
const mintReferral = LENSPOST_ETH_ADDRESS;

export function handleMint({signerAddress}:{signerAddress:Address}){
  const userAddress=signerAddress;
  const quantity=BigInt(1);
  const comment=""
  const mintReferral=LENSPOST_ETH_ADDRESS;
  const {data}=useSimulateContract({
    address:'0xeC5660E8912DC26FC0e5eC700bf05b9f326D6288',
    abi: erc721DropABI,
    functionName: 'mintWithRewards',
    args: [userAddress, quantity, comment, mintReferral]
  })
  const {writeContract}=useWriteContract()

  // args: [recipient, quantity, comment, mintReferral],
  
  // const result=useSimulateContract({
  //   abi:erc721DropABI,
  //   address: '0xeC5660E8912DC26FC0e5eC700bf05b9f326D6288',
  //   functionName: 'mintWithRewards'
  // })

}

// const handleMintSettings = () => {
//   let quantity=""
//   let recipient=""
//   let comment=""
//   let mintReferral=""
//   const arr = [
//     recipient,
//     quantity,
//     comment,
//     mintReferral
//   ];
// }


// const {
//   error: prepareError,
//   isError: isPrepareError,
// } = useSimulateContract({
//   abi: erc721DropABI,
//   address: userAddress,
//   functionName: "mintWithRewards",
//   args: handleMintSettings().args,
// });
// 1. useSimulateContract
// 2. useWriteContract



// abi: erc721DropABI,
// functionName: "mintWithRewards",
// args: [recipient, quantity, comment, mintReferral],

