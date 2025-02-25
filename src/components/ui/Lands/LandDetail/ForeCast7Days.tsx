import React from "react";

const ForeCast7Days = () => {
  return (
    <div className="space-y-1 py-4">
      <div className="flex items-center gap-2">
        <div className="w-5 h-2 bg-green-700 rounded"></div>
        <p className="text-sm">Min Temperature (°C):</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-5 h-2 bg-yellow-400 rounded"></div>
        <p className="text-sm">Max Temperature (°C):</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-5 h-2 bg-blue-500 rounded"></div>
        <p className="text-sm">Average Rainfall (mm):</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-5 h-2 bg-gray-400 rounded"></div>
        <p className="text-sm">Humidity (%):</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-5 h-2 bg-teal-400 rounded"></div>
        <p className="text-sm">Wind Speed (kmh):</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-5 h-2 bg-purple-500 rounded"></div>
        <p className="text-sm">Eto Fao (mm): </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-5 h-2 bg-orange-400 rounded"></div>
        <p className="text-sm">SW Radiation (W/m²):</p>
      </div>
    </div>
  );
};

export default ForeCast7Days;
