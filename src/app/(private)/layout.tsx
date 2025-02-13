import { AccountBalance } from "@/components/app/account-balance";
import { Sidebar } from "@/components/app/sidebar";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarTrigger />
      <AccountBalance />
      <ThemeToggle />
      <div className="pt-16">
        {children}
      </div>
    </SidebarProvider>
  )
}

