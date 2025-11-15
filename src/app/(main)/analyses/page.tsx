'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Bar, BarChart, CartesianGrid, XAxis, Line, ComposedChart, Tooltip, YAxis, Cell } from 'recharts';
import { ChartContainer, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { StatusBadge } from '@/components/status-badge';
import { Badge } from '@/components/ui/badge';
import { Circle } from 'lucide-react';
import React from 'react';

const topRisks = [
    { name: 'Turbine T-02', score: 92, location: 'Usine Nord', status: 'Critique' },
    { name: 'Pompe P-17', score: 74, location: 'Mine Ouest', status: 'Avertissement' },
    { name: 'Moteur M-44', score: 63, location: 'Poste électrique', status: 'Surveillance' },
];

const recommendations = [
    { 
        cause: 'Désalignement arbre', 
        confidence: 0.82, 
        action: 'Réaligner couplage T-02', 
        duration: '2 h', 
        priority: 'Haute',
        impact: "Réduction anomalies estimée: 35% • Gain MTBF: +6 j"
    },
    { 
        cause: 'Lubrification insuffisante', 
        confidence: 0.68, 
        action: 'Vérifier graissage palier', 
        duration: '30 min', 
        priority: 'Moyenne',
        impact: ""
    },
];

const dailyAnomaliesData = [
  { date: '1', critiques: 2, avertissements: 5, resolues: 3 },
  { date: '2', critiques: 3, avertissements: 6, resolues: 4 },
  { date: '3', critiques: 1, avertissements: 4, resolues: 2 },
  { date: '4', critiques: 4, avertissements: 8, resolues: 5 },
  { date: '5', critiques: 2, avertissements: 5, resolues: 3 },
  { date: '6', critiques: 5, avertissements: 7, resolues: 6 },
  { date: '7', critiques: 3, avertissements: 6, resolues: 4 },
];

const categoryDistributionData = [
  { category: 'Vibration', value: 45, fill: 'var(--color-vibration)' },
  { category: 'Température', value: 30, fill: 'var(--color-temperature)' },
  { category: 'Électrique', value: 25, fill: 'var(--color-electrique)' },
];

const correlationData = Array.from({ length: 50 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
}));


