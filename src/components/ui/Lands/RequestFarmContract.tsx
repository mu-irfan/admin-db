import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../card";
import { formatPKRCurrency } from "@/utils/formatPKRCurrency";
import { Button } from "../button";
import { MoveRight } from "lucide-react";
import { useContextConsumer } from "@/context/Context";
import { useCancelContractRequest } from "@/hooks/apis/useContractFarming";

const MyRequestedLands: React.FC<{
  lands: any[];
  message: any;
  requested?: boolean;
}> = ({ lands, message, requested }) => {
  const { token, handleContractDetails } = useContextConsumer();
  const { mutate: cancelContractRequest, isPending: cancelling } =
    useCancelContractRequest(token);

  if (!lands || lands.length === 0) {
    return <h5 className="text-gray-500 text-center block">{message}</h5>;
  }

  return (
    <div className="space-y-4">
      {lands?.map((land: any) => (
        <Card
          key={land.farm_id}
          className="w-[330px] sm:w-[350px] border border-gray-200 bg-white shadow-sm rounded-lg overflow-hidden"
        >
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 py-2 px-4">
            <CardTitle className="text-xl text-white">
              Land ({land.farm.land_name})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2 text-sm">
            {requested && (
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    cancelContractRequest({
                      contractId: land.contract_id,
                      secondaryOwnerId: land.secondary_owner_id,
                    })
                  }
                  className="bg-gray-200 font-medium my-1.5 px-2 py-0.5"
                  disabled={cancelling}
                >
                  {cancelling ? "Cancelling..." : "Cancel Request"}
                </Button>
              </div>
            )}
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Tehsil:</span>
              <span className="text-gray-500">{land.farm.tehsil}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">District:</span>
              <span className="text-gray-500">{land.farm.district}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Province:</span>
              <span className="text-gray-500">{land.farm.province}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">
                Land Size (Acre):
              </span>
              <span className="text-gray-500">
                {land.farm.size_acre.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Asking Price:</span>
              <span className="text-gray-500">
                {formatPKRCurrency(land.estate_asking_price)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Start Date:</span>
              <span className="text-gray-500">{land.start_date}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">End Date:</span>
              <span className="text-gray-500">{land.end_date}</span>
            </div>
          </CardContent>
          <CardFooter className="!px-0">
            <Button
              variant="link"
              className="text-primary hover:text-green-800 font-medium"
              onClick={() => handleContractDetails(land.farm_id)}
            >
              View more Details <MoveRight className="inline pl-1" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default MyRequestedLands;
