"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full px-20 text-white p-4 mt-auto">
      <div className="container mx-auto flex justify-between">
        <div className="text-lg font-semibold">
          <Image
            src={"/nft-sea.png"}
            alt="NFT Sea logo"
            width="199"
            height="80"
          />
        </div>
        <div>NFT Sea 2022 © All right reserved </div>
        <div className="flex space-x-4">
          <a href="/" className="hover:underline">
            Explore Marketplace
          </a>
        </div>
      </div>
    </footer>
  );
}
