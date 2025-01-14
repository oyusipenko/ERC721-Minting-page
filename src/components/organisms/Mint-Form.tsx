"use client";

export default function MintForm() {
  return (
    <form className="mt-8 w-full max-w-md space-y-4">
      <label
        htmlFor="image-upload"
        className="flex flex-col items-center justify-center
                       border-2 border-blue-500 rounded-lg
                       py-10 px-4 cursor-pointer
                       hover:border-blue-600 transition-colors
                       text-center"
      >
        <span className="text-gray-300 text-sm mb-1">⬆ Upload Image</span>
        <span className="text-gray-500 text-xs">format supported</span>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
        />
      </label>

      <input
        type="text"
        placeholder="NFT Title"
        className="w-full p-3
                       border-2 border-gray-700 bg-gray-800
                       rounded-md text-white
                       focus:outline-none focus:border-blue-500"
      />

      <textarea
        placeholder="Description"
        rows={4}
        className="w-full p-3
                       border-2 border-gray-700 bg-gray-800
                       rounded-md text-white
                       focus:outline-none focus:border-blue-500"
      />

      <div className="flex justify-between space-x-2">
        <button
          type="button"
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
