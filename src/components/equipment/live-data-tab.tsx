'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { generateTimeSeriesData } from '@/lib/data';
import type { Equipment } from '@/lib/types';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

type LiveDataTabProps = {
  equipment: Equipment;
};

export default function LiveDataTab({ equipment }: LiveDataTabProps) {
  const { temperature, vibration, voltage, current } = equipment.sensorData;
  const chartConfig = {
    value: {
      label: 'Value',
    },
  };

  const chartData = {
    temperature: generateTimeSeriesData(temperature, 30, 5),
    vibration: generateTimeSeriesData(vibration, 30, 2),
    voltage: generateTimeSeriesData(voltage, 30, 3),
    current: generateTimeSeriesData(current, 30, 1),
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Temperature</CardTitle>
          <CardDescription>{temperature}°C</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-40 w-full">
            <AreaChart data={chartData.temperature}>
              <defs>
                <linearGradient id="fillTemperature" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-chart-2)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-chart-2)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} fontSize={10} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
              <Area dataKey="value" type="natural" fill="url(#fillTemperature)" stroke="var(--color-chart-2)" />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Vibration</CardTitle>
          <CardDescription>{vibration} m/s²</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-40 w-full">
            <AreaChart data={chartData.vibration}>
              <defs>
                  <linearGradient id="fillVibration" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} fontSize={10} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
              <Area dataKey="value" type="natural" fill="url(#fillVibration)" stroke="var(--color-chart-1)" />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Voltage</CardTitle>
          <CardDescription>{voltage} V</CardDescription>
        </CardHeader>
        <CardContent>
           <ChartContainer config={chartConfig} className="h-40 w-full">
            <AreaChart data={chartData.voltage}>
               <defs>
                  <linearGradient id="fillVoltage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-chart-4)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-chart-4)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} fontSize={10} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
              <Area dataKey="value" type="natural" fill="url(#fillVoltage)" stroke="var(--color-chart-4)" />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Current</CardTitle>
          <CardDescription>{current} A</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-40 w-full">
            <AreaChart data={chartData.current}>
              <defs>
                  <linearGradient id="fillCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-chart-5)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-chart-5)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} fontSize={10} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
              <Area dataKey="value" type="natural" fill="url(#fillCurrent)" stroke="var(--color-chart-5)" />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
