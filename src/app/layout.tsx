import { AccountBalance } from "@/components/app/account-balance";
import { Sidebar } from "@/components/app/sidebar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: '300',
})

export const metadata: Metadata = {
  title: "Tinho Finance"
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br" translate="no" suppressHydrationWarning>
      <body
        className={`${dmSans.className} min-w-screen min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <Sidebar />
            <SidebarTrigger />
            <AccountBalance />
            <ThemeToggle />
            <div className="w-screen min-h-screen pt-16">
              {children}
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
