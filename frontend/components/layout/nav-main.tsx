"use client"

import { type LucideIcon } from "lucide-react"

import {
  Collapsible,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useState } from "react"
import ProtectedPage from "@/pages/protected"
import PracticePage from "@/app/dashboard/practice/page"
import ChallengesPage from "@/app/dashboard/challenges/page"
import ComunityPage from "@/app/dashboard/comunity/page"
import ResoursesPage from "@/app/dashboard/resources/page"
import SettingsPage from "@/app/dashboard/settings/page"

export function NavMain({
  
  items,
}: {
  
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const [activeView, setActiveView] = useState("settings") 
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={()=> setActiveView(item.title.toLowerCase())} asChild tooltip={item.title}  className={ cn("flex items-center justify-between w-full px-4 py-2 text-sm font-bold text-gray-500 rounded-lg hover:text-gray-900  hover:bg-blue-100", activeView === item.title.toLowerCase() ? "bg-blue-100 text-gray-900" : "")}>
                <Link href={item.url} >
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
           
            </SidebarMenuItem>
          </Collapsible>
        ))}
          {activeView === "dashboard" && <ProtectedPage />}
          {activeView === "learn" && <SettingsPage />}
          {activeView === "practice" && <PracticePage />}
          {activeView === "challenges" && <ChallengesPage />}
          {activeView === "comunity" && <ComunityPage />}
          {activeView === "resources" && <ResoursesPage />}
          {activeView === "progress" && <SettingsPage />}
          {activeView === "settings" && <SettingsPage />}
          {activeView === "settings" && <SettingsPage />}
      </SidebarMenu>
    </SidebarGroup>
  )
}
