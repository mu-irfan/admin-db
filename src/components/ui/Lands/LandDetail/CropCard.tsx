import { imagePath } from "@/utils/path";
import Image from "next/image";

const CropCard = ({
  cropName,
  onClick,
  isActive,
}: {
  cropName: string;
  onClick: () => void;
  isActive: boolean;
}) => (
  <div
    className={`flex flex-col items-center border border-primary p-4 md:p-2 rounded-lg shadow cursor-pointer ${
      isActive ? "bg-green-200" : "bg-gray-100"
    }`}
    onClick={onClick}
  >
    <Image
      width={40}
      height={40}
      src={`${imagePath}${cropName}.png`}
      alt={cropName}
      className="h-10 w-10"
    />
    <span className="text-sm font-medium">
      {cropName?.length > 17 ? `${cropName?.slice(0, 15)}...` : cropName}
    </span>
  </div>
);

export default CropCard;
