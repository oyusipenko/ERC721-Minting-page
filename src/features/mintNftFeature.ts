import {
  uploadFileToPinata,
  uploadJsonToPinata,
  mintNft,
} from "@/src/services/";

const IPFS_GATEWAY =
  process.env.NEXT_PUBLIC_IPFS_NODE || "https://ipfs.io/ipfs";

interface MintInput {
  title: string;
  description: string;
  imageFile: File;
  receiver: string;
}

interface MintResult {
  success: boolean;
  txHash?: string;
  error?: string;
}

export async function mintNftFeature(input: MintInput): Promise<MintResult> {
  try {
    const pinataResponse = await uploadFileToPinata(input.imageFile);

    const metadata = {
      name: input.title,
      description: input.description,
      image: `${IPFS_GATEWAY}/${pinataResponse.IpfsHash}`,
    };

    const pinataUploadJsonResponse = await uploadJsonToPinata(metadata);

    const tokenUri = `${pinataUploadJsonResponse.IpfsHash}`;

    const txHash = await mintNft(input.receiver as `0x${string}`, tokenUri);

    return {
      success: true,
      txHash,
    };
  } catch (err) {
    console.error("mintNftFeature error", err);
    return {
      success: false,
      error: "Unknown error",
    };
  }
}
