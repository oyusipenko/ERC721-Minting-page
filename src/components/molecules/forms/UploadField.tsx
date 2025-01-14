"use client";
import { useEffect, useState } from "react";
import { FormikProps } from "formik";

interface UploadFieldProps<T> {
  name: string;
  formik: FormikProps<T>;
  label?: string;
  acceptedFormats?: string;
}

export default function UploadField<T>({
  name,
  formik,
  label = "⬆ Upload Image",
  acceptedFormats = "image/*",
}: UploadFieldProps<T>) {
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    const file = formik.values[name as keyof T];
    if (file instanceof File) {
      const fileUrl = URL.createObjectURL(file);
      setPreview(fileUrl);
    } else {
      setPreview("");
    }
  }, [formik.values, name]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue(name, file);
    }
  };

  const handleRemoveFile = () => {
    formik.setFieldValue(name, null);
  };

  return (
    <div>
      {preview ? (
        <div className="relative mt-4 flex justify-center items-center">
          <img src={preview} alt="Preview" className="h-32 object-contain" />
          <button
            type="button"
            onClick={handleRemoveFile}
            className="absolute top-1 right-1
                       bg-red-500 text-white w-6 h-6
                       flex items-center justify-center
                       rounded-full text-sm font-bold
                       hover:bg-red-600 transition-colors"
          >
            ✕
          </button>
        </div>
      ) : (
        <label
          htmlFor={`${name}-upload`}
          className="flex flex-col items-center justify-center
                     border-2 border-blue-500 rounded-lg
                     py-10 px-4 cursor-pointer
                     hover:border-blue-600 transition-colors
                     text-center"
        >
          <span className="text-gray-300 text-sm mb-1">{label}</span>
          <span className="text-gray-500 text-xs">
            {acceptedFormats === "image/*"
              ? "format supported"
              : acceptedFormats}
          </span>
          <input
            id={`${name}-upload`}
            name={name}
            type="file"
            accept={acceptedFormats}
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
}
