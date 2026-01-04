import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/provider/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import Nav from "@/components/Headers/Nav";
import { Toaster } from "@/components/ui/sonner";
import MergeGuestCartOnLogin from "@/components/Cart/MergeGuestCartOnLogin";
import Footer from "@/components/Footer/Footer";
import { url } from "inspector";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Menu-System",
  description: "Digital menu system to add your categories, items, and online ordering.",

  icons: {
     icon:"/favicon.ico",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Nav />
            <main className="flex-1">
              <MergeGuestCartOnLogin />
              {children}
            </main>
            <Toaster />
            <Footer />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
