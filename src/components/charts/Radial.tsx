"use client";
import { LabelList, RadialBar, RadialBarChart } from "recharts";
import {
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

interface RadialProps {
  title?: string;
  description?: string;
  data?: Record<string, number>;
}

export function Radial({ title, description, data }: RadialProps) {
  const chartData = Object.entries(data || {}).map(
    ([region, count], index) => ({
      browser: region,
      visitors: count,
      fill: `hsl(var(--chart-${(index % 5) + 1}))`,
    })
  );

  const chartConfig: ChartConfig = {
    visitors: { label: "Students" },
    ...Object.fromEntries(
      chartData.map((entry) => [
        entry.browser,
        { label: entry.browser, color: entry.fill },
      ])
    ),
  };

  return (
    <div className="col-span-1 border rounded-3xl">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title || "Radial Chart"}</CardTitle>
        <CardDescription>{description || "Overview"}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="browser" />}
            />
            <RadialBar dataKey="visitors" background>
              <LabelList
                position="insideStart"
                dataKey="browser"
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing student distribution {title?.toLowerCase() || "region"}
        </div>
      </CardFooter>
    </div>
  );
}
