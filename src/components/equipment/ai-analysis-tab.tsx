'use client';
import { useState } from 'react';
import type { Equipment } from '@/lib/types';
import {
  runAnomalyDetection,
  runFailurePrediction,
} from '@/app/(main)/equipment/[id]/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { AlertCircle, BrainCircuit, Loader2, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import type { DetectAnomalousBehaviorOutput } from '@/ai/flows/detect-anomalous-equipment-behavior';
import type { PredictEquipmentFailureOutput } from '@/ai/flows/predict-equipment-failure';
import { Separator } from '../ui/separator';

type AiAnalysisTabProps = {
  equipment: Equipment;
};

export default function AiAnalysisTab({ equipment }: AiAnalysisTabProps) {
  const [anomalyLoading, setAnomalyLoading] = useState(false);
  const [anomalyResult, setAnomalyResult] =
    useState<DetectAnomalousBehaviorOutput | null>(null);
  const [anomalyError, setAnomalyError] = useState<string | null>(null);

  const [predictionLoading, setPredictionLoading] = useState(false);
  const [predictionResult, setPredictionResult] =
    useState<PredictEquipmentFailureOutput | null>(null);
  const [predictionError, setPredictionError] = useState<string | null>(null);

  const handleAnomalyDetection = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAnomalyLoading(true);
    setAnomalyResult(null);
    setAnomalyError(null);

    const formData = new FormData(event.currentTarget);
    const result = await runAnomalyDetection(formData);

    if (result.success) {
      setAnomalyResult(result.data!);
    } else {
      setAnomalyError(result.error);
    }
    setAnomalyLoading(false);
  };

  const handleFailurePrediction = async () => {
    setPredictionLoading(true);
    setPredictionResult(null);
    setPredictionError(null);

    const equipmentDataString = JSON.stringify(equipment.sensorData, null, 2);
    const result = await runFailurePrediction(equipment.id, equipmentDataString);

    if (result.success) {
        setPredictionResult(result.data!);
    } else {
        setPredictionError(result.error);
    }
    setPredictionLoading(false);
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <form onSubmit={handleAnomalyDetection}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              Anomaly Detection
            </CardTitle>
            <CardDescription>
              Input current sensor values to check for anomalous behavior.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <input type="hidden" name="equipmentId" value={equipment.id} />
            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature (°C)</Label>
              <Input
                id="temperature"
                name="temperature"
                type="number"
                defaultValue={equipment.sensorData.temperature}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vibration">Vibration (m/s²)</Label>
              <Input
                id="vibration"
                name="vibration"
                type="number"
                step="0.1"
                defaultValue={equipment.sensorData.vibration}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="voltage">Voltage (V)</Label>
              <Input
                id="voltage"
                name="voltage"
                type="number"
                defaultValue={equipment.sensorData.voltage}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="current">Current (A)</Label>
              <Input
                id="current"
                name="current"
                type="number"
                defaultValue={equipment.sensorData.current}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <Button type="submit" disabled={anomalyLoading}>
              {anomalyLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Analyze for Anomalies
            </Button>
            {anomalyResult && (
              <Alert
                variant={
                  anomalyResult.isAnomalous ? 'destructive' : 'default'
                }
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>
                  {anomalyResult.isAnomalous
                    ? 'Anomaly Detected!'
                    : 'Normal Behavior'}
                </AlertTitle>
                <AlertDescription>
                  {anomalyResult.anomalyExplanation?.reason ||
                    'The equipment is operating within normal parameters.'}
                  {anomalyResult.anomalyExplanation?.suggestedAction && (
                    <p className="mt-2 font-semibold">
                      Suggested Action:{' '}
                      {anomalyResult.anomalyExplanation.suggestedAction}
                    </p>
                  )}
                </AlertDescription>
              </Alert>
            )}
            {anomalyError && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{anomalyError}</AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </form>
      </Card>

      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-accent" />
            Predictive Failure Analysis
          </CardTitle>
          <CardDescription>
            Use historical and current data to predict potential failures.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">
            This AI model analyzes patterns to forecast when maintenance might
            be required, helping you prevent downtime.
          </p>
        </CardContent>
        <CardFooter className="flex-col items-start gap-4">
            <Button onClick={handleFailurePrediction} disabled={predictionLoading}>
                {predictionLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Predict Failure
            </Button>
            {predictionResult && (
                <Alert variant={predictionResult.predictedFailure ? 'destructive' : 'default'}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>{predictionResult.predictedFailure ? 'Potential Failure Predicted' : 'No Failure Predicted'}</AlertTitle>
                    <AlertDescription>
                        <p>{predictionResult.failureReason}</p>
                        {predictionResult.predictedFailure && (
                            <>
                                <p className="mt-2"><strong>Est. Time to Failure:</strong> {predictionResult.estimatedTimeToFailure}</p>
                                <p><strong>Confidence:</strong> {(predictionResult.confidenceLevel * 100).toFixed(0)}%</p>
                            </>
                        )}
                    </AlertDescription>
                </Alert>
            )}
            {predictionError && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{predictionError}</AlertDescription>
              </Alert>
            )}
        </CardFooter>
      </Card>
    </div>
  );
}
