"use client";

import * as React from "react";
import { Pie, PieChart, Label } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

interface Props {
  genderStats?: Record<string, number>;
}

export function Component({ genderStats }: Props) {
  const chartData = React.useMemo(() => {
    if (!genderStats) return [];

    const colors: Record<string, string> = {
      male: "hsl(var(--chart-1))",
      female: "hsl(var(--chart-2))",
      unknown: "hsl(var(--chart-3))",
    };

    return Object.entries(genderStats).map(([gender, count]) => ({
      browser: gender,
      visitors: count,
      fill: colors[gender.toLowerCase()] || "hsl(var(--muted-foreground))",
    }));
  }, [genderStats]);

  const chartConfig: ChartConfig = {
    visitors: { label: "Students" },
    ...Object.fromEntries(
      chartData.map(({ browser }) => [
        browser,
        {
          label: browser,
          color: chartData.find((d) => d.browser === browser)?.fill ?? "#ccc",
        },
      ])
    ),
  };

  const total = chartData.reduce((acc, curr) => acc + curr.visitors, 0);

  return (
    <div className="col-span-1 border rounded-3xl">
      <CardHeader className="items-center pb-0">
        <CardTitle>Gender Distribution</CardTitle>
        <CardDescription>Stats of Students by Gender</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          Students
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total students by gender
        </div>
      </CardFooter>
    </div>
  );
}
