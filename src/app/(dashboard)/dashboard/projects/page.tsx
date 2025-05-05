"use client";
import { useContextConsumer } from "@/context/Context";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useGetAllProjects } from "@/hooks/apis/useProject";
import Projects from "@/components/ui/Projects/Projects";
import ProjectDetails from "@/components/ui/Projects/ProjectDetail/ProjectDetails";

const Map = dynamic(() => import("@/components/LeafLetMap/Map"), {
  ssr: false,
});

export default function Home() {
  const {
    token,
    showProjects,
    selectedProjectId,
    showDetails,
    handleProjectDetails,
    projectDetails,
    resetMap,
  } = useContextConsumer();

  // projects api
  const { data: projects } = useGetAllProjects(token);

  return (
    <>
      <Toaster />
      <main className="relative h-[calc(100vh-4rem)] w-full">
        <div className="relative h-full w-full">
          <Map
            projects={projects?.data || []}
            selectedProjectId={selectedProjectId}
            onSeeMoreDetails={handleProjectDetails}
            resetMap={resetMap}
          />
          <div className="absolute inset-0 bg-estateBlack opacity-40 z-20 pointer-events-none"></div>
          {!showProjects && !showDetails && (
            <div className="absolute left-3 md:left-auto top-2 md:top-0 md:right-2 h-full md:w-[400px] md:p-4 md:overflow-y-auto z-30 space-y-4 scrollbar-custom">
              <Projects
                projects={projects?.data || []}
                onSeeMoreDetails={handleProjectDetails}
              />
            </div>
          )}
          {showDetails && (
            <div className="absolute left-3 sm:left-auto top-2 md:top-0 sm:right-2 h-full sm:w-[500px] overflow-hidden md:p-4 z-30 space-y-4">
              <Button variant="outline" size="sm" onClick={resetMap}>
                <X className="inline" />
              </Button>
              <ProjectDetails project={projectDetails?.data} />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
