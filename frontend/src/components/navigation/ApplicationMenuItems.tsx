import {
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Calendar, Home, Mail, Search, Settings } from 'lucide-react';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '#',
    icon: Home,
  },
  {
    title: 'Inbox',
    url: '#',
    icon: Mail,
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
  {
    title: 'Panel Docente',
    url: '/teacher-dashboard',
    icon: Settings,
  },
];

export function ApplicationMenuItems() {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <TooltipProvider key={item.title}>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon aria-label={item.title} />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuAction aria-label="More actions" />
              </SidebarMenuItem>
            </TooltipTrigger>
            <TooltipContent>{item.title}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </SidebarMenu>
  );
}
