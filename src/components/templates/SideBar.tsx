"use client";

import { useSidebar } from "@/src/context/SidebarContext";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <div
      className={`
        fixed top-0 right-0 w-128 h-full bg-gray-800 text-white 
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-end p-4">
          <button
            onClick={toggleSidebar}
            className="bg-red-500 px-2 py-1 rounded"
          >
            Close
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold">Sidebar</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    </div>
  );
}
