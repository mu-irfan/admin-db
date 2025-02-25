import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Flower2,
  Shrub,
  Sprout,
  TreeDeciduous,
  Trees,
  Vegan,
} from "lucide-react";

const PlantDetailsModal = ({ open, onOpenChange, plant }: any) => {
  const getPlantIcon = (type: string) => {
    let icon, tooltipText;

    switch (type.toLowerCase()) {
      case "tree":
        icon = <TreeDeciduous className="text-green-600 inline-block ml-2" />;
        tooltipText = "Tree";
        break;
      case "herb":
        icon = <Vegan className="text-green-500 inline-block ml-2" />;
        tooltipText = "Herb";
        break;
      case "flower":
        icon = <Flower2 className="text-green-500 inline-block ml-2" />;
        tooltipText = "Flower";
        break;
      case "shrub":
        icon = <Shrub className="text-green-500 inline-block ml-2" />;
        tooltipText = "Shrub";
        break;
      case "aquatic plant":
        icon = <Sprout className="text-green-500 inline-block ml-2" />;
        tooltipText = "Aquatic Plant";
        break;
      default:
        icon = <Trees className="text-gray-500 inline-block ml-2" />;
        tooltipText = "Other";
        break;
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>{icon}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80vw] sm:max-w-[425px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="capitalize flex items-center">
            {plant?.plant_name || "Plant Details"}
            {plant?.plant_type && getPlantIcon(plant.plant_type)}
          </DialogTitle>
        </DialogHeader>
        {plant ? (
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Height:</span>{" "}
              {plant.height_of_tree_m
                ? `${plant.height_of_tree_m} meters`
                : "N/A"}
            </div>
            {plant.plant_type === "tree" && (
              <>
                <div>
                  <span className="font-semibold">Lifespan:</span>{" "}
                  {`${plant.min_lifespan_years} - ${plant.max_lifespan_years}` ||
                    "N/A"}{" "}
                  years
                </div>
                <div className="capitalize">
                  <span className="font-semibold">Pollination Period:</span>{" "}
                  {plant.start_pollination_month && plant.end_pollination_month
                    ? `${plant.start_pollination_month} - ${plant.end_pollination_month}`
                    : "N/A"}
                </div>
              </>
            )}
            <div>
              <span className="font-semibold">Precipitation Required:</span>{" "}
              {`${plant.min_precipitation_mm_per_year} - ${plant.max_precipitation_mm_per_year}` ||
                "N/A"}{" "}
              mm/year
            </div>
            {plant.aesthetic_value && (
              <div>
                <span className="font-semibold">Aesthetic Value:</span>{" "}
                {plant.aesthetic_value ? "Yes" : "No"}
              </div>
            )}
            {plant.deter_dengue && (
              <div>
                <span className="font-semibold">Deter Dengue:</span>{" "}
                {plant.deter_dengue ? "Yes" : "No"}
              </div>
            )}
            {plant.fire_resistance && (
              <div>
                <span className="font-semibold">Fire Resistance:</span>{" "}
                {plant.fire_resistance ? "Yes" : "No"}
              </div>
            )}
            {plant.noise_reduction && (
              <div>
                <span className="font-semibold">Noise Reduction:</span>{" "}
                {plant.noise_reduction ? "Yes" : "No"}
              </div>
            )}
            {plant.fog_absorption && (
              <div>
                <span className="font-semibold">Fog Absorption:</span>{" "}
                {plant.fog_absorption && "Yes"}
              </div>
            )}
            {plant.air_pollutant_removal && (
              <div>
                <span className="font-semibold">Air Pollutant Removal:</span>
                {plant.air_pollutant_removal ? (
                  <ul className="list-disc pl-5 grid grid-cols-2 text-sm">
                    {plant.air_pollutant_removal
                      .split(",")
                      .map((value: string, index: number) => (
                        <li key={index} className="capitalize">
                          {value.trim()}
                        </li>
                      ))}
                  </ul>
                ) : (
                  "N/A"
                )}
              </div>
            )}
            {plant.plant_type === "tree" && (
              <>
                <div>
                  <span className="font-semibold">Medicinal Value:</span>
                  {plant.medicinal_value ? (
                    <ul className="list-disc pl-5 text-sm">
                      {plant.medicinal_value
                        .split(",")
                        .map((value: string, index: number) => (
                          <li key={index} className="capitalize">
                            {value.trim()}
                          </li>
                        ))}
                    </ul>
                  ) : (
                    "N/A"
                  )}
                </div>
              </>
            )}
          </div>
        ) : (
          <p>No plant selected.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PlantDetailsModal;
