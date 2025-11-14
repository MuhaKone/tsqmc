import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Circle } from 'lucide-react';

export default function PredictedHealth() {
  return (
    <Card className="bg-card flex flex-col">
      <CardHeader className="p-4">
        <CardTitle className="text-lg">Santé prédite</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold">Durée de vie restante</h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Circle className="h-2 w-2 fill-current text-blue-500" />
                <span>Prévision</span>
              </div>
            </div>
            <div className="h-40 w-full rounded-md border border-dashed border-border flex items-center justify-center p-4 bg-muted/20">
                <p className="text-sm text-muted-foreground text-center">
                    Projection T-02 : risque de défaillance dans 5-7 jours. Planifier une intervention.
                </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
