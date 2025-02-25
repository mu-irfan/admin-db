import { plantImagePath } from "@/utils/path";
import Image from "next/image";

const PlantCard = ({
  plantName,
  plantType,
  onClick,
  isActive,
}: {
  plantName: string;
  plantType: string;
  onClick: () => void;
  isActive: boolean;
}) => {
  return (
    <div
      className={`flex flex-col items-center border border-primary p-4 md:p-2 rounded-lg shadow cursor-pointer ${
        isActive ? "bg-green-200" : "bg-gray-100"
      }`}
      onClick={onClick}
    >
      <Image
        src={`${plantImagePath}${plantName.toLowerCase()}.png`}
        alt={plantName}
        width={40}
        height={40}
        className="h-10 w-10"
      />
      <span className="text-sm font-medium text-gray-700 capitalize">
        {plantName.length > 17 ? `${plantName.slice(0, 15)}...` : plantName}
      </span>
      <span className="text-xs text-gray-500">{plantType}</span>
    </div>
  );
};

export default PlantCard;
