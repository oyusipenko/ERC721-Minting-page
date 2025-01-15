"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useModalContext } from "@/src/context";
import Image from "next/image";

export default function ConfirmModal() {
  const { modalProps, closeModal } = useModalContext();
  const isOpen = true;
  const [filePreview, setFilePreview] = useState<string>("");

  useEffect(() => {
    if (modalProps.nftImage instanceof File) {
      const preview = URL.createObjectURL(modalProps.nftImage);
      setFilePreview(preview);

      return () => URL.revokeObjectURL(preview);
    } else {
      setFilePreview("");
    }
  }, [modalProps.nftImage]);

  const handleConfirm = useCallback(() => {
    if (modalProps.onConfirm) {
      modalProps.onConfirm();
    }
  }, [modalProps]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-black rounded p-6 w-[400px]">
        <div className="mt-4">
          <Image
            width={100}
            height={100}
            src={filePreview}
            alt="Preview"
            className="w-full h-40 object-cover rounded"
          />
        </div>

        <h2 className="text-xl font-bold mb-4">
          {modalProps.nftName as string}
        </h2>
        <p>{modalProps.nftDescription as string}</p>
        <div className="mt-6 flex gap-2 justify-end">
          <button className="px-4 py-2 border" onClick={closeModal}>
            Back
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
