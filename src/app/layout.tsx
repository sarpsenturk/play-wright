import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const inter = Inter({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "PR Test",
  description: "PR Yazılım Test Uygulaması",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.className} antialiased`}>
        <SidebarProvider>
          <AppSidebar />
          <div className="flex flex-col w-full">
            <header className="px-4 py-2">
              <SidebarTrigger>
                Toggle Sidebar
              </SidebarTrigger>
            </header>
            <main className="grow p-4">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
