import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import QueryClientProviders from "@/providers/query-client-provider";
import SheetsProvider from "@/providers/sheets-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeSnipShare",
  description: "Your code snippet sharing web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <QueryClientProviders>
              {children}
              <Toaster />
              <SheetsProvider />
            </QueryClientProviders>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
