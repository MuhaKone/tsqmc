
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
import { addDays, format, isSameDay, startOfDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useRouter } from 'next/navigation';

type TaskPriority = 'Haute' | 'Moyenne' | 'Basse';
type TaskType = 'Correctif' | 'Préventif' | 'Inspection' | 'Prédictif';

type Task = {
  time: string;
  title: string;
  assignee: { name: string; avatar: string };
  priority: TaskPriority;
  type: TaskType;
};

type ScheduledTask = {
  id: string;
  date: Date;
  tasks: Task[];
};

const today = startOfDay(new Date());

const allScheduledTasks: ScheduledTask[] = [
  {
    id: 'task-1',
    date: today,
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
    date: addDays(today, 1),
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
    date: addDays(today, 2),
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
  {
    id: 'task-4',
    date: addDays(today, 6),
    tasks: [
      {
        time: '14:00 - 15:00',
        title: 'Contrôle thermographique — Transformateur TR-1',
        assignee: { name: 'A. Rossi', avatar: 'https://picsum.photos/seed/rossi/40/40' },
        priority: 'Haute',
        type: 'Prédictif',
      }
    ]
  }
];

const priorityColors: Record<TaskPriority, string> = {
    'Haute': 'bg-red-500',
    'Moyenne': 'bg-yellow-500',
    'Basse': 'bg-blue-500',
};


export default function PlanificationPage() {
    const router = useRouter();
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const isMobile = useIsMobile();

    const selectedDayTasks = date 
        ? allScheduledTasks.find(day => isSameDay(day.date, date))
        : undefined;

    const DayWithTasks = ({ date, displayMonth }: { date: Date; displayMonth: Date }) => {
        const tasksForDay = allScheduledTasks
            .filter(d => isSameDay(d.date, date))
            .flatMap(d => d.tasks);
        
        const isCurrentMonth = date.getMonth() === displayMonth.getMonth();

        return (
            <div className={`relative h-full w-full flex flex-col p-1.5 ${!isCurrentMonth ? 'text-muted-foreground opacity-50' : ''}`}>
                <time dateTime={date.toISOString()} className="self-start">{format(date, 'd')}</time>
                {tasksForDay.length > 0 && (
                    <div className="flex-grow mt-1 flex flex-wrap gap-1">
                        {tasksForDay.map((task, i) => (
                            <div key={i} className={`h-1.5 w-1.5 rounded-full ${priorityColors[task.priority]}`}></div>
                        ))}
                    </div>
                )}
            </div>
        )
    }

  return (
    <div className="container mx-auto flex flex-col gap-6">
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
          <Button className="w-full sm:w-auto" onClick={() => router.push('/work-orders/new')}>
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
                locale={fr}
                numberOfMonths={isMobile ? 1 : 2}
                components={{
                    Day: ({ date, displayMonth }) => <DayWithTasks date={date} displayMonth={displayMonth} />
                }}
                classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 p-3",
                    month: "space-y-4 w-full",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell: "text-muted-foreground rounded-md w-full font-normal text-[0.8rem]",
                    row: "flex w-full mt-2",
                    cell: "h-24 w-full text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                    day: "h-full w-full p-0 font-normal aria-selected:opacity-100 flex flex-col items-start justify-start hover:bg-accent rounded-md",
                    day_selected: "bg-accent text-accent-foreground",
                    day_today: "bg-muted-foreground/10 text-accent-foreground",
                }}
              />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
                <CardTitle className="text-lg">
                    {date ? format(date, 'eeee d MMMM', { locale: fr }) : 'Tâches planifiées'}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 min-h-[300px]">
                {selectedDayTasks ? (
                    <div className="space-y-4">
                        {selectedDayTasks.tasks.map((task, index) => (
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
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <p className="text-muted-foreground">Aucune tâche planifiée pour ce jour.</p>
                    </div>
                )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

    

    