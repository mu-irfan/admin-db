"use client";

import ContractFarmingTabLayout from "@/components/layout/ContractFarmingTabLayout";
import MyRequestedLands from "@/components/ui/Lands/RequestFarmContract";
import { useContextConsumer } from "@/context/Context";
import { useGetRequestFarmContract } from "@/hooks/apis/useContractFarming";
import { Toaster } from "react-hot-toast";

export default function RequestedContract() {
  const { token } = useContextConsumer();
  const { data: requestedLands } = useGetRequestFarmContract(token);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ContractFarmingTabLayout>
        <MyRequestedLands
          lands={requestedLands?.requestedContracts || []}
          message="No Requested Land Found!"
          requested
        />
      </ContractFarmingTabLayout>
    </>
  );
}
