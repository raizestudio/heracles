"use client";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

interface MapComponentProps {
  lat: number | null;
  lon: number | null;
  markerLabel: {
    label: string;
    name: string;
  };
}

const MapComponent: React.FC<MapComponentProps> = ({
  lat,
  lon,
  markerLabel,
}) => {
  const [currentLat, setCurrentLat] = useState<number>(48.8584);
  const [currentLon, setCurrentLon] = useState<number>(2.2945);

  useEffect(() => {
    if (!lat || !lon) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLat(position.coords.latitude);
          setCurrentLon(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    }
  }, [lat, lon]);

  const UpdateMapCenter = () => {
    const map = useMap();
    useEffect(() => {
      map.setView([lat ?? currentLat, lon ?? currentLon], map.getZoom());
    }, [lat, lon, currentLat, currentLon, map]);
    return null;
  };

  return (
    <>
      <MapContainer
        center={[lat ?? currentLat, lon ?? currentLon]}
        zoom={18}
        scrollWheelZoom={false}
        className="w-full h-96 rounded-lg z-0"
      >
        <UpdateMapCenter />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat ?? currentLat, lon ?? currentLon]}>
          <Popup>
            {markerLabel.label} <br /> {markerLabel.name}
          </Popup>
        </Marker>
      </MapContainer>
      <span>
        {lat && lat} - {lon && lon}
      </span>
    </>
  );
};

export default MapComponent;
