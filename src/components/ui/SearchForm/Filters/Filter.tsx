import React, { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  cropsFilteringOptions,
  facilitiesFilterOptions,
  landTypeFilterOptions,
  pricesFilteringOptions,
} from "@/constant/data";
import { Button } from "../../button";
import { Label } from "../../label";
import FacilitiesFilterOption from "./FacilitiesFilterCheckbox";
import { RadioGroup, RadioGroupItem } from "../../radio-group";
import { Slider } from "../../slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../dialog";
import { useContextConsumer } from "@/context/Context";

// State shape for all filters
const initialFilterState = {
  facilities: [] as string[],
  landType: [] as string[],
  landStatus: [] as string[],
  crop: "",
  price: "",
  landSize: [],
};

const FilterModal = ({ open, onOpenChange }: any) => {
  const { handleFilterLands } = useContextConsumer();
  const [filters, setFilters] = useState(initialFilterState);
  const [cropFilterOpen, setCropFilterOpen] = useState(false);
  const [cropPriceOpen, setCropPriceOpen] = useState(false);

  const updateFilter = (key: keyof typeof initialFilterState, value: any) => {
    if (key === "landStatus" && typeof value === "string") {
      setFilters((prev) => ({ ...prev, [key]: [value] }));
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleApplyFilters = () => {
    handleFilterLands(filters);
    onOpenChange((prev: any) => !prev);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80vw] sm:max-w-[425px] rounded-lg h-[90vh] lg:h-[95vh] overflow-y-auto scrollbar-custom">
        <DialogHeader>
          <DialogTitle>Apply Filters</DialogTitle>
          <DialogDescription>
            Apply filters to narrow down your search results.
          </DialogDescription>
        </DialogHeader>

        <Label htmlFor="facilities" className="md:text-base">
          Facilities:
        </Label>
        <div className="grid grid-cols-2 gap-y-3 md:grid-cols-3">
          {facilitiesFilterOptions.map((option) => (
            <FacilitiesFilterOption
              key={option.id}
              id={option.id}
              label={option.label}
              isChecked={filters.facilities.includes(option.id)}
              onChange={(id, isChecked) =>
                updateFilter(
                  "facilities",
                  isChecked
                    ? [...filters.facilities, id]
                    : filters.facilities.filter(
                        (facilityId) => facilityId !== id
                      )
                )
              }
            />
          ))}
        </div>

        <Label htmlFor="landType" className="md:text-base">
          Land Type:
        </Label>
        <div className="grid grid-cols-2 gap-y-3 md:grid-cols-3">
          {landTypeFilterOptions.map((option) => (
            <FacilitiesFilterOption
              key={option.id}
              id={option.id}
              label={option.label}
              isChecked={filters.landType.includes(option.id)}
              onChange={(id, isChecked) =>
                updateFilter(
                  "landType",
                  isChecked
                    ? [...filters.landType, id]
                    : filters.landType.filter((landTypeId) => landTypeId !== id)
                )
              }
            />
          ))}
        </div>

        <Label htmlFor="landStatus" className="md:text-base">
          Land Status:
        </Label>
        <RadioGroup
          value={filters.landStatus[0]}
          className="flex items-center gap-4 md:gap-6"
          onValueChange={(value) => updateFilter("landStatus", value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sell" id="r1" />
            <Label htmlFor="r1">Sell</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lease" id="r2" />
            <Label htmlFor="r2">Lease</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="both" id="r3" />
            <Label htmlFor="r3">Both</Label>
          </div>
        </RadioGroup>

        <Label htmlFor="crop" className="md:text-base">
          Crops:
        </Label>
        <Popover open={cropFilterOpen} onOpenChange={setCropFilterOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={cropFilterOpen}
              className="flex-1 min-w-[200px] justify-between p-3 py-[22px] rounded-xl border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {filters.crop
                ? cropsFilteringOptions.find(
                    (item) => item.value === filters.crop
                  )?.label
                : `Search & Select Crop...`}
              <ChevronDown
                className={cn(
                  "ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform duration-200",
                  cropFilterOpen && "rotate-180"
                )}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="max-w-2xl lg:w-96 p-0 rounded-xl">
            <Command className="rounded-xl">
              <CommandInput placeholder="Search Crop..." />
              <CommandList>
                <CommandEmpty>No crops found.</CommandEmpty>
                <CommandGroup>
                  {cropsFilteringOptions.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={(currentValue) => {
                        updateFilter(
                          "crop",
                          currentValue === filters.crop ? "" : currentValue
                        );
                        setCropFilterOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          filters.crop === item.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Label htmlFor="prices" className="md:text-base">
          Prices:
        </Label>
        <Popover open={cropPriceOpen} onOpenChange={setCropPriceOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={cropPriceOpen}
              className="flex-1 min-w-[200px] justify-between p-3 py-[22px] rounded-xl border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {filters.price
                ? pricesFilteringOptions.find(
                    (item) => item.value === filters.price
                  )?.label
                : `Search & Select Price...`}
              <ChevronDown
                className={cn(
                  "ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform duration-200",
                  cropPriceOpen && "rotate-180"
                )}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="max-w-2xl lg:w-96 p-0 rounded-xl">
            <Command className="rounded-xl">
              <CommandInput placeholder="Search Price..." />
              <CommandList>
                <CommandEmpty>No prices found.</CommandEmpty>
                <CommandGroup>
                  {pricesFilteringOptions.map((item: any) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={(currentValue) => {
                        updateFilter(
                          "price",
                          currentValue === filters.price ? "" : currentValue
                        );
                        setCropPriceOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          filters.price === item.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Label htmlFor="landSize">
          Land Size (ACRE) - {filters.landSize} | Min-0 - Max-240
        </Label>
        <Slider
          value={[parseInt(filters.landSize[0], 10)]}
          max={240}
          step={1}
          className="w-full"
          onValueChange={(value) =>
            updateFilter("landSize", [`${value}-${240}`])
          }
        />

        <DialogFooter>
          <Button
            type="button"
            onClick={handleApplyFilters}
            className="mt-4 sm:mt-0"
          >
            Apply
          </Button>
          <Button
            variant="destructive"
            type="button"
            onClick={() => setFilters(initialFilterState)}
          >
            Reset
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;
