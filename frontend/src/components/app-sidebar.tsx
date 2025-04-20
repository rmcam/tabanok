import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  ChevronDown,
  Monitor,
  MoreHorizontal,
  Settings,
  Shield,
  SlidersHorizontal,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';
import { ApplicationMenuItems } from './ApplicationMenuItems';
import { Button } from './ui/button';

export function AppSidebar() {

  return (
    <Sidebar>
      <SidebarHeader>
        Sidebar Header
      </SidebarHeader>
      <SidebarContent>
        <Input type="text" placeholder="Buscar..." />
        <Button onClick={() => toast('¡Éxito! Notificación mostrada correctamente.')}>
          Add toast
        </Button>
        <Toaster />
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                Application
                <ChevronDown className="ml-2 h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <ApplicationMenuItems />
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <Collapsible className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                Administración
                <ChevronDown className="ml-2 h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <a href="#">
                              <Settings aria-label="Settings" />
                              <span>Settings</span>
                            </a>
                          </SidebarMenuButton>
                          <SidebarMenuAction aria-label="More actions">
                            <MoreHorizontal />
                          </SidebarMenuAction>
                        </SidebarMenuItem>
                      </TooltipTrigger>
                      <TooltipContent>Settings</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <a href="#">
                              <Users aria-label="Users" />
                              <span>Users</span>
                            </a>
                          </SidebarMenuButton>
                          <SidebarMenuAction aria-label="More actions">
                            <MoreHorizontal />
                          </SidebarMenuAction>
                        </SidebarMenuItem>
                      </TooltipTrigger>
                      <TooltipContent>Users</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <a href="#">
                              <Shield aria-label="Roles" />
                              <span>Roles</span>
                            </a>
                          </SidebarMenuButton>
                          <SidebarMenuAction aria-label="More actions">
                            <MoreHorizontal />
                          </SidebarMenuAction>
                        </SidebarMenuItem>
                      </TooltipTrigger>
                      <TooltipContent>Roles</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <Collapsible className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                Configuración
                <ChevronDown className="ml-2 h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <a href="#">
                              <SlidersHorizontal aria-label="General" />
                              <span>General</span>
                            </a>
                          </SidebarMenuButton>
                          <SidebarMenuAction aria-label="More actions">
                            <MoreHorizontal />
                          </SidebarMenuAction>
                        </SidebarMenuItem>
                      </TooltipTrigger>
                      <TooltipContent>General</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <a href="#">
                              <Monitor aria-label="Appearance" />
                              <span>Appearance</span>
                            </a>
                          </SidebarMenuButton>
                          <SidebarMenuAction aria-label="More actions">
                            <MoreHorizontal />
                          </SidebarMenuAction>
                        </SidebarMenuItem>
                      </TooltipTrigger>
                      <TooltipContent>Appearance</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
