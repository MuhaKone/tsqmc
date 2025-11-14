import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const alerts = [
    { type: 'Critical', title: "Anomalie Turbine T-02 : pic de vibration", time: "Il y a 2 min", site: "Usine Nord", color: "bg-red-500" },
    { type: 'Warning', title: "Pompe P-17 proche du seuil de température", time: "Il y a 12 min", site: "Mine Ouest", color: "bg-yellow-500" },
    { type: 'Warning', title: "Déséquilibre de courant Moteur M-44", time: "Il y a 28 min", site: "Poste électrique", color: "bg-yellow-500" }
];


export default function RealtimeAlerts() {
  return (
    <Card className="bg-card">
      <CardHeader className="p-4">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Alertes en temps réel</CardTitle>
            <TabsList>
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="critical">Critiques</TabsTrigger>
              <TabsTrigger value="warnings">Avertissements</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all" className="mt-4">
            <AlertList alerts={alerts} />
          </TabsContent>
          <TabsContent value="critical" className="mt-4">
            <AlertList alerts={alerts.filter(a => a.type === 'Critical')} />
          </TabsContent>
          <TabsContent value="warnings" className="mt-4">
             <AlertList alerts={alerts.filter(a => a.type === 'Warning')} />
          </TabsContent>
        </Tabs>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        
      </CardContent>
    </Card>
  );
}


function AlertList({ alerts }: { alerts: typeof alerts}) {
    if (alerts.length === 0) {
        return <p className="text-center text-muted-foreground py-4">Aucune alerte.</p>
    }
    return (
        <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className={`h-2.5 w-2.5 rounded-full ${alert.color}`} />
            <div className="flex-1">
              <p className="font-medium">{alert.title}</p>
              <p className="text-xs text-muted-foreground">{alert.time} • Site: {alert.site}</p>
            </div>
            <Button variant="outline" size="sm">Voir</Button>
          </div>
        ))}
      </div>
    )
}
