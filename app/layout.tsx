import type { Metadata } from "next";
import { Geist, Geist_Mono, Baloo_Tamma_2 } from "next/font/google";
import "./globals.css";
import { AppStoreProvider } from "@/lib/store/provider";
import { Toaster } from "sonner";

const balooTamma = Baloo_Tamma_2({
  variable: "--font-baloo-tamma",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Map Games",
  description: "Map Quizzes by Simon Vreman",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${balooTamma.variable} ${geistMono.variable} antialiased min-w-dvw min-h-dvh`}
      >
        <AppStoreProvider>
          <main className="h-dvh w-dvw">{children}</main>
          <Toaster richColors position="bottom-center" />
        </AppStoreProvider>
      </body>
    </html>
  );
}
