'use client';
import { allParts } from '@/lib/data';
import type { Part, PartStatus } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const statusColors: Record<PartStatus, string> = {
  'En stock': 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400 border-green-200 dark:border-transparent',
  'Stock bas': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400 border-yellow-200 dark:border-transparent',
  'En rupture': 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-transparent',
};

export default function InventoryPage() {
  const parts: Part[] = allParts;

  return (
    <div className="container mx-auto flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold">Inventaire des pièces</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher une pièce..."
              className="w-full rounded-lg bg-background pl-8 sm:w-[200px] lg:w-[300px]"
            />
          </div>
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter une pièce
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pièces de rechange</CardTitle>
          <CardDescription>
            Gérez le stock de toutes vos pièces de rechange.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Stock / Seuil</TableHead>
                  <TableHead>Emplacement</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parts.map((part) => (
                  <TableRow key={part.id}>
                    <TableCell className="font-medium min-w-48">{part.name}</TableCell>
                    <TableCell className="text-muted-foreground">{part.sku}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn('border-transparent font-medium', statusColors[part.status])}>
                        {part.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{part.stock} / {part.threshold}</TableCell>
                    <TableCell className="text-muted-foreground">{part.location}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Modifier</DropdownMenuItem>
                          <DropdownMenuItem>Ajuster le stock</DropdownMenuItem>
                          <DropdownMenuItem>Voir l'historique</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
