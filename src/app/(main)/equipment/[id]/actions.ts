'use server';

import {
  detectAnomalousBehavior,
  type DetectAnomalousBehaviorInput,
} from '@/ai/flows/detect-anomalous-equipment-behavior';
import { predictEquipmentFailure } from '@/ai/flows/predict-equipment-failure';
import { z } from 'zod';

const AnomalySchema = z.object({
  equipmentId: z.string(),
  temperature: z.coerce.number(),
  vibration: z.coerce.number(),
  voltage: z.coerce.number(),
  current: z.coerce.number(),
});

export async function runAnomalyDetection(formData: FormData) {
  const parseResult = AnomalySchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!parseResult.success) {
    return { success: false, error: 'Invalid form data.' };
  }

  const input: DetectAnomalousBehaviorInput = {
    ...parseResult.data,
    timestamp: new Date().toISOString(),
  };

  try {
    const result = await detectAnomalousBehavior(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Anomaly detection failed:', error);
    return { success: false, error: 'AI analysis failed. Please try again.' };
  }
}

export async function runFailurePrediction(equipmentId: string, equipmentData: string) {
    try {
        const result = await predictEquipmentFailure({
            equipmentData: equipmentData,
            historicalData: "Simulated historical data: consistent performance with minor fluctuations until recent spike in temperature and vibration.",
        });
        return { success: true, data: result };
    } catch (error) {
        console.error('Failure prediction failed:', error);
        return { success: false, error: 'AI prediction failed. Please try again.' };
    }
}
