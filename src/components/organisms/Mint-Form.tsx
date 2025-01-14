"use client";

import { useFormik } from "formik";
import { validationSchema } from "@/src/schemas";
import { UploadField, TextField } from "@/src/components";

export interface MintFormValues {
  title: string;
  description: string;
  image: File | null;
}

export default function MintForm() {
  const formik = useFormik<MintFormValues>({
    initialValues: {
      title: "",
      description: "",
      image: null as File | null,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Formik Values:", values);
    },
  });

  const { handleSubmit, values } = formik;

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 w-full max-w-md space-y-4"
      noValidate
    >
      <UploadField<MintFormValues> name="image" formik={formik} />
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
          type="button"
          onClick={() => {
            console.log("Mint without listing clicked", values);
          }}
          className="flex-1 p-3
                         bg-gray-700 text-white
                         rounded-md hover:bg-gray-600
                         transition-colors"
        >
          Mint without listing
        </button>
        <button
          type="submit"
          className="flex-1 p-3
                         bg-gradient-to-r from-blue-500 to-pink-500
                         text-white rounded-md
                         hover:opacity-90 transition-opacity"
        >
          Mint and list immediately
        </button>
      </div>
    </form>
  );
}
