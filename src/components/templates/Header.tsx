"use client";

import Image from "next/image";
import { useSidebar } from "@/src/context";

export default function Header() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="w-full text-white p-4 px-20">
      <nav className="container mx-auto flex justify-between">
        <div className="text-lg font-semibold">
          <Image
            src={"/nft-sea.png"}
            alt="NFT Sea logo"
            width="199"
            height="80"
          />
        </div>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="hover:underline">
              Explore Marketplace
            </a>
          </li>
          <li>
            <Image
              src={"/bx_wallet-alt.svg"}
              alt="Wallet icon"
              width="28"
              height="28"
              onClick={toggleSidebar}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}
