import {
  cancelContract,
  getActiveLands,
  getFarmContractHistory,
  getFarmContractLandDetails,
  getRejectedContracts,
  getRequestFarmContract,
  requestFarmContract,
} from "@/api/contract-farming";
import {
  useMutation,
  useQuery,
  UseQueryOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useFarmRequest = () => {
  return useMutation({
    mutationFn: ({ data, token }: { data: any; token: string }) =>
      requestFarmContract(data, token),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export const useGetRequestFarmContract = (token: string) => {
  return useQuery<any, Error>({
    queryKey: ["allRequestedFarmContracts", token],
    queryFn: () => getRequestFarmContract(token),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
    staleTime: 60000,
    refetchOnWindowFocus: false,
  } as UseQueryOptions);
};

export const useGetActiveLands = (token: string) => {
  return useQuery<any, Error>({
    queryKey: ["allActiveLands", token],
    queryFn: () => getActiveLands(token),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
    staleTime: 60000,
    refetchOnWindowFocus: false,
  } as UseQueryOptions);
};

export const useGetFarmContractHistory = (id: string, token: string) => {
  return useQuery<any, Error>({
    queryKey: ["farmContractHistory", id, token],
    queryFn: () => getFarmContractHistory(id, token),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
    staleTime: 60000,
    refetchOnWindowFocus: false,
  } as UseQueryOptions);
};

export const useGetFarmContractLandDetails = (token: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (farm_uid: any) => getFarmContractLandDetails(farm_uid, token),
    onSuccess: (data: any, variables: { data: any; token: any }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries([
          "farmContractLandDetails",
          variables.token,
        ] as any);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export const useCancelContractRequest = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      contractId,
      secondaryOwnerId,
    }: {
      contractId: string;
      secondaryOwnerId: string;
    }) => cancelContract(contractId, secondaryOwnerId, token),

    onSuccess: (
      data: any,
      variables: { contractId: string; secondaryOwnerId: string }
    ) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries([
          "allRequestedFarmContracts",
          token,
        ] as any);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export const useGetRejectedLands = (token: string) => {
  return useQuery<any, Error>({
    queryKey: ["allRejectedContracts", token],
    queryFn: () => getRejectedContracts(token),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
    staleTime: 60000,
    refetchOnWindowFocus: false,
  } as UseQueryOptions);
};
