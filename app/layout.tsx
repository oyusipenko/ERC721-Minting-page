import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";
import { BaseLayout } from "@/src/components";
import  {Providers}  from "./providers";

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
      <Providers>
        <BaseLayout>{children}</BaseLayout>
      </Providers>
      </body>
      </html>
  );
}