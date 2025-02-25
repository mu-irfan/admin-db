import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface RainfallChartProps {
  rainfallData: {
    month: string;
    precipitationCount: number;
    precipitationSum: number;
  }[];
}

const RainfallChart: React.FC<RainfallChartProps> = ({ rainfallData }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const labels = rainfallData.map((data) => data.month);
    const precipitationCount = rainfallData.map(
      (data) => data.precipitationCount
    );
    const precipitationSum = rainfallData.map((data) => data.precipitationSum);

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Rainfall Frequency",
            data: precipitationCount,
            backgroundColor: "rgba(255, 190, 51, 0.5)",
            borderColor: "rgb(255, 190, 51)",
            borderWidth: 1,
          },
          {
            label: "Average Rainfall",
            data: precipitationSum,
            backgroundColor: "rgba(0, 124, 37, 0.5)",
            borderColor: "rgb(0, 124, 37)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + " mm";
              },
            },
          },
        },
        plugins: {
          tooltip: {
            displayColors: false,
            position: "nearest",
            callbacks: {
              title: function () {
                return "";
              },
              label: function (context) {
                return `Month: ${labels[context.dataIndex]}, Value: ${
                  context.parsed.y
                } mm`;
              },
            },
          },
          legend: {
            display: true,
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [rainfallData]);

  return <canvas ref={canvasRef}></canvas>;
};

export default RainfallChart;
