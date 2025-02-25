"use client";

import ContractFarmingTabLayout from "@/components/layout/ContractFarmingTabLayout";
import MyRequestedLands from "@/components/ui/Lands/RequestFarmContract";
import { useContextConsumer } from "@/context/Context";
import { useGetFarmContractHistory } from "@/hooks/apis/useContractFarming";
import { Toaster } from "react-hot-toast";

export default function ContractsHistory() {
  const { token } = useContextConsumer();
  const { data: history } = useGetFarmContractHistory("ddd", token);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ContractFarmingTabLayout>
        <MyRequestedLands
          lands={history?.allContracts || []}
          message="History is clear!"
        />
      </ContractFarmingTabLayout>
    </>
  );
}
