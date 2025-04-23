"use client";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { useCallback, useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { Button } from "../ui/button";

const icon = new L.Icon({
  iconUrl: "/images/map/marker-green.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MarkersAndPolygons = ({
  projects,
  selectedProjectId,
  resetMap,
  onSeeMoreDetails,
}: any) => {
  const map = useMap();
  const currentPolygon = useRef<L.Polygon | null>(null);
  const currentPopup = useRef<L.Popup | null>(null);

  const showProjectDetailsOnMap = useCallback(
    (project: any) => {
      if (currentPolygon.current) {
        map.removeLayer(currentPolygon.current);
      }
      if (currentPopup.current) {
        currentPopup.current.removeFrom(map);
      }

      if (project.geometry && Array.isArray(project.geometry)) {
        const geometry = project.geometry.map((coord: any) => [
          coord[1],
          coord[0],
        ]);
        currentPolygon.current = L.polygon(geometry).addTo(map);
      }

      const latlng: L.LatLngTuple = [
        project.location[0], // latitude
        project.location[1], // longitude
      ];

      const marker = L.marker(latlng, { icon }).addTo(map);

      const popupContent = `
      <b>${project.title?.toUpperCase() || "Untitled Project"}</b><br>
      <b>Deadline:</b> ${project.deadline || "N/A"}<br>
      ${project.district || ""}, ${project.province || ""}
    `;

      const popup = marker.bindPopup(popupContent).openPopup().getPopup();

      currentPopup.current = popup || null;
      map.setView(latlng, 15); // or 20 for deep zoom
    },
    [map]
  );

  useEffect(() => {
    if (projects && projects.length > 0) {
      projects.forEach((project: any) => {
        // ✅ Validate location
        if (
          !project.location ||
          !Array.isArray(project.location) ||
          project.location.length !== 2
        ) {
          console.warn("Invalid location:", project);
          return;
        }

        const latlng: L.LatLngTuple = [
          project.location[0], // lat
          project.location[1], // lng
        ];

        const marker = L.marker(latlng, { icon }).addTo(map);

        marker.on("click", () => {
          showProjectDetailsOnMap(project);
          onSeeMoreDetails(project.uuid);
        });

        if (selectedProjectId && project.uuid === selectedProjectId) {
          showProjectDetailsOnMap(project);
        }
      });
    }

    if (resetMap && !selectedProjectId) {
      map.setView([30.3753, 69.3451], 6);
      if (currentPolygon.current) {
        map.removeLayer(currentPolygon.current);
        currentPolygon.current = null;
      }
      if (currentPopup.current) {
        currentPopup.current.removeFrom(map);
        currentPopup.current = null;
      }
    }
  }, [
    projects,
    map,
    selectedProjectId,
    resetMap,
    onSeeMoreDetails,
    showProjectDetailsOnMap,
  ]);

  return null;
};

const Map = ({
  projects,
  selectedProjectId,
  onSeeMoreDetails,
  resetMap,
}: any) => {
  const [tileLayerUrl, setTileLayerUrl] = useState(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  );

  // Function to change tile layer
  const switchTileLayer = (newTileLayerUrl: string) => {
    setTileLayerUrl(newTileLayerUrl);
  };

  return (
    <MapContainer
      key={Math.random()}
      center={[30.3753, 69.3451]}
      zoom={6}
      className="h-full w-full z-10 relative"
    >
      <TileLayer url={tileLayerUrl} />
      {projects?.length > 0 && (
        <MarkersAndPolygons
          projects={projects}
          selectedProjectId={selectedProjectId}
          onSeeMoreDetails={onSeeMoreDetails}
          resetMap={resetMap}
        />
      )}

      <div className="absolute flex flex-col items-center bottom-20 left-14 z-[1000] pointer-events-auto group">
        <Button
          onClick={() =>
            switchTileLayer(
              "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            )
          }
          className="light-map absolute w-16 h-16 border border-primary rounded-full shadow-md transition-transform duration-300 ease-in-out group-hover:translate-y-0 group-hover:scale-110"
        />
        <Button
          onClick={() =>
            switchTileLayer(
              "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
            )
          }
          className="terrain-map absolute w-16 h-16 border border-primary rounded-full shadow-md transition-transform duration-300 ease-in-out group-hover:translate-y-[-60px] group-hover:scale-110"
        />
        <Button
          onClick={() =>
            switchTileLayer(
              "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            )
          }
          className="dark-map absolute w-16 h-16 border border-primary rounded-full shadow-md transition-transform duration-300 ease-in-out group-hover:translate-y-[-120px] group-hover:scale-110"
        />
      </div>
    </MapContainer>
  );
};

export default Map;
