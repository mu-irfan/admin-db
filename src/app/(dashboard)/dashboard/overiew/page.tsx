"use client";
import { useContextConsumer } from "@/context/Context";
import dynamic from "next/dynamic";
import Lands from "@/components/ui/Lands/Lands";
import { Button } from "@/components/ui/button";
import { Undo2, X, Filter } from "lucide-react";
import LandDetails from "@/components/ui/Lands/LandDetail/LandDetails";
import FilterModal from "@/components/ui/SearchForm/Filters/Filter";
import { Toaster } from "react-hot-toast";

const Map = dynamic(() => import("@/components/LeafLetMap/Map"), {
  ssr: false,
});

export default function Home() {
  const {
    showLands,
    setShowLands,
    lands,
    selectedLandId,
    showDetails,
    handleLandsDetails,
    landDetails,
    resetMap,
    isFilterModalOpen,
    setFilterModalOpen,
  } = useContextConsumer();

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <main className="relative h-[calc(100vh-4rem)] w-full">
        <div className="relative h-full w-full">
          <Map
            lands={showLands ? lands : []}
            selectedLandId={selectedLandId}
            onSeeMoreDetails={handleLandsDetails}
            resetMap={resetMap}
          />
          <div className="absolute inset-0 bg-estateBlack opacity-40 z-20 pointer-events-none"></div>
          {showLands && !showDetails && (
            <div className="absolute left-3 md:left-auto top-2 md:top-0 md:right-2 h-full md:w-[400px] md:p-4 md:overflow-y-auto z-30 space-y-4 scrollbar-custom">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowLands(false)}
                className="text-primary font-semibold mb-2"
              >
                <Undo2 className="inline" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilterModalOpen(true)}
                className="text-primary focus:outline-none lg:text-base ml-2"
              >
                <Filter />
              </Button>
              <Lands lands={lands} onSeeMoreDetails={handleLandsDetails} />
            </div>
          )}
          {showDetails && (
            <div className="absolute left-3 sm:left-auto top-2 md:top-0 sm:right-2 h-full sm:w-[500px] overflow-hidden md:p-4 z-30 space-y-4">
              <Button variant="outline" size="sm" onClick={resetMap}>
                <X className="inline" />
              </Button>
              <LandDetails details={landDetails} />
            </div>
          )}
        </div>
      </main>
      <FilterModal open={isFilterModalOpen} onOpenChange={setFilterModalOpen} />
    </>
  );
}
