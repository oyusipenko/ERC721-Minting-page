"use client";
import { FormikProps } from "formik";

interface TextFieldProps<T> {
  name: string;
  label?: string;
  placeholder?: string;
  formik: FormikProps<T>;
  type?: string;
  isTextarea?: boolean;
  rows?: number;
  className?: string;
}

export default function TextField<T>({
  name,
  label,
  placeholder = "",
  formik,
  type = "text",
  isTextarea = false,
  rows = 4,
  className = "",
}: TextFieldProps<T>) {
  const error =
    formik.touched[name as keyof T] && formik.errors[name as keyof T];

  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-gray-400 mb-1">
          {label}
        </label>
      )}

      {!isTextarea ? (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={
            (formik.values[name as keyof T] as
              | string
              | number
              | readonly string[]
              | undefined) || ""
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-3 border-2 border-gray-700 bg-gray-800
            rounded-md text-white focus:outline-none focus:border-blue-500 ${className}`}
        />
      ) : (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          rows={rows}
          value={
            (formik.values[name as keyof T] as
              | string
              | number
              | readonly string[]
              | undefined) || ""
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-3 border-2 border-gray-700 bg-gray-800
            rounded-md text-white focus:outline-none focus:border-blue-500 ${className}`}
        />
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error as string}</p>}
    </div>
  );
}
