import { Home, LucideIcon, Settings } from "lucide-react"

interface ISidebarItems {
  title: string
  url: string
  icon: LucideIcon
}

export const sidebarItems: ISidebarItems[] = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Configurações",
    url: "/configurations",
    icon: Settings,
  },
]
