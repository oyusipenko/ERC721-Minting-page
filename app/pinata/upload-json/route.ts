import { IPinataResponse } from "@/src/types";

export async function POST(request: Request) {
  try {
    const pinataEndpoint = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
    const jsonData = await request.json();

    const pinataJWT = process.env.PINATA_JWT;
    const response = await fetch(pinataEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${pinataJWT}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    const pinataResponse = (await response.json()) as IPinataResponse;

    if (!pinataResponse.IpfsHash) {
      throw new Error("Failed to pin JSON to Pinata");
    }

    return new Response(
      JSON.stringify({
        message: "JSON успешно загружен в Pinata",
        pinataResponse,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Server error", details: error }),
      { status: 500 },
    );
  }
}
