"use client";

import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BaseLayout } from "@/src/components";
import { SidebarProvider } from "@/src/context";
import { wagmiConfig } from "@/src/configs";

const queryClient = new QueryClient();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <SidebarProvider>
              <BaseLayout>{children}</BaseLayout>
            </SidebarProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
