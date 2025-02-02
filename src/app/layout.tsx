import { Sidebar } from "@/components/sidebar/sidebar";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const robotoCondensed = Jost({
  subsets: ["latin"],
  weight: ['500', '600']
})

export const metadata: Metadata = {
  title: "MyDevotional",
  description: "Home",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br" translate="no">
      <body
        className={`min-w-screen min-h-screen flex flex-row items-start justify-start bg-primaryColor ${robotoCondensed.className} antialiased`}
      >
        <Sidebar />
        <div className="py-12 px-12 sm:px-24">
          {children}
        </div>
      </body>
    </html>
  )
}
