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
} from '@/components/ui/sidebar';
import { AppLogo } from './app-logo';
import {
  LayoutDashboard,
  AlertTriangle,
  Calendar,
  BarChart,
  Search,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { allEquipment } from '@/lib/data';
import { StatusBadge } from './status-badge';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import React from 'react';

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
              <SidebarMenuButton asChild tooltip="Planification">
                <Link href="#">
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
          <SidebarGroupLabel>Équipements</SidebarGroupLabel>
          <SidebarMenu>
            {allEquipment.map((item) => (
              <SidebarMenuItem key={item.id}>
                <Link
                  href={`/equipment/${item.id}`}
                  className="group flex w-full items-center justify-between rounded-md p-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'h-2 w-2 rounded-full',
                        statusDot[item.status]
                      )}
                    />
                    <span className="truncate">{item.name}</span>
                  </div>
                   <StatusBadge
                    status={item.status}
                    className={cn(
                      item.status === 'Healthy' && 'bg-green-500/80 text-green-950 border-green-600/50',
                      item.status === 'Warning' && 'bg-yellow-500/80 text-yellow-950 border-yellow-600/50',
                      item.status === 'Critical' && 'bg-red-500/80 text-red-950 border-red-600/50',
                      'px-1.5 py-0 text-[10px] font-semibold'
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
