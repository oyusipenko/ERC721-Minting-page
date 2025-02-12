"use client";

import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider, SidebarProvider, UserProvider } from "@/src/context";
import { wagmiConfig } from "@/src/configs";
import React from "react";

const queryClient = new QueryClient();

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <UserProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </UserProvider>
        </ModalProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
