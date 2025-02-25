import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { Button } from "../ui/button";

const TemperatureChart: React.FC<TemperatureChartProps> = ({
  data,
  onMonthClick,
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const [currentMonth, setCurrentMonth] = useState<string>("");
  const [monthButtons, setMonthButtons] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");

    if (!ctx) return;
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "Min Temperature",
            data: [],
            borderColor: "rgb(255, 190, 51)",
            backgroundColor: "rgba(255, 190, 51, 0.5)",
            borderWidth: 2,
          },
          {
            label: "Max Temperature",
            data: [],
            borderColor: "green",
            backgroundColor: "rgba(0, 124, 37, 0.2)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.dataset.label}: ${context.raw}°C`;
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              // text: "Date",
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
            },
          },
          y: {
            title: {
              display: true,
              text: "Temperature (°C)",
            },
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const uniqueMonths = Array.from(
      new Set(
        data.map((item) => {
          const [year, month] = item.date.split("-");
          return `${month} ${year}`;
        })
      )
    );

    // Set the initial currentMonth to the first unique month
    if (uniqueMonths.length > 0 && !currentMonth) {
      setCurrentMonth(uniqueMonths[0]);
      onMonthClick(uniqueMonths[0]);
    }

    const buttons = uniqueMonths.map((monthYear) => (
      <Button
        variant={monthYear === currentMonth ? "default" : "outline"}
        size="sm"
        key={monthYear}
        className="rounded-full text-xs"
        onClick={() => {
          setCurrentMonth(monthYear);
          onMonthClick(monthYear);
        }}
      >
        {monthYear}
      </Button>
    ));

    setMonthButtons(buttons);

    const updateChart = (selectedMonth: string) => {
      const [month, year] = selectedMonth.split(" ");
      const monthIndex =
        new Date(Date.parse(month + " 1, 2000")).getMonth() + 1;
      const selectedMonthData = data.filter((item) => {
        const [dataYear, dataMonth] = item.date.split("-");
        return (
          parseInt(dataYear) === parseInt(year) &&
          parseInt(dataMonth) === monthIndex
        );
      });

      const labels = selectedMonthData.map((item) => item.date);
      const minTemperatures = selectedMonthData.map(
        (item) => item.temperatureMin
      );
      const maxTemperatures = selectedMonthData.map(
        (item) => item.temperatureMax
      );

      if (chartInstanceRef.current) {
        chartInstanceRef.current.data.labels = labels;
        chartInstanceRef.current.data.datasets[0].data = minTemperatures;
        chartInstanceRef.current.data.datasets[1].data = maxTemperatures;
        chartInstanceRef.current.update();
      }
    };

    if (currentMonth) {
      updateChart(currentMonth);
    }
  }, [data, currentMonth, onMonthClick]);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
      <div className="mb-4 flex gap-2 flex-wrap mt-8">{monthButtons}</div>
    </div>
  );
};

export default TemperatureChart;
