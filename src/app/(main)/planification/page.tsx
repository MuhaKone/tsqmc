'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
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
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const scheduledTasks = [
  {
    id: 'task-1',
    day: 'Aujourd\'hui',
    tasks: [
      {
        time: '09:00 - 11:00',
        title: 'Remplacement roulements — Turbine T-02',
        assignee: { name: 'A. Kumar', avatar: 'https://picsum.photos/seed/kumar/40/40' },
        priority: 'Haute',
        type: 'Correctif',
      },
    ],
  },
  {
    id: 'task-2',
    day: 'Demain',
    tasks: [
      {
        time: '13:00 - 14:00',
        title: 'Inspection refroidissement — Pompe P-17',
        assignee: { name: 'L. Chen', avatar: 'https://picsum.photos/seed/chen/40/40' },
        priority: 'Moyenne',
        type: 'Préventif',
      },
    ],
  },
  {
    id: 'task-3',
    day: 'Vendredi 24/05',
    tasks: [
        {
            time: '08:30 - 09:30',
            title: 'Alignement courroie — Convoyeur A-01',
            assignee: { name: 'M. Silva', avatar: 'https://picsum.photos/seed/silva/40/40' },
            priority: 'Basse',
            type: 'Inspection',
        },
        {
            time: '10:00 - 12:00',
            title: 'Analyse vibratoire — Moteur M-44',
            assignee: { name: 'J. Martin', avatar: 'https://picsum.photos/seed/martin/40/40' },
            priority: 'Moyenne',
            type: 'Prédictif',
        }
    ]
  },
];

export default function PlanificationPage() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const isMobile = useIsMobile();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold">Planification</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <Select defaultValue="week">
            <SelectTrigger className="w-full sm:w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Jour</SelectItem>
              <SelectItem value="week">Semaine</SelectItem>
              <SelectItem value="month">Mois</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-sites">
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-sites">Tous les sites</SelectItem>
            </SelectContent>
          </Select>
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Planifier une tâche
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
               <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full"
                numberOfMonths={isMobile ? 1 : 2}
                classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 p-3",
                    month: "space-y-4 w-full",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell: "text-muted-foreground rounded-md w-full font-normal text-[0.8rem]",
                    row: "flex w-full mt-2",
                    cell: "h-24 w-full text-center text-sm p-1 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                    day: "h-full w-full p-1.5 font-normal aria-selected:opacity-100 flex flex-col items-start justify-start hover:bg-accent rounded-md",
                    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    day_today: "bg-accent text-accent-foreground",
                }}
              />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
                <CardTitle className="text-lg">Tâches planifiées</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {scheduledTasks.map(group => (
                    <div key={group.id}>
                        <h3 className="mb-3 text-sm font-semibold text-muted-foreground">{group.day}</h3>
                        <div className="space-y-4">
                            {group.tasks.map((task, index) => (
                                <div key={index} className="flex items-start gap-3 rounded-md border border-border/70 p-3 bg-muted/30">
                                    <div className="text-xs text-muted-foreground w-20 shrink-0">{task.time}</div>
                                    <div className="flex-grow">
                                        <p className="font-medium leading-snug">{task.title}</p>
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 gap-2">
                                             <div className="flex items-center gap-2">
                                                <Avatar className="h-5 w-5">
                                                    <AvatarImage src={task.assignee.avatar} />
                                                    <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <span className="text-xs text-muted-foreground">{task.assignee.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2 self-end sm:self-center">
                                                <Badge variant={task.priority === 'Haute' ? 'destructive' : 'secondary'}>{task.priority}</Badge>
                                                <Badge variant="outline">{task.type}</Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

    