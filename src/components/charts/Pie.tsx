"use client";

import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { TrendingUp } from "lucide-react";

interface PieChartsProps {
  title: string;
  description: string;
  data?: Record<string, number>;
}

export function PieCharts({ title, description, data }: PieChartsProps) {
  const chartData = Object.entries(data || {}).map(([key, value], index) => ({
    browser: key,
    visitors: value,
    fill: `hsl(var(--chart-${(index % 5) + 1}))`,
  }));

  const chartConfig = {
    visitors: { label: "Admins" },
    ...Object.fromEntries(
      chartData.map((d) => [d.browser, { label: d.browser, color: d.fill }])
    ),
  };

  return (
    <div className="flex flex-col border rounded-3xl">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" label nameKey="browser" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Updated recently <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </div>
  );
}
