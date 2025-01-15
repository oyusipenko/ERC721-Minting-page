"use client";

import { Header, Footer, SideBar } from "@/src";
import { useSidebar } from "@/src/context";
import { ModalRoot } from "@/src/components";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen } = useSidebar();

  return (
    <>
      <div className="relative flex">
        <div className="flex flex-col flex-grow min-h-screen">
          <Header />
          <main className="flex-grow px-20">{children}</main>
          <Footer />
        </div>
        <SideBar isOpen={isOpen} />
      </div>
      <ModalRoot />
    </>
  );
}
