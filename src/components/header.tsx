'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

function generateBreadcrumbs(path: string) {
  const pathSegments = path.split('/').filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    // A simple way to format the breadcrumb name
    let name = segment.replace(/-/g, ' ').replace(/\[id\]/g, 'details');
    name = name.charAt(0).toUpperCase() + name.slice(1);
    
    // Custom names for specific routes
    if (href === '/dashboard') {
      name = 'Tableau de bord';
    }
     if (href === '/work-orders/new') {
      name = 'Créer ODT';
    }


    return { href, name, isCurrent: index === pathSegments.length - 1 };
  });

  if (path === '/dashboard') {
      return [{ href: '/dashboard', name: 'Tableau de maintenance prédictive', isCurrent: true }];
  }
  
  if (path.startsWith('/work-orders/new')) {
     return [
        { href: '/dashboard', name: 'Nouvel ordre de travail', isCurrent: false },
        { href: '#', name: 'Alertes', isCurrent: false },
        { href: '#', name: 'Détail', isCurrent: false },
        { href: '/work-orders/new', name: 'Créer ODT', isCurrent: true },
    ]
  }


  return [{ href: '/dashboard', name: 'Home' }, ...breadcrumbs];
}

export default function Header() {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex-1 hidden md:block">
        {pathname === '/dashboard' ? (
          <h1 className="text-xl font-bold">
            {breadcrumbs[0].name}
          </h1>
        ) : (
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.href + index}>
                  <BreadcrumbItem>
                    {crumb.isCurrent ? (
                      <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={crumb.href}>{crumb.name}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <Select defaultValue="all">
          <SelectTrigger className="w-[130px] sm:w-[180px]">
            <SelectValue placeholder="Tous les sites" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les sites</SelectItem>
            <SelectItem value="usine-nord">Usine Nord</SelectItem>
            <SelectItem value="mine-ouest">Mine Ouest</SelectItem>
            <SelectItem value="poste-electrique">Poste électrique</SelectItem>
          </SelectContent>
        </Select>
        <Button asChild>
          <Link href="/work-orders/new">
            <Plus className="mr-0 sm:mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Nouvel ordre de travail</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}

    