"use client";

import ContractFarmingTabLayout from "@/components/layout/ContractFarmingTabLayout";
import LandDetailsModal from "@/components/ui/Lands/ContractDetails/ContractDetails";
import MyRequestedLands from "@/components/ui/Lands/RequestFarmContract";
import { useContextConsumer } from "@/context/Context";
import { useGetRejectedLands } from "@/hooks/apis/useContractFarming";
import { Toaster } from "react-hot-toast";

export default function RequestedContract() {
  const { token } = useContextConsumer();
  const { data: rejectedLands } = useGetRejectedLands(token);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ContractFarmingTabLayout>
        <MyRequestedLands
          lands={rejectedLands?.rejectedContracts || []}
          message="No Contract Found!"
        />
      </ContractFarmingTabLayout>
      <LandDetailsModal />
    </>
  );
}
