import { IPinataResponse } from "@/src/types";

export async function uploadFileToPinata(file: File): Promise<IPinataResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/pinata/upload-image", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  return data.pinataResponse;
}

export async function uploadJsonToPinata(
  jsonData: object,
): Promise<IPinataResponse> {
  debugger;
  const res = await fetch("/pinata/upload-json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  });
  debugger;
  const data = await res.json();
  debugger;
  return data.pinataResponse;
}
