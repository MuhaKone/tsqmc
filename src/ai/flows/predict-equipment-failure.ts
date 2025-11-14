'use server';

/**
 * @fileOverview Predicts potential equipment failures before they occur.
 *
 * - predictEquipmentFailure - A function that predicts potential equipment failures.
 * - PredictEquipmentFailureInput - The input type for the predictEquipmentFailure function.
 * - PredictEquipmentFailureOutput - The return type for the predictEquipmentFailure function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictEquipmentFailureInputSchema = z.object({
  equipmentData: z.string().describe('The equipment data, including temperature, vibration, voltage, current, etc.'),
  historicalData: z.string().describe('Historical data for the equipment.'),
});
export type PredictEquipmentFailureInput = z.infer<typeof PredictEquipmentFailureInputSchema>;

const PredictEquipmentFailureOutputSchema = z.object({
  predictedFailure: z.boolean().describe('Whether or not the equipment is predicted to fail.'),
  failureReason: z.string().describe('The reason for the predicted failure.'),
  estimatedTimeToFailure: z.string().describe('The estimated time to failure.'),
  confidenceLevel: z.number().describe('The confidence level of the prediction (0-1).'),
});
export type PredictEquipmentFailureOutput = z.infer<typeof PredictEquipmentFailureOutputSchema>;

export async function predictEquipmentFailure(input: PredictEquipmentFailureInput): Promise<PredictEquipmentFailureOutput> {
  return predictEquipmentFailureFlow(input);
}

const anomalyDetectionTool = ai.defineTool({
  name: 'detectAnomalies',
  description: 'Detects anomalies in equipment data.',
  inputSchema: z.object({
    equipmentData: z.string().describe('The equipment data to analyze.'),
  }),
  outputSchema: z.string().describe('The anomaly results.'),
}, async (input) => {
  // Placeholder implementation for anomaly detection
  return `Detected anomalies: ${input.equipmentData}`;
});

const failurePredictionTool = ai.defineTool({
  name: 'predictFailure',
  description: 'Predicts equipment failure based on historical and current data.',
  inputSchema: z.object({
    historicalData: z.string().describe('Historical data for the equipment.'),
    anomalyResults: z.string().describe('The anomaly results.'),
  }),
  outputSchema: z.object({
    predictedFailure: z.boolean().describe('Whether or not the equipment is predicted to fail.'),
    failureReason: z.string().describe('The reason for the predicted failure.'),
    estimatedTimeToFailure: z.string().describe('The estimated time to failure.'),
    confidenceLevel: z.number().describe('The confidence level of the prediction (0-1).'),
  }),
}, async (input) => {
  // Placeholder implementation for failure prediction
  return {
    predictedFailure: true,
    failureReason: 'Overheating detected.',
    estimatedTimeToFailure: '24 hours',
    confidenceLevel: 0.8,
  };
});

const prompt = ai.definePrompt({
  name: 'predictEquipmentFailurePrompt',
  input: {schema: PredictEquipmentFailureInputSchema},
  output: {schema: PredictEquipmentFailureOutputSchema},
  tools: [anomalyDetectionTool, failurePredictionTool],
  prompt: `You are an AI assistant specialized in predicting equipment failures.

  First, use the detectAnomalies tool to identify any anomalies in the current equipment data: {{{equipmentData}}}.
  Then, use the predictFailure tool with the historical data: {{{historicalData}}} and anomaly results to predict if the equipment will fail, when it will fail, and why.
  Return the predictedFailure, failureReason, estimatedTimeToFailure, and confidenceLevel from the failurePrediction tool.
`,
});

const predictEquipmentFailureFlow = ai.defineFlow(
  {
    name: 'predictEquipmentFailureFlow',
    inputSchema: PredictEquipmentFailureInputSchema,
    outputSchema: PredictEquipmentFailureOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
