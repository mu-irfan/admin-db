"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Polygon,
  useMap,
} from "react-leaflet";
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
  lands,
  selectedLandId,
  resetMap,
  onSeeMoreDetails,
}: any) => {
  const map = useMap();
  const currentPolygon = useRef<L.Polygon | null>(null);
  const currentPopup = useRef<L.Popup | null>(null);

  const showLandDetailsOnMap = useCallback(
    (land: any) => {
      if (currentPolygon.current) {
        map.removeLayer(currentPolygon.current);
      }
      if (currentPopup.current) {
        currentPopup.current.removeFrom(map);
      }

      const geometry = land.geometry.map((coord: any) => [coord[1], coord[0]]);
      currentPolygon.current = L.polygon(geometry).addTo(map);
      const latlng: L.LatLngTuple = [land.location[1], land.location[0]];
      const marker = L.marker(latlng, { icon }).addTo(map);

      const popup = marker
        .bindPopup(
          `<b>${land.estate.toUpperCase()}</b><br><b>Size (Acre): ${land.size_acre.toFixed(
            2
          )}</b><br>${land.district}, ${land.province}`
        )
        .openPopup()
        .getPopup();

      if (popup) {
        currentPopup.current = popup;
      } else {
        currentPopup.current = null;
      }
      map.setView(latlng, 20);
    },
    [map]
  );

  useEffect(() => {
    if (lands && lands.length > 0) {
      lands.forEach((land: any) => {
        const latlng: L.LatLngTuple = [land.location[1], land.location[0]];
        const marker = L.marker(latlng, { icon }).addTo(map);

        marker.on("click", () => {
          showLandDetailsOnMap(land);
          onSeeMoreDetails(land.uid);
        });

        if (selectedLandId && land.uid === selectedLandId) {
          showLandDetailsOnMap(land);
        }
      });
    }
    if (resetMap && !selectedLandId) {
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
    lands,
    map,
    selectedLandId,
    resetMap,
    onSeeMoreDetails,
    showLandDetailsOnMap,
  ]);

  return null;
};

const Map = ({ lands, selectedLandId, onSeeMoreDetails, resetMap }: any) => {
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
      {lands?.length > 0 && (
        <MarkersAndPolygons
          lands={lands}
          selectedLandId={selectedLandId}
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
