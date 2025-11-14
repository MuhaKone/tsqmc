'use server';
/**
 * @fileOverview Detects anomalies in equipment behavior in real-time using AI.
 *
 * - detectAnomalousBehavior - A function that handles the detection of anomalous behavior.
 * - DetectAnomalousBehaviorInput - The input type for the detectAnomalousBehavior function.
 * - DetectAnomalousBehaviorOutput - The return type for the detectAnomalousBehavior function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectAnomalousBehaviorInputSchema = z.object({
  equipmentId: z.string().describe('The ID of the equipment being monitored.'),
  timestamp: z.string().describe('The timestamp of the sensor reading (ISO format).'),
  temperature: z.number().describe('The temperature reading from the equipment.'),
  vibration: z.number().describe('The vibration reading from the equipment.'),
  voltage: z.number().describe('The voltage reading from the equipment.'),
  current: z.number().describe('The current reading from the equipment.'),
});
export type DetectAnomalousBehaviorInput = z.infer<typeof DetectAnomalousBehaviorInputSchema>;

const AnomalyExplanationSchema = z.object({
  reason: z.string().describe('Reasoning behind the anomaly detection.'),
  suggestedAction: z.string().describe('A suggested action to resolve the anomaly.'),
});

const DetectAnomalousBehaviorOutputSchema = z.object({
  isAnomalous: z.boolean().describe('Whether or not the equipment behavior is anomalous.'),
  anomalyExplanation: AnomalyExplanationSchema.optional().describe('Explanation of the anomaly if present.'),
});

export type DetectAnomalousBehaviorOutput = z.infer<typeof DetectAnomalousBehaviorOutputSchema>;

export async function detectAnomalousBehavior(input: DetectAnomalousBehaviorInput): Promise<DetectAnomalousBehaviorOutput> {
  return detectAnomalousBehaviorFlow(input);
}

const analyzeSensorData = ai.defineTool({
  name: 'analyzeSensorData',
  description: 'Analyzes sensor data to detect anomalies in equipment behavior.',
  inputSchema: DetectAnomalousBehaviorInputSchema,
  outputSchema: z.object({
    isAnomalous: z.boolean().describe('Whether the sensor data indicates an anomaly.'),
    reason: z.string().optional().describe('The reason for the anomaly, if any.'),
    suggestedAction: z.string().optional().describe('Suggested action to address the anomaly, if any.'),
  }),
}, async (input) => {
  // Simulate anomaly detection logic (replace with actual implementation)
  // In a real-world scenario, this would involve comparing the input data
  // against historical data, statistical models, or machine learning models
  // to identify deviations from normal behavior.
  if (input.temperature > 100 || input.vibration > 50 || input.voltage < 200) {
    return {
      isAnomalous: true,
      reason: `Abnormal sensor readings detected. Temperature: ${input.temperature}, Vibration: ${input.vibration}, Voltage: ${input.voltage}.`,
      suggestedAction: 'Inspect equipment for overheating, mechanical issues, or power supply problems.',
    };
  }
  return {
    isAnomalous: false,
  };
});

const prompt = ai.definePrompt({
  name: 'detectAnomalousBehaviorPrompt',
  input: {schema: DetectAnomalousBehaviorInputSchema},
  output: {schema: DetectAnomalousBehaviorOutputSchema},
  tools: [analyzeSensorData],
  prompt: `You are an AI assistant that analyzes equipment sensor data to detect anomalies.

  Based on the sensor readings (temperature, vibration, voltage, current) from the equipment with ID {{equipmentId}} at timestamp {{timestamp}}, determine if the equipment behavior is anomalous.

  Use the analyzeSensorData tool to analyze the sensor data and determine if there is an anomaly.  Return isAnomalous=true if there is an anomaly, and isAnomalous=false if not.

  If an anomaly is detected, provide a clear explanation of the anomaly and a suggested action to resolve it, and populate anomalyExplanation object accordingly.
  If no anomaly is detected, return isAnomalous=false and leave the anomalyExplanation object empty.

  Input data:
  - Equipment ID: {{equipmentId}}
  - Timestamp: {{timestamp}}
  - Temperature: {{temperature}}
  - Vibration: {{vibration}}
  - Voltage: {{voltage}}
  - Current: {{current}}

  Output format: JSON
  `,
});

const detectAnomalousBehaviorFlow = ai.defineFlow(
  {
    name: 'detectAnomalousBehaviorFlow',
    inputSchema: DetectAnomalousBehaviorInputSchema,
    outputSchema: DetectAnomalousBehaviorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
