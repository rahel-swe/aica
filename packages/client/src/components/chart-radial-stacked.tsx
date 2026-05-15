'use client';

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export const title = 'A radial chart with stacked sections';

const chartConfig = {
  pending: {
    label: 'Not Started',
    color: 'oklch(70.2% 0.183 293.541)',
  },
  in_progress: {
    label: 'In Progress',
    color: 'oklch(82.8% 0.111 230.318)',
  },
  completed: {
    label: 'Completed',
    color: 'oklch(90.5% 0.182 98.111)',
  },
} satisfies ChartConfig;

const ChartRadialStacked = ({
  title,
  description,
  chartData,
}: {
  title: string;
  description: string;
  chartData: {
    pending: number;
    in_progress: number;
    completed: number;
  }[];
}) => (
  <div className="max-w-sm max-h-40 flex items-center justify-center pt-20">
    <ChartContainer
      className="mx-auto aspect-square w-full"
      config={chartConfig}
    >
      <RadialBarChart
        data={chartData}
        endAngle={180}
        innerRadius={80}
        outerRadius={130}
      >
        <ChartTooltip
          content={<ChartTooltipContent hideLabel />}
          cursor={false}
        />

        <PolarRadiusAxis axisLine={false} tick={false} tickLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text textAnchor="middle" x={viewBox.cx} y={viewBox.cy}>
                    <tspan
                      className="fill-foreground text-2xl font-bold"
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 16}
                    >
                      {title}
                    </tspan>

                    <tspan
                      className="fill-muted-foreground"
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 4}
                    >
                      {description}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>

        <RadialBar
          className="stroke-transparent stroke-2"
          cornerRadius={5}
          dataKey="pending"
          fill="var(--color-violet-400)"
          stackId="e"
        />

        <RadialBar
          className="stroke-transparent stroke-2"
          cornerRadius={5}
          dataKey="in_progress"
          fill="var(--color-sky-300)"
          stackId="g"
        />

        <RadialBar
          className="stroke-transparent stroke-2"
          cornerRadius={5}
          dataKey="completed"
          fill="var(--color-yellow-300)"
          stackId="a"
        />
      </RadialBarChart>
    </ChartContainer>
  </div>
);

export default ChartRadialStacked;
