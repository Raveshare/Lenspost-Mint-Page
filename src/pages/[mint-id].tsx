import Share from "@/Icons/Share";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import CustomConnectButton from "./components/CustomConnectButton";

export default function Mint() {
  return (
    <div className="p-4 sm:p-10 bg-[#B7DAEE]">
      <div className="p-6 sm:p-10 bg-white shadow-2xl flex flex-col sm:flex-row justify-between rounded-3xl max-w-4xl mx-auto gap-8">
        <img
          src="https://lh3.googleusercontent.com/yfRQyA1UzkKyB_vTrLkobf6xGnuNcKCRgezt7mcsxlpJU-7erg6kCrII_HgzKLchuBV0ODba_EH_BGvmu-TEijrigeXCz0eCqMyPf-k9hBCnx64QgEfHghRFZmH0vgkAHoXo3NPB8C3OaYCcc5xnNTs"
          alt=""
          className="rounded-3xl shadow-xl w-full sm:w-1/3"
        />
        <div className="w-full">
          <div className="w-fit ml-auto">
            <CustomConnectButton isEVM/>
          </div>
          <div className="flex items-center justify-between mt-6">
            <h3 className="text-xl sm:text-4xl font-semibold">LensPost 2024</h3>
            <div className="border-2 border-[#E7D9E9] p-1 rounded-full">
              <Share width={16} height={16} />
            </div>
          </div>
          <p className="text-[#E1DFF5] mt-2 text-xs sm:text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua ut
            labore.
          </p>
          <div className="border border-dashed border-[#9E9EAD] my-4 border-opacity-30"></div>
          <div>
            <p className="text-[#E1DFF5] text-xs sm:text-sm">Claimable Period</p>
            <p className="text-[#E1DFF5] text-xs sm:text-sm">
              Feb 16, 2024 00:00 (UTC) - Feb 04, 2024 23:59 (UTC)
            </p>
          </div>
          <div className="bg-[#EBE8FD] px-4 py-2 rounded-lg mt-2 cursor-pointer w-full sm:w-fit text-center">
            <p className="text-sm bg-gradient-to-r from-[#4126E8] to-[#7B5CF8] text-transparent bg-clip-text inline-block font-semibold">
              Mint NFT
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
