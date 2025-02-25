import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const WeatherChart: React.FC<WeatherChartProps> = ({ forecastData }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (!ctx) return;

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const labels = forecastData.map((day) => day.date);
      const temperatureMaxData = forecastData.map((day) => day.temperatureMax);
      const temperatureMinData = forecastData.map((day) => day.temperatureMin);
      const windspeedMax = forecastData.map((day) => day.windspeedMax);
      const etoFao = forecastData.map((day) => day.etoFao);
      const shortwaveRadiationSum = forecastData.map(
        (day) => day.shortwaveRadiationSum
      );
      const precipitationSum = forecastData.map((day) => day.precipitationSum);
      const relativeHumidity = forecastData.map((day) => day.relativeHumidity);

      chartInstanceRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              yAxisID: "A",
              label: "Max Temperature",
              data: temperatureMaxData,
              backgroundColor: "rgba(255, 190, 51, 0.5)",
              borderColor: "rgb(255, 190, 51)",
              fill: false,
              type: "line",
            },
            {
              yAxisID: "A",
              label: "Min Temperature",
              data: temperatureMinData,
              backgroundColor: "rgba(0, 124, 37, 0.2)",
              borderColor: "rgb(0, 124, 37)",
              fill: false,
              type: "line",
            },
            {
              yAxisID: "B",
              label: "Precipitation",
              data: precipitationSum,
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgb(54, 162, 235)",
              // fill: false,
              type: "bar",
              barPercentage: 0.5,
              categoryPercentage: 0.7,
            },
            {
              yAxisID: "A",
              label: "Humidity",
              data: relativeHumidity,
              backgroundColor: "rgba(201, 203, 207, 0.5)",
              borderColor: "rgb(201, 203, 207)",
              fill: false,
              type: "line",
            },
            {
              yAxisID: "A",
              label: "Wind Speed",
              data: windspeedMax,
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgb(75, 192, 192)",
              fill: false,
              type: "line",
            },
            {
              yAxisID: "B",
              label: "ETo FAO",
              data: etoFao,
              backgroundColor: "rgba(153, 102, 255, 0.5)",
              borderColor: "rgb(153, 102, 255)",
              // fill: false,
              type: "bar",
              barPercentage: 0.5,
              categoryPercentage: 0.7,
            },
            {
              yAxisID: "A",
              label: "Shortwave Radiation",
              data: shortwaveRadiationSum,
              backgroundColor: "rgba(255, 159, 64, 0.5)",
              borderColor: "rgb(255, 159, 64)",
              fill: false,
              type: "line",
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            A: {
              type: "linear",
              position: "left",
              min: 0,
              max: 60,
              ticks: {
                stepSize: 10,
                callback: (value) => value,
              },
            },
            B: {
              type: "linear",
              position: "right",
              min: 0,
              max: 12,
              ticks: {
                stepSize: 2,
                callback: (value) => value,
              },
            },
            x: {
              display: true,
            },
          },
          plugins: {
            tooltip: {
              displayColors: false,
              position: "nearest",
              callbacks: {
                title: () => "",
                label: (context) => {
                  const hoverData = [];
                  hoverData.push(`Day: ${labels[context.dataIndex]}`);
                  hoverData.push(
                    `Max Temperature: ${
                      temperatureMaxData[context.dataIndex]
                    }°C`
                  );
                  hoverData.push(
                    `Min Temperature: ${
                      temperatureMinData[context.dataIndex]
                    }°C`
                  );
                  hoverData.push(
                    `Rainfall: ${precipitationSum[context.dataIndex]} mm`
                  );
                  hoverData.push(
                    `Humidity: ${relativeHumidity[context.dataIndex]} %`
                  );
                  hoverData.push(
                    `Wind Speed: ${windspeedMax[context.dataIndex]} km/h`
                  );
                  hoverData.push(`ETo FAO: ${etoFao[context.dataIndex]} mm`);
                  hoverData.push(
                    `Shortwave Radiation: ${
                      shortwaveRadiationSum[context.dataIndex]
                    } MJ/m²`
                  );
                  return hoverData;
                },
              },
            },
            legend: {
              display: false,
              position: "bottom",
            },
          },
        },
      });
    }
  }, [forecastData]);

  return <canvas ref={chartRef} id="forecastChart" />;
};

export default WeatherChart;
