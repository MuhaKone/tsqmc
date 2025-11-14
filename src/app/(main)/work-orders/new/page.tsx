import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const tasks = [
  {
    name: 'Vérifier vibration et température sur VIB-3 / TMP-1',
    assignee: 'A. Rossi',
    avatar: 'https://picsum.photos/seed/rossi/40/40',
    duration: '45m',
  },
  {
    name: 'Inspecter palier B et lubrifier',
    assignee: 'M. Diallo',
    avatar: 'https://picsum.photos/seed/diallo/40/40',
    duration: '60m',
  },
  {
    name: 'Resserage accouplement et test',
    assignee: 'L. Chen',
    avatar: 'https://picsum.photos/seed/chen/40/40',
    duration: '15m',
  },
];

export default function NewWorkOrderPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold">Nouvel ordre de travail</h1>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline">Template: Intervention</Button>
          <Button variant="outline">Template: Inspection</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Order Details */}
          <Card>
            <CardHeader>
              <CardTitle>Détails de l'ordre</CardTitle>
              <CardDescription>
                Prérempli depuis l'alerte: Turbine T-02 • VIB-3
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Titre</label>
                <Input id="title" defaultValue="Inspection vibration palier B" />
              </div>
              <div className="space-y-2">
                 <label htmlFor="priority" className="text-sm font-medium">Priorité</label>
                <div className="flex h-10 items-center rounded-md border border-input bg-background px-3 text-sm">
                  Critique
                </div>
              </div>
              <div className="space-y-2">
                 <label htmlFor="equipment" className="text-sm font-medium">Équipement</label>
                <Input id="equipment" defaultValue="Turbine T-02" />
              </div>
              <div className="space-y-2">
                 <label htmlFor="site" className="text-sm font-medium">Site</label>
                <Input id="site" defaultValue="Usine Nord" />
              </div>
              <div className="space-y-2">
                 <label htmlFor="category" className="text-sm font-medium">Catégorie</label>
                <div className="flex h-10 items-center rounded-md border border-input bg-background px-3 text-sm">
                  Maintenance corrective
                </div>
              </div>
              <div className="space-y-2">
                 <label htmlFor="window" className="text-sm font-medium">Fenêtre recommandée</label>
                 <div className="flex h-10 items-center rounded-md border border-input bg-background px-3 text-sm">
                  Dans 5-7 jours
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                 <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Textarea id="description" rows={4} defaultValue="Anomalie détectée par IA (modèle v3.2): pic de vibration RMS x2.1 sur capteur VIB-3, suspicion d'usure palier. Demander vérification mécanique, lubrification et resserrage."/>
              </div>
            </CardContent>
          </Card>

          {/* Tasks */}
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <CardTitle>Tâches</CardTitle>
              <Button variant="outline" className="w-full sm:w-auto">Ajouter tâche</Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tâche</TableHead>
                      <TableHead>Responsable</TableHead>
                      <TableHead className="text-right">Durée</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((task, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium min-w-[200px]">{task.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={task.avatar} />
                              <AvatarFallback>{task.assignee.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{task.assignee}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{task.duration}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Parts and Documents */}
          <Card>
             <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <CardTitle>Pièces et documents</CardTitle>
               <div className="flex gap-2 flex-wrap w-full sm:w-auto">
                <Button variant="outline" className="flex-grow sm:flex-grow-0">Ajouter pièce</Button>
                <Button variant="outline" className="flex-grow sm:flex-grow-0">Ajouter document</Button>
              </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="mb-2 text-sm font-medium text-muted-foreground">Pièces requises</h4>
                        <div className="rounded-md border bg-muted/50 p-3 text-sm min-h-[60px]">
                            Graisse palier ISO VG68 (1), Joint palier B (1)
                        </div>
                    </div>
                     <div>
                        <h4 className="mb-2 text-sm font-medium text-muted-foreground">Documents</h4>
                        <div className="rounded-md border bg-muted/50 p-3 text-sm min-h-[60px]">
                            Procédure vibration v2.pdf
                        </div>
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Récapitulatif</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Statut initial</span>
                <Badge variant="secondary">Brouillon</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Assigné à</span>
                <div className="flex items-center gap-2">
                   <Avatar className="h-6 w-6">
                      <AvatarImage src="https://picsum.photos/seed/martin/40/40" />
                      <AvatarFallback>JM</AvatarFallback>
                    </Avatar>
                  <span>J. Martin</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Échéance</span>
                <span>Dans 6 jours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Temps estimé</span>
                <span>2h</span>
              </div>
               <div className="flex flex-col space-y-1">
                <span className="text-muted-foreground">Pièces</span>
                <span className="text-sm">Graisse palier ISO VG68, clé dynamométrique</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
       <div className="flex flex-col sm:flex-row items-center justify-end gap-2 border-t border-border pt-4 mt-2">
            <span className="text-sm text-muted-foreground mr-auto order-last sm:order-first mt-2 sm:mt-0">Créé depuis l'alerte: Pic de vibration • Il y a 2 min</span>
            <Button variant="outline" className="w-full sm:w-auto">Enregistrer brouillon</Button>
            <Button className="w-full sm:w-auto">Valider et publier</Button>
        </div>
    </div>
  );
}

    