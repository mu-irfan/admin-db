import React from "react";
import { useContextConsumer } from "@/context/Context";
import dynamic from "next/dynamic";
import { formatPKRCurrency } from "@/utils/formatPKRCurrency";
import { Dialog, DialogContent } from "../../dialog";
import DetailItem from "../LandDetail/DetailItem";

const MapComponent = dynamic(() => import("@/components/LeafLetMap/Map"), {
  ssr: false,
});

const LandDetailsModal = () => {
  const { showContractDetails, setshowContractDetails, landContract } =
    useContextConsumer();

  console.log(landContract, "landocntracts");

  if (!landContract) return null;

  return (
    <Dialog open={showContractDetails} onOpenChange={setshowContractDetails}>
      <DialogContent className="max-w-lg rounded-lg scrollbar-custom">
        <h2 className="text-2xl font-bold text-primary">Land Details</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-primary">Basic Details</h3>
            <DetailItem label="Land Name" value={landContract.land_name} />
            <DetailItem
              label="Size (Acre)"
              value={landContract.size_acre.toFixed(2)}
            />
            <DetailItem label="Tehsil" value={landContract.tehsil} />
            <DetailItem label="District" value={landContract.district} />
            <DetailItem label="Province" value={landContract.province} />
            <DetailItem label="Region" value={landContract.region} />
            <DetailItem label="Soil Type" value={landContract.soiltype} />
            <DetailItem
              label="Price"
              value={
                landContract.estate_asking_price
                  ? formatPKRCurrency(landContract.estate_asking_price)
                  : "Not Available"
              }
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary">Owner Details</h3>
            <DetailItem
              label="Owner Name"
              value={landContract.user?.full_name || "Not Available"}
            />
            <DetailItem
              label="Phone"
              value={landContract.user?.phone || "Not Available"}
            />
          </div>

          <div>
            <h3 className="text-lg font-bold text-primary">Facilities</h3>
            <DetailItem
              label="Road Access"
              value={landContract.road_access ? "Yes" : "No"}
            />
            <DetailItem
              label="Electricity"
              value={landContract.electricity ? "Yes" : "No"}
            />
            <DetailItem
              label="Tubewell"
              value={landContract.tubewell ? "Yes" : "No"}
            />
            <DetailItem label="Well" value={landContract.well ? "Yes" : "No"} />
            <DetailItem
              label="Canal Access"
              value={landContract.canal ? "Yes" : "No"}
            />
            <DetailItem
              label="Cultivated"
              value={landContract.cultivated ? "Yes" : "No"}
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary">Location</h3>
            {landContract.location && (
              <MapComponent
                lands={[
                  {
                    uid: landContract.uid,
                    location: [
                      landContract.location[1],
                      landContract.location[0],
                    ],
                  },
                ]}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LandDetailsModal;
