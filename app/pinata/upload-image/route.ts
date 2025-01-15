import { IPinataResponse } from "@/src/types";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    let image = formData.get("file") as FormDataEntryValue | Blob | null;

    if (!(image instanceof Blob)) {
      const imageData = image?.toString() || "";
      image = new Blob([imageData], { type: "application/octet-stream" });
    }

    if (!image) {
      throw new Error("Failed to pinata image.");
    }

    const arrayBuffer = await (image as Blob).arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const pinataJWT = process.env.PINATA_JWT;

    const pinataEndpoint = "https://api.pinata.cloud/pinning/pinFileToIPFS";

    const fileType = (image as Blob).type;
    const fileExtension = fileType.split("/")[1];
    const pinataFormData = new FormData();
    pinataFormData.append(
      "file",
      new File(
        [buffer],
        `${new Date().getTime().toString()}.${fileExtension}`,
        {
          type: fileType,
        },
      ),
    );

    const response = await fetch(pinataEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${pinataJWT}`,
      },
      body: pinataFormData,
    });

    const pinataResponse = (await response.json()) as IPinataResponse;

    if (!pinataResponse.IpfsHash) {
      throw new Error("Failed to pinata to Pinata");
    }

    return new Response(
      JSON.stringify({
        message: "Image successfully uploaded to Pinata",
        pinataResponse,
      }),
      { status: 200 },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "An error occurred", details: error }),
      { status: 500 },
    );
  }
}
