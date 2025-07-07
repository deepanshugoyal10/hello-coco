import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hello Coco",
  description: "Hello Coco Brewing Coffee With Love",
};

import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "../components/ReduxProvider";
import VideoOverlay from "../components/VideoLandingPage";
import { fetchProducts } from "@/helpers/api";
import ProductsInitializer from "@/components/ProductsInitializer";
import { ToastProvider } from "@/components/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ToastProvider>
            <ProductsInitializer />
            <VideoOverlay>{children}</VideoOverlay>
          </ToastProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
