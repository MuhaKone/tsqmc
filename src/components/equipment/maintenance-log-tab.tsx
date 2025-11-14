'use client';

import { useState } from 'react';
import type { MaintenanceLog } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

type MaintenanceLogTabProps = {
  initialLogs: MaintenanceLog[];
};

export default function MaintenanceLogTab({
  initialLogs,
}: MaintenanceLogTabProps) {
  const [logs, setLogs] = useState<MaintenanceLog[]>(initialLogs);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newLog: MaintenanceLog = {
        id: `log-${logs.length + 1}`,
        author: 'Mamady Condé',
        date: new Date().toISOString(),
        comment: newComment.trim(),
      };
      setLogs([newLog, ...logs]);
      setNewComment('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance & Collaboration Log</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Textarea
            placeholder="Add a comment, observation, or maintenance note..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
          />
          <Button type="submit" className="self-end" disabled={!newComment.trim()}>
            <Send className="mr-2 h-4 w-4" />
            Add Log Entry
          </Button>
        </form>

        <div className="mt-6 space-y-6">
          {logs.map((log) => (
            <div key={log.id} className="flex gap-4">
              <Avatar>
                <AvatarImage src={`https://picsum.photos/seed/${log.author}/100/100`} />
                <AvatarFallback>
                  {log.author
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="w-full rounded-md border bg-muted/20 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-foreground">{log.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(log.date), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <p className="mt-2 text-sm text-foreground/80">{log.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
