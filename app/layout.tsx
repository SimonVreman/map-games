import type { Metadata } from "next";
import { Geist_Mono, Figtree } from "next/font/google";
import "./globals.css";
import { AppStoreProvider } from "@/lib/store/provider";
import { Toaster } from "sonner";

const figtree = Figtree({
  variable: "--font-figtree",
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
        className={`${figtree.variable} ${geistMono.variable} antialiased min-w-dvw min-h-dvh font-sans`}
      >
        <AppStoreProvider>
          <main className="h-dvh w-dvw">{children}</main>
          <Toaster richColors position="bottom-center" theme="system" />
        </AppStoreProvider>
      </body>
    </html>
  );
}
