import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../card";
import { MoveRight } from "lucide-react";
import { Button } from "../button";
import { formatPKRCurrency } from "@/utils/formatPKRCurrency";
import { useFarmRequest } from "@/hooks/apis/useContractFarming";
import { useContextConsumer } from "@/context/Context";

const Lands: React.FC<LandsProps> = ({ lands, onSeeMoreDetails }) => {
  const { token } = useContextConsumer();
  const { mutate: sendFarmRequest, isPending } = useFarmRequest();

  const handleRequest = (landId: string) => {
    const payload = {
      farm_id: landId,
      contractor_id: "eceb52c8-55d0-4871-b195-db35ec981876",
      start_date: "2025-03-01",
      end_date: "2025-09-01",
    };
    sendFarmRequest({ data: { payload }, token });
  };

  return (
    <div className="space-y-4">
      {lands &&
        lands.length > 0 &&
        lands?.map((land: any) => {
          const isContractFarming = land.estate === "sell";
          const landDetails = {
            "Land Type": isContractFarming ? "Contract Farming" : "Sell",
            Tehsil: land.tehsil,
            District: land.district,
            Province: land.province,
            "Land Size (Acre)": land.size_acre.toFixed(2),
            "Asking Price (PKR)": formatPKRCurrency(land.estate_asking_price),
          };

          return (
            <Card
              key={land.uid}
              className="w-[330px] sm:w-[350px] border border-gray-200 bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 py-2 px-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl text-white">
                    Land Detail
                  </CardTitle>
                  <span
                    className={`px-2 py-0.5 text-sm font-medium rounded-md ${
                      isContractFarming
                        ? "bg-green-800 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {landDetails["Land Type"]}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                {isContractFarming && (
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRequest(land.uid)}
                      className="bg-gray-200 font-medium my-1.5 px-2 py-0.5"
                      disabled={isPending}
                    >
                      {isPending ? "Wait..." : "Request"}
                    </Button>
                  </div>
                )}
                {Object.entries(landDetails).map(([key, value]) =>
                  key !== "Land Type" ? (
                    <div key={key} className="flex justify-between">
                      <span className="font-semibold text-gray-700">
                        {key}:
                      </span>
                      <span className="text-gray-500">{value}</span>
                    </div>
                  ) : null
                )}
              </CardContent>
              <CardFooter className="bg-gray-50 px-4 pb-4 md:pb-5">
                <Button
                  variant="link"
                  onClick={() => onSeeMoreDetails(land.uid)}
                  className="text-primary hover:text-green-800 font-medium"
                >
                  View more Details <MoveRight className="inline pl-1" />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
    </div>
  );
};

export default Lands;
