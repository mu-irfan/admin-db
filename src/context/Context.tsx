"use client";
import { useAuth } from "@/hooks/useAuth";
import { createContext, useContext, useState, ReactNode } from "react";
import { getFilteredLands, getLandDetails } from "@/api/lands";
import { getFarmContractLandDetails } from "@/api/contract-farming";

// Define context type
interface ContextType {
  mode: "view" | "add" | "edit";
  setMode: (newMode: "view" | "add" | "edit") => void;
  token: string;
  showLands: boolean;
  setShowLands: (value: boolean) => void;
  lands: Land[];
  setLands: (lands: Land[]) => void;
  showDetails: boolean;
  setShowDetails: (value: boolean) => void;
  landDetails: Land | null;
  setLandDetails: (details: Land | null) => void;
  selectedLandId: string | null;
  setSelectedLandId: (id: string | null) => void;
  isFilterModalOpen: boolean;
  setFilterModalOpen: (open: boolean) => void;
  handleSearchSubmit: (data: Land[]) => void;
  handleLandsDetails: (uid: string) => void;
  handleFilterLands: (filters: any) => void;
  landContract: any | null;
  setlandContract: (contract: any | null) => void;
  showContractDetails: boolean;
  setshowContractDetails: (open: boolean) => void;
  handleContractDetails: (farm_uid: string) => void;
  resetMap: () => void;
}

// Create context
const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<"view" | "add" | "edit">("add");
  const [showLands, setShowLands] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [lands, setLands] = useState<Land[]>([]);
  const [landDetails, setLandDetails] = useState<Land | null>(null);
  const [selectedLandId, setSelectedLandId] = useState<string | null>(null);
  const [isFilterModalOpen, setFilterModalOpen] = useState<boolean>(false);
  const [landContract, setlandContract] = useState<any | null>(null);
  const [showContractDetails, setshowContractDetails] =
    useState<boolean>(false);

  const { getAccessToken } = useAuth();
  const token: any = getAccessToken();

  const handleSearchSubmit = (data: Land[]) => {
    if (data.length === 0) {
      setShowLands(false);
    } else {
      setLands(data);
      setShowLands(true);
    }
  };

  const handleLandsDetails = async (uid: string) => {
    const details: Land = await getLandDetails(uid, token);
    setLandDetails(details);
    setSelectedLandId(uid);
    setShowDetails(true);
  };

  const handleContractDetails = async (farm_uid: string) => {
    const details = await getFarmContractLandDetails(farm_uid, token);
    setlandContract(details.farm);
    setshowContractDetails(true);
  };

  const handleFilterLands = async (filters: any) => {
    const filteredData: Land[] = await getFilteredLands(filters, token);
    if (!filteredData || filteredData.length === 0) {
      setShowLands(false);
    } else {
      setLands(filteredData);
      setShowLands(true);
    }
    setFilterModalOpen(false);
  };

  const resetMap = () => {
    setSelectedLandId(null);
    setLandDetails(null);
    setShowDetails(false);
  };

  const contextValues: ContextType = {
    mode,
    setMode,
    token,
    showLands,
    setShowLands,
    lands,
    setLands,
    showDetails,
    setShowDetails,
    landDetails,
    setLandDetails,
    selectedLandId,
    setSelectedLandId,
    isFilterModalOpen,
    setFilterModalOpen,
    handleSearchSubmit,
    handleLandsDetails,
    handleFilterLands,
    landContract,
    setlandContract,
    showContractDetails,
    setshowContractDetails,
    handleContractDetails,
    resetMap,
  };

  return <Context.Provider value={contextValues}>{children}</Context.Provider>;
};

export const useContextConsumer = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("Context must be in Provider");
  }
  return context;
};
