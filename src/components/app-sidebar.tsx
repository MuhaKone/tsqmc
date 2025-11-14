'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuAction,
} from '@/components/ui/sidebar';
import { AppLogo } from './app-logo';
import {
  LayoutDashboard,
  AlertTriangle,
  Calendar,
  BarChart,
  Search,
  Plus,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { allEquipment } from '@/lib/data';
import { StatusBadge } from './status-badge';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import React from 'react';
import { Button } from './ui/button';

const statusDot: Record<string, string> = {
  Healthy: 'bg-green-500',
  Warning: 'bg-yellow-500',
  Critical: 'bg-red-500',
};

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <AppLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher un équipement..."
              className="w-full rounded-lg bg-background pl-8"
            />
          </div>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/dashboard')}
                tooltip="Tableau de bord"
              >
                <Link href="/dashboard">
                  <LayoutDashboard />
                  <span>Tableau de bord</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Alertes">
                <Link href="#">
                  <AlertTriangle />
                  <span>Alertes</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/planification')}
                tooltip="Planification"
              >
                <Link href="/planification">
                  <Calendar />
                  <span>Planification</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/analyses')}
                tooltip="Analyses"
              >
                <Link href="/analyses">
                  <BarChart />
                  <span>Analyses</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <div className="flex items-center justify-between">
            <SidebarGroupLabel>Équipements</SidebarGroupLabel>
            <Button asChild variant="ghost" size="icon" className="h-7 w-7 group-data-[collapsible=icon]:hidden">
                <Link href="/equipment/new" title="Ajouter un équipement">
                    <Plus className="h-4 w-4" />
                </Link>
            </Button>
          </div>
          <SidebarMenu>
            {allEquipment.map((item) => (
              <SidebarMenuItem key={item.id}>
                <Link
                  href={`/equipment/${item.id}`}
                  className="group flex w-full items-center justify-between rounded-md p-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span
                      className={cn(
                        'h-2 w-2 rounded-full shrink-0',
                        statusDot[item.status]
                      )}
                    />
                    <span className="truncate">{item.name}</span>
                  </div>
                   <StatusBadge
                    status={item.status}
                    className={cn(
                      item.status === 'Healthy' && 'bg-green-500/80 text-green-950',
                      item.status === 'Warning' && 'bg-yellow-500/80 text-yellow-950',
                      item.status === 'Critical' && 'bg-red-500/80 text-red-950',
                      'px-1.5 py-0 text-[10px] font-semibold shrink-0 border-none'
                    )}
                  />
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <div className="p-4 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          <p>Analyses multi-sites et tendances</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
