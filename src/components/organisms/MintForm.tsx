"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useFormik } from "formik";
import { mintNftFeature } from "@/src/features";
import { UploadField, TextField } from "@/src/components";
import { validationSchema } from "@/src/schemas";

export interface MintFormValues {
  title: string;
  description: string;
  imageFile: File | null;
}

export default function MintForm() {
  const { address } = useAccount();

  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
    txHash?: string;
  } | null>(null);

  const formik = useFormik<MintFormValues>({
    initialValues: {
      title: "",
      description: "",
      imageFile: null as File | null,
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!address) {
        setSubmitResult({
          success: false,
          message: "Please connect your wallet first.",
        });
        return;
      }

      setSubmitResult(null);

      const result = await mintNftFeature({
        title: values.title,
        description: values.description,
        imageFile: values.imageFile!,
        receiver: address,
      });

      if (result.success) {
        setSubmitResult({
          success: true,
          message: "Minted successfully!",
          txHash: result.txHash,
        });
      } else {
        setSubmitResult({
          success: false,
          message: result.error || "Minting failed",
        });
      }
    },
  });

  const { handleSubmit, values } = formik;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mt-8 w-full max-w-md space-y-4"
        noValidate
      >
        <UploadField<MintFormValues> name="imageFile" formik={formik} />
        <TextField<MintFormValues>
          name="title"
          label="NFT Title"
          placeholder="Enter NFT Title"
          formik={formik}
        />
        <TextField<MintFormValues>
          name="description"
          label="Description"
          placeholder="Write description..."
          formik={formik}
          isTextarea
        />
        <div className="flex justify-between space-x-2">
          <button
            type="submit"
            className="flex-1 p-3
                         bg-gradient-to-r from-blue-500 to-pink-500
                         text-white rounded-md
                         hover:opacity-90 transition-opacity"
          >
            Mint
          </button>
        </div>
      </form>

      {submitResult && (
        <div
          className={`p-2 rounded ${
            submitResult.success ? "bg-green-800" : "bg-red-800"
          }`}
        >
          {submitResult.message}
          {submitResult.txHash && (
            <div className="mt-1">
              Tx hash:{" "}
              <a
                href={`https://sepolia.etherscan.io/tx/${submitResult.txHash}`}
                className="underline text-blue-300"
                target="_blank"
                rel="noreferrer"
              >
                {submitResult.txHash.slice(0, 10)}...
              </a>
            </div>
          )}
        </div>
      )}
    </>
  );
}
