import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const maintenanceTasks = [
  { 
    title: "Remplacement roulements — Turbine T-02", 
    time: "Demain • 09:00-11:00", 
    assignee: "A. Kumar",
    avatar: 'https://picsum.photos/seed/kumar/100/100'
  },
  { 
    title: "Inspection refroidissement — Pompe P-17", 
    time: "Jeu • 13:00-14:00", 
    assignee: "L. Chen",
    avatar: 'https://picsum.photos/seed/chen/100/100'
  },
  { 
    title: "Alignement courroie — Convoyeur A-01", 
    time: "Ven • 08:30-09:30", 
    assignee: "M. Silva",
    avatar: 'https://picsum.photos/seed/silva/100/100'
  }
];

export default function UpcomingMaintenance() {
  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <CardTitle className="text-lg">Maintenance à venir</CardTitle>
        <Button variant="outline">Planifier</Button>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-4">
          {maintenanceTasks.map((task, index) => (
            <div key={index} className="flex items-center gap-4 border-b border-border pb-4 last:border-b-0 last:pb-0">
              <div className="flex-1">
                <p className="font-medium">{task.title}</p>
                <p className="text-sm text-muted-foreground">{task.time}</p>
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                   <AvatarImage src={task.avatar} />
                   <AvatarFallback>{task.assignee.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">{task.assignee}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
