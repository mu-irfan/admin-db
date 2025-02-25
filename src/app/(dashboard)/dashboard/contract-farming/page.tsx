"use client";
import ContractFarmingTabLayout from "@/components/layout/ContractFarmingTabLayout";
import MyRequestedLands from "@/components/ui/Lands/RequestFarmContract";
import { useContextConsumer } from "@/context/Context";
import { useGetActiveLands } from "@/hooks/apis/useContractFarming";

export default function ActiveLands() {
  const { token } = useContextConsumer();
  const { data: activeLands } = useGetActiveLands(token);

  return (
    <ContractFarmingTabLayout>
      <MyRequestedLands
        lands={activeLands?.activeContracts || []}
        message="No Active Land Available!"
      />
    </ContractFarmingTabLayout>
  );
}
