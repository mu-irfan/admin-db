"use client";
import { getApplicationDetails } from "@/api/applications";
import { getProjectDetails, getProjectList } from "@/api/project";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define context type
interface ContextType {
  token: string;
  hasProjectAccess: boolean;
  setHasProjectAccess: (value: boolean) => void;
  showProjects: boolean;
  setshowProjects: (value: boolean) => void;
  showDetails: boolean;
  setShowDetails: (value: boolean) => void;
  showApplicationDetails: boolean;
  setShowApplicationDetails: (value: boolean) => void;
  projectDetails: Project | null;
  applicationDetails: null;
  setProjectDetails: (details: Project | null) => void;
  setApplicationDetails: (details: any | null) => void;
  selectedProjectId: string | null;
  setselectedProjectId: (id: string | null) => void;
  handleProjectDetails: (uid: string) => void;
  handleApplicationDetails: (uid: string) => void;
  resetMap: () => void;
}

// Create context
const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [showProjects, setshowProjects] = useState<boolean>(false);
  const [hasProjectAccess, setHasProjectAccess] = useState(true);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [showApplicationDetails, setShowApplicationDetails] =
    useState<boolean>(false);
  const [projectDetails, setProjectDetails] = useState<Project | null>(null);
  const [applicationDetails, setApplicationDetails] = useState(null);
  const [selectedProjectId, setselectedProjectId] = useState<string | null>(
    null
  );
  const { getAccessToken } = useAuth();
  const token: any = getAccessToken();

  useEffect(() => {
    setShowApplicationDetails(false);
    setApplicationDetails(null);
  }, [pathname]);

  useEffect(() => {
    const checkProjectAccess = async () => {
      try {
        const res = await getProjectList(token);
        if (res?.success) {
          setHasProjectAccess(true);
        } else {
          setHasProjectAccess(false);
        }
      } catch (error: any) {
        if (error?.response?.status === 403) {
          setHasProjectAccess(false);
        }
      }
    };

    if (token) {
      checkProjectAccess();
    }
  }, [token]);

  const handleProjectDetails = async (uid: string) => {
    const details: Project = await getProjectDetails(uid, token);
    setProjectDetails(details);
    setselectedProjectId(uid);
    setShowDetails(true);
  };

  const handleApplicationDetails = async (uid: string) => {
    const details = await getApplicationDetails(uid, token);
    setApplicationDetails(details);
    setShowApplicationDetails(true);
  };

  const resetMap = () => {
    setselectedProjectId(null);
    setProjectDetails(null);
    setShowDetails(false);
  };

  const contextValues: ContextType = {
    token,
    showProjects,
    setshowProjects,
    showDetails,
    setShowDetails,
    showApplicationDetails,
    setShowApplicationDetails,
    applicationDetails,
    setApplicationDetails,
    projectDetails,
    setProjectDetails,
    selectedProjectId,
    setselectedProjectId,
    handleProjectDetails,
    handleApplicationDetails,
    resetMap,
    hasProjectAccess,
    setHasProjectAccess,
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
