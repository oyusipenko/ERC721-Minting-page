"use client";

import { MintForm } from "@/src/components";

export default function Home() {
  return (
    <div className="flex flex-col items-center p-10 ">
      <div className="flex flex-col items-center justify-center border-2 rounded-lg p-20">
        <h1 className="prose-2xl prose-slate">Mint New NFT</h1>
        <h5 className="prose-lg prose-slate">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sem
          tortor quis amet scelerisque vivamus egestas.{" "}
        </h5>
      </div>
      <MintForm />
    </div>
  );
}
