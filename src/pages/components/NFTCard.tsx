import React, {useEffect} from "react";
import ArrowDown from "@/Icons/ArrowDown";
import Share from "@/Icons/Share";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { usePathname } from "next/navigation";
import CustomConnectButton from "./CustomConnectButton";

export default function NFTCard() {
  const pathname = usePathname();
  const [network, setNetwork] = useState("ETH");
  const [imageUrl, setImageUrl] = useState("");

  let slug = "";
  if (pathname) {
    slug = pathname.split("=")[1]; // Extract slug from pathname
  }
  //console.log("Slug::",slug);

  useEffect(() => {
    if (slug) {
      console.log("Slug:", slug)
      fetch(`http://localhost:3001/util/get-slug-details?slug=${slug}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Data:", data); // Log the fetched data to understand its structure
          setImageUrl(data.image);
          if (data.chainId === 1) {
            setNetwork("ETH");
          } else if (data.chainId === 999999) {
            setNetwork("ZORA");
          } else if (data.chainId === 8453) {
            setNetwork("BASE");
          }
        })
        .catch((error) => console.error("Error fetching image:", error));
    }
  }, [slug]);
  


  const Networks = [
    {
      name: "ETH",
      onclick: () => {
        setNetwork("ETH");
      },
    },
    {
      name: "ZORA",
      onclick: () => {
        setNetwork("ZORA");
      },
    },
    {
      name: "BASE",
      onclick: () => {
        setNetwork("BASE");
      },
    },
  ];

  return (
    <div className="p-6 sm:p-10 bg-white shadow-2xl flex flex-col sm:flex-row justify-between rounded-3xl max-w-4xl mx-auto gap-8">
      <img
        src={imageUrl}
        alt=""
        className="rounded-3xl shadow-xl w-full sm:w-1/3"
      />
      <div className="w-full">
        <div className="w-fit ml-auto">
          <CustomConnectButton isEVM={false} />
        </div>
        <div className="flex items-center justify-between mt-6">
          <h3 className="text-xl sm:text-4xl font-semibold">LensPost 2024</h3>
          <div
            className="border-2 border-[#E7D9E9] p-1 rounded-full cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(
                `https://mint-ui-lenspost.vercel.app${pathname}`
              );
            }}
          >
            <Share width={16} height={16} />
          </div>
        </div>
        <p className="text-[#11111b] mt-2 text-xs sm:text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua ut labore.
        </p>
        <div className="border border-dashed border-[#9E9EAD] my-4 border-opacity-30"></div>
        <div>
          <p className="text-[#11111b] text-xs sm:text-sm">Claimable Period</p>
          <p className="text-[#11111b] text-xs sm:text-sm">
            Feb 16, 2024 00:00 (UTC) - Feb 04, 2024 23:59 (UTC)
          </p>
        </div>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <div
              className="p-2 rounded-lg border-2 border-[#9291A3] text-[#5E5C8D] font-semibold text-xs my-2 flex items-center max-w-96 justify-between"
              aria-label="Customise options"
            >
              <p>Select Network</p>
              <div className="flex items-center gap-2">
                <p>{network}</p>
                <ArrowDown color="#5E5C8D" width={16} height={16} />
              </div>
            </div>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-96 bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
              sideOffset={5}
            >
              {Networks.map((network, index) => (
                <DropdownMenu.Item
                  className="cursor-pointer hover:bg-gray-100 p-2 leading-none text-violet11 rounded-[3px] flex items-center select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                  key={index}
                  onClick={network.onclick}
                >
                  {network.name}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <div
              className="p-2 rounded-lg border-2 border-[#9291A3] text-[#5E5C8D] font-semibold text-xs my-2 flex items-center max-w-96 justify-between"
              aria-label="Customise options"
            >
              <p>Select Network</p>
              <div className="flex items-center gap-2">
                <p>{network}</p>
                <ArrowDown color="#5E5C8D" width={16} height={16} />
              </div>
            </div>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-96 bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
              sideOffset={5}
            >
              {Networks.map((network, index) => (
                <DropdownMenu.Item
                  className="cursor-pointer hover:bg-gray-100 p-2 leading-none text-violet11 rounded-[3px] flex items-center select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                  key={index}
                  onClick={network.onclick}
                >
                  {network.name}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
        <div className="bg-[#EBE8FD] px-4 py-2 rounded-lg mt-2 cursor-pointer w-full sm:w-fit text-center">
          <p className="text-sm bg-gradient-to-r from-[#4126E8] to-[#7B5CF8] text-transparent bg-clip-text inline-block font-semibold">
            Mint NFT
          </p>
        </div>
      </div>
    </div>
  );
}
