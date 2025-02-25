import { Checkbox } from "../../checkbox";
import { Label } from "../../label";

const FacilitiesFilterOption = ({
  id,
  label,
  onChange,
  isChecked,
}: FacilitiesFilterOptionProps) => {
  return (
    <div className="flex items-center">
      <div
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl ${
          isChecked ? "bg-green-500" : ""
        }`}
      >
        <Checkbox
          id={id}
          checked={isChecked}
          onCheckedChange={(checked) => onChange(id, checked as boolean)}
        />
        <Label
          htmlFor={id}
          className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </Label>
      </div>
    </div>
  );
};

export default FacilitiesFilterOption;
