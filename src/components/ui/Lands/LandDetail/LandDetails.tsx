import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../card";
import DetailItem from "./DetailItem";
import CropCard from "./CropCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatPKRCurrency } from "@/utils/formatPKRCurrency";
import WeatherChart from "@/components/Charts/WeatherChart";
import ForeCast7Days from "./ForeCast7Days";
import RainfallChart from "@/components/Charts/RainfallChart";
import TemperatureChart from "@/components/Charts/TemperatureChart";
import PlantDetailsModal from "./PlantModal";
import PlantCard from "./PlantCard";

const LandDetails = ({ details }: any) => {
  const [selectedCrop, setSelectedCrop] = useState<any>(null);
  const [selectedPlant, setSelectedPlant] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>("all");

  const {
    Land_details,
    Crops_details,
    Mandi_details,
    Soil_details,
    Facilities_details,
    Weather_details,
    Plants_and_trees_details,
  } = details.data;

  const handleCropClick = (cropName: string) => {
    const cropInfo = Crops_details?.suitable_crops.find(
      (crop: any) => crop.crop === cropName
    );

    setSelectedCrop(cropInfo);
  };

  const handlePlantClick = (plantName: string) => {
    const plantInfo = Plants_and_trees_details?.suitable_plants_and_trees.find(
      (plant: any) => plant.plant_name === plantName
    );

    setSelectedPlant(plantInfo);
    setIsModalOpen(true);
  };

  const filteredPlants =
    selectedType === "all"
      ? Plants_and_trees_details?.suitable_plants_and_trees
      : Plants_and_trees_details?.suitable_plants_and_trees.filter(
          (plant: any) => plant.plant_type === selectedType
        );

  const plantTypes: string[] = Array.from(
    new Set(
      Plants_and_trees_details?.suitable_plants_and_trees.map(
        (plant: any) => plant.plant_type
      )
    )
  );

  // Weather details
  const forecastData =
    Weather_details?.forecast_next_7_days?.map((day: any) => ({
      date: day.date,
      temperatureMax: parseFloat(day.temperature_2m_max),
      temperatureMin: parseFloat(day.temperature_2m_min),
      windspeedMax: parseFloat(day.windspeed_10m_max),
      etoFao: parseFloat(day.eto_fao),
      shortwaveRadiationSum: parseFloat(day.shortwave_radiation_sum),
      precipitationSum: parseFloat(day.precipitation_sum),
      relativeHumidity: parseInt(day.relativehumidity_2m),
    })) || [];

  // Rainfall details
  const rainfallData =
    Weather_details?.precipitaion_report_last_12_months?.map((month: any) => ({
      month: month.month,
      precipitationCount: parseFloat(month.precipitation_count),
      precipitationSum: parseFloat(month.precipitation_sum),
    })) || [];

  // Temperature details
  const weatherReportForCharts =
    Weather_details?.weather_report_last_12_months.map((month: any) => ({
      date: month.date,
      temperatureMax: parseFloat(month.temperature_2m_max),
      temperatureMin: parseFloat(month.temperature_2m_min),
    })) || [];

  const handleMonthClick = (monthYear: string) => {
    const [month, year] = monthYear.split(" ");
    const monthIndex = new Date(Date.parse(month + " 1, 2000")).getMonth() + 1;
    const filteredData = weatherReportForCharts.filter((monthData: any) => {
      const [dataYear, dataMonth] = monthData.date.split("-");
      return (
        parseInt(dataYear) === parseInt(year) &&
        parseInt(dataMonth) === monthIndex
      );
    });
  };

  return (
    <>
      <Card className="w-[335px] sm:w-[450px] border border-gray-200 bg-white shadow-lg rounded-lg overflow-y-auto h-full scrollbar-custom">
        <CardHeader className="bg-gradient-to-r from-green-700 to-green-400 py-2 px-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl text-white">Land Detail</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-6 md:pb-20">
          <div>
            <h3 className="text-lg font-bold text-primary">Basic Details</h3>
            <div className="space-y-1">
              <DetailItem
                label="Land Size (Acre)"
                value={
                  Land_details?.land_size
                    ? (
                        Math.round(Land_details.land_size * 100) / 100
                      ).toString()
                    : "No record found"
                }
              />
              <DetailItem
                label="Asking Price (PKR)"
                value={
                  Land_details?.market_value
                    ? formatPKRCurrency(Land_details.market_value)
                    : "No record found"
                }
              />
              <DetailItem
                label="Tehsil"
                value={Land_details?.tehsil || "No record found"}
              />
              <DetailItem
                label="District"
                value={Land_details?.district || "No record found"}
              />
              <DetailItem
                label="Province"
                value={Land_details?.province || "No record found"}
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary">Mandi Details</h3>
            <DetailItem
              label="Nearest Mandi"
              value={Mandi_details?.nearest_mandi || "No record found"}
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary">Owner Details</h3>
            <DetailItem
              label="Owner Name"
              value={Land_details?.owner_name || "No record found"}
            />
            <DetailItem
              label="Owner Contact"
              value={Land_details?.owner_contact || "No record found"}
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary">Soil Details</h3>
            <DetailItem
              label="Soil Texture"
              value={Soil_details?.soil_type || "No record found"}
            />
            <DetailItem
              label="Zone"
              value={Soil_details?.region || "No record found"}
            />
            <DetailItem
              label="Fertility Status"
              value={Soil_details?.fertility_index || "No record found"}
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary">Land Features</h3>
            <DetailItem
              label="Irrigation Sources"
              value={
                Array.isArray(Facilities_details?.irrigation_source) &&
                Facilities_details.irrigation_source.length
                  ? Facilities_details.irrigation_source.join(", ")
                  : "No Irrigation Sources Available"
              }
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary">Crop Details</h3>
            <DetailItem
              label="Currently Standing Crops"
              value={
                Crops_details?.currently_standing_crops?.cropName ||
                "No Standing Crops Available"
              }
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary">Suitable Crops</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-2">
              {Crops_details?.suitable_crops.map((crop: any, index: number) => (
                <CropCard
                  key={index}
                  cropName={crop.crop}
                  onClick={() => handleCropClick(crop.crop)}
                  isActive={selectedCrop?.crop === crop.crop}
                />
              ))}
            </div>

            <div className="py-6">
              <p className="text-lg font-bold text-primary">
                Suitable Crop Detail:
              </p>
              <p>
                <strong>Crop:</strong> {selectedCrop?.crop || "Not Available"}
              </p>
              <p>
                <strong>Region:</strong>{" "}
                {selectedCrop?.region || "Not Available"}
              </p>
              <p>
                <strong>Potential Yield: </strong>
                {`${selectedCrop?.yield_kg_per_hectare} KG Per Hectare` ||
                  "Not Available"}
              </p>
            </div>
            <div className="py-6">
              <p className="text-lg font-bold text-primary">
                Suitable Crop Detail:
              </p>
              <p>
                <strong>Crop:</strong> {selectedCrop?.crop || "Not Available"}
              </p>
              <p>
                <strong>Region:</strong>{" "}
                {selectedCrop?.region || "Not Available"}
              </p>
              <p>
                <strong>Potential Yield: </strong>
                {`${selectedCrop?.yield_kg_per_hectare} Kg/Hectare` ||
                  "Not Available"}
              </p>
            </div>
            <div className="py-6">
              <p>
                <strong>Best Time:</strong>
                {selectedCrop?.best_time || "Not Available"}
              </p>
              <p>
                <strong>Max Price:</strong>{" "}
                {selectedCrop?.max || "Not Available"}
              </p>
              <p>
                <strong>Min Price:</strong>{" "}
                {selectedCrop?.min || "Not Available"}
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary pb-2">
              Suitable Plants and Trees
            </h3>
            <span className="text-sm font-semibold text-primary">
              Select Type
            </span>
            <div className="flex space-x-4 pb-4">
              <Select
                value={selectedType}
                onValueChange={(value) => setSelectedType(value)}
              >
                <SelectTrigger className="w-full py-4 md:py-6 border-primary">
                  <SelectValue placeholder="Select Plant Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select Plant Type</SelectLabel>
                    <SelectItem value="all">All</SelectItem>
                    {plantTypes.map((type, idx) => (
                      <SelectItem key={idx} value={type} className="capitalize">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-2">
              {filteredPlants.map((plant: any, index: number) => (
                <PlantCard
                  key={index}
                  plantName={plant.plant_name}
                  plantType={plant.plant_type}
                  onClick={() => handlePlantClick(plant.plant_name)}
                  isActive={selectedPlant?.plant_name === plant.plant_name}
                />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary">Weather Details</h3>
            <h4 className="text-md font-semibold">Forecast Next 7 Days</h4>
            <ForeCast7Days />
            <WeatherChart forecastData={forecastData} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary pt-3">
              Rainfall Report
            </h3>
            {Weather_details &&
              Weather_details.precipitaion_report_last_12_months && (
                <RainfallChart rainfallData={rainfallData} />
              )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary pt-3">
              Temperature Report
            </h3>
            <TemperatureChart
              data={weatherReportForCharts}
              onMonthClick={handleMonthClick}
            />
          </div>
        </CardContent>
      </Card>
      <PlantDetailsModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        plant={selectedPlant}
      />
    </>
  );
};

export default LandDetails;