export default function AnalysesPage() {
  return (
    <div className="container mx-auto flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold">Analyses et tendances</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <Select defaultValue="all-sites">
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-sites">Tous les sites</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="30d">
            <SelectTrigger className="w-full sm:w-[80px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30d">30 j</SelectItem>
              <SelectItem value="7d">7 j</SelectItem>
              <SelectItem value="24h">24 h</SelectItem>
            </SelectContent>
          </Select>
           <Select defaultValue="vibration">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vibration">Catégorie: Vibration</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="w-full sm:w-auto">Exporter</Button>
          <Button className="w-full sm:w-auto">Configurer</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Tabs defaultValue="ensemble">
                <TabsList className="mb-4 flex-wrap h-auto">
                    <TabsTrigger value="ensemble">Vue d'ensemble</TabsTrigger>
                    <TabsTrigger value="capteurs">Capteurs</TabsTrigger>
                    <TabsTrigger value="sites">Sites</TabsTrigger>
                    <TabsTrigger value="equipements">Équipements</TabsTrigger>
                </TabsList>
                <TabsContent value="ensemble">
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                        <StatCard title="Anomalies (30 j)" value="184" change="+12% vs 30 j" />
                        <StatCard title="MTBF global" value="42 j" change="+3 j" />
                        <StatCard title="Temps d'arrêt évité" value="118 h" change="+9 h" />
                        <StatCard title="Tâches planifiées" value="56" change="+7" />
                    </div>
                </TabsContent>
            </Tabs>

            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Tendance anomalies par jour</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                          config={{
                            critiques: { label: "Critiques", color: "hsl(var(--chart-1))" },
                            avertissements: { label: "Avertissements", color: "hsl(var(--chart-2))" },
                            resolues: { label: "Résolues", color: "hsl(var(--chart-4))" },
                          }}
                          className="h-64 w-full"
                        >
                            <ComposedChart data={dailyAnomaliesData}>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                                <Tooltip content={<ChartTooltipContent />} />
                                <ChartLegend content={<ChartLegendContent />} />
                                <Bar dataKey="critiques" stackId="a" fill="var(--color-critiques)" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="avertissements" stackId="a" fill="var(--color-avertissements)" radius={[0, 0, 0, 0]} />
                                <Line type="monotone" dataKey="resolues" stroke="var(--color-resolues)" strokeWidth={2} dot={false} />
                            </ComposedChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Distribution par catégorie</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                          config={{
                            vibration: { label: 'Vibration', color: 'hsl(var(--chart-1))' },
                            temperature: { label: 'Température', color: 'hsl(var(--chart-2))' },
                            electrique: { label: 'Électrique', color: 'hsl(var(--chart-3))' },
                          }}
                          className="h-64 w-full"
                        >
                            <BarChart data={categoryDistributionData} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid horizontal={false} />
                                <XAxis type="number" hide />
                                <YAxis dataKey="category" type="category" tickLine={false} axisLine={false} tickMargin={8} width={80}/>
                                <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent />} />
                                <ChartLegend content={<ChartLegendContent />} />
                                <Bar dataKey="value" radius={4}>
                                  {categoryDistributionData.map((entry) => (
                                    <Cell key={entry.category} fill={entry.fill} />
                                  ))}
                                </Bar>
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
            
            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
                <Card>
                    <CardHeader><CardTitle className="text-base">Top équipements à risque</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                    {topRisks.map(risk => (
                        <div key={risk.name} className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-md border p-3 gap-2">
                            <div>
                                <p className="font-semibold">{risk.name}</p>
                                <p className="text-xs text-muted-foreground">Score risque {risk.score}/100 • {risk.location}</p>
                            </div>
                            <StatusBadge status={risk.status as any} />
                        </div>
                    ))}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle className="text-base">Corrélation capteurs</CardTitle></CardHeader>
                    <CardContent>
                        <ChartContainer config={{}} className="h-64 w-full">
                            <ComposedChart data={correlationData}>
                                 <XAxis type="number" dataKey="x" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} tickFormatter={() => ''}/>
                                 <YAxis type="number" dataKey="y" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} tickFormatter={() => ''} />
                                <Tooltip content={<ChartTooltipContent hideIndicator />} />
                                <Line dataKey="y" stroke="var(--color-chart-2)" dot={true} />
                            </ComposedChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
            
            <Card className="mt-6">
                <CardHeader><CardTitle className="text-base">Segments et recommandations</CardTitle></CardHeader>
                <CardContent>
                    <div className="hidden md:grid md:grid-cols-4 gap-4 text-sm">
                        <div className="font-semibold text-muted-foreground">Racines probables</div>
                        <div className="font-semibold text-muted-foreground col-span-2">Actions suggérées</div>
                        <div className="font-semibold text-muted-foreground">Impact attendu</div>
                        
                        {recommendations.map((rec, i) => (
                            <React.Fragment key={i}>
                                <div className="p-3 rounded-md border bg-muted/30">
                                    <p className="font-semibold">{rec.cause}</p>
                                    <p className="text-xs text-muted-foreground">Confiance {rec.confidence}</p>
                                    <Button variant="outline" size="sm" className="mt-2">Actionner</Button>
                                </div>
                                <div className="p-3 rounded-md border bg-muted/30 col-span-2 flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold">{rec.action}</p>
                                        <p className="text-xs text-muted-foreground">Durée estimée {rec.duration}</p>
                                    </div>
                                    <Badge variant={rec.priority === "Haute" ? "destructive" : "secondary"}>{rec.priority}</Badge>
                                </div>
                                <div className="p-3 rounded-md border bg-muted/30 flex items-center">
                                    <p className="text-xs text-muted-foreground">{rec.impact}</p>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="md:hidden space-y-4">
                        {recommendations.map((rec, i) => (
                            <div key={i} className="p-3 rounded-md border bg-muted/30 space-y-3">
                                <div>
                                    <p className="font-semibold text-muted-foreground text-xs">Racine probable</p>
                                    <p className="font-semibold">{rec.cause}</p>
                                    <p className="text-xs text-muted-foreground">Confiance {rec.confidence}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-muted-foreground text-xs">Action suggérée</p>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold">{rec.action}</p>
                                            <p className="text-xs text-muted-foreground">Durée estimée {rec.duration}</p>
                                        </div>
                                        <Badge variant={rec.priority === "Haute" ? "destructive" : "secondary"}>{rec.priority}</Badge>
                                    </div>
                                </div>
                                 {rec.impact && (
                                <div>
                                    <p className="font-semibold text-muted-foreground text-xs">Impact attendu</p>
                                    <p className="text-xs text-muted-foreground">{rec.impact}</p>
                                </div>
                                )}
                                <Button variant="outline" size="sm" className="w-full">Actionner</Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Analyse détaillée</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Select defaultValue="usine-nord">
                        <SelectTrigger><SelectValue/></SelectTrigger>
                        <SelectContent><SelectItem value="usine-nord">Site: Usine Nord</SelectItem></SelectContent>
                    </Select>
                     <Select defaultValue="t-02">
                        <SelectTrigger><SelectValue/></SelectTrigger>
                        <SelectContent><SelectItem value="t-02">Équipement: T-02</SelectItem></SelectContent>
                    </Select>
                     <Select defaultValue="7d">
                        <SelectTrigger><SelectValue/></SelectTrigger>
                        <SelectContent><SelectItem value="7d">Période: 7 j</SelectItem></SelectContent>
                    </Select>
                </CardContent>

                <CardHeader className="border-t pt-4">
                    <CardTitle className="text-base">Séries temporelles multi-capteurs</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartPlaceholder>
                        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1.5"><Circle className="h-2 w-2 fill-blue-400 text-blue-400"/>Température</span>
                            <span className="flex items-center gap-1.5"><Circle className="h-2 w-2 fill-orange-400 text-orange-400"/>Vibration</span>
                            <span className="flex items-center gap-1.5"><Circle className="h-2 w-2 fill-green-400 text-green-400"/>Courant</span>
                        </div>
                    </ChartPlaceholder>
                </CardContent>

                 <CardHeader className="border-t pt-4">
                    <CardTitle className="text-base">Histogramme vibration</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartPlaceholder />
                </CardContent>

                <CardHeader className="border-t pt-4">
                    <CardTitle className="text-base">Boîte à moustaches température</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartPlaceholder />
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change }: { title: string, value: string, change: string }) {
    return (
        <Card className="bg-card">
            <CardHeader className="p-4">
                <CardDescription>{title}</CardDescription>
                <CardTitle className="text-3xl">{value}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <p className="text-xs text-muted-foreground">{change}</p>
            </CardContent>
        </Card>
    )
}

function ChartPlaceholder({ children }: { children?: React.ReactNode }) {
    return (
        <div className="h-40 w-full rounded-md border border-dashed border-border flex items-center justify-center bg-muted/20 p-4">
            {children || <p className="text-xs text-muted-foreground text-center">Chart data placeholder</p>}
        </div>
    )
}

    
    
