import { Abi, type Address } from "viem";
import { writeContract } from "@wagmi/core";
import musharkaAbi from "@/src/abi/Musharka721.json" assert { type: "json" };
import { wagmiConfig } from "@/src/configs";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";
const CHAIN_ID = (Number(process.env.NEXT_PUBLIC_CHAIN_ID) ||
  11155111) as 11155111;

export async function mintNft(to: Address, tokenUri: string) {
  const abi: Abi = musharkaAbi as unknown as Abi;
  debugger;
  const hash = await writeContract(wagmiConfig, {
    address: CONTRACT_ADDRESS as Address,
    abi: abi,
    functionName: "mint",
    args: [to, tokenUri],
    chainId: CHAIN_ID,
  });
  return hash;
}
