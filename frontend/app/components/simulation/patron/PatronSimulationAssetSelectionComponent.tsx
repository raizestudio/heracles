"use client";

import React, { useState, useEffect } from "react";
import useSWRMutation from "swr/mutation";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Fetcher
import { fetcher } from "@/app/utils/fetcher";

// Interfaces
import { IAPIGovFeature } from "@/app/interfaces/geo/APIGovAddressInterface";

interface PatronSimulationAssetSelectionComponentProps {
  updateValidSteps: () => void;
}

interface IFeaturePreviewData {
  transationType: "sell" | "rent" | "renovate";
  assetType: "house" | "apartment" | "other";
  totalRooms: number;
  floor: number;
  constructionDate: "before1949" | "between1949and1997" | "after1997" | "";
  electricalInstallation: string;
  gasInstallation: string;
}

const PatronSimulationAssetSelectionComponent: React.FC<
  PatronSimulationAssetSelectionComponentProps
> = ({ updateValidSteps }) => {
  const [searchAddress, setSearchAddress] = useState("");
  const [searchResults, setSearchResults] = useState<IAPIGovFeature[]>([]);
  const [featurePreview, setFeaturePreview] = useState<IAPIGovFeature | null>();
  // const [selectedFeatures, setSelectedFeatures] = useState<IAPIGovFeature[]>(
  //   []
  // );
  const [featurePreviewData, setFeaturePreviewData] =
    useState<IFeaturePreviewData>({
      transationType: "sell",
      assetType: "house",
      totalRooms: 1,
      floor: 0,
      constructionDate: "",
      electricalInstallation: "",
      gasInstallation: "",
    });
  const [canAddPreviewFeature, setCanAddPreviewFeature] = useState<boolean>(false);
  const [currentMapLocation, setCurrentMapLocation] = useState<
    [number, number] | null
  >(null);

  const searchUrl = new URL(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/geo/addresses/search`
  );
  searchUrl.searchParams.append("address", searchAddress);

  const { trigger } = useSWRMutation(
    searchUrl.toString(),
    async (url: string) =>
      fetcher<{ result: IAPIGovFeature[]; is_cached: boolean }>(url, {
        method: "GET",
      })
  );

  const handleFeaturePreviewSelection = (index: number) => {
    setFeaturePreview(searchResults[index]);
  };

  useEffect(() => {
    const fetchAddress = async () => {
      if (searchAddress.length >= 3) {
        try {
          const data = await trigger();
          if (data) {
            setSearchResults(data.result);
          }
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      }
    };

    fetchAddress();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchAddress]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentMapLocation([latitude, longitude]); // Store the user's coordinates
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          // Fallback to a default location (optional)
          setCurrentMapLocation([43.8, 5.383473]); // Default fallback
        }
      );
    }
  }, []);

  useEffect(() => {
    if (
      featurePreview &&
      featurePreviewData.transationType &&
      featurePreviewData.assetType &&
      featurePreviewData.totalRooms &&
      featurePreviewData.floor &&
      featurePreviewData.constructionDate &&
      featurePreviewData.electricalInstallation &&
      featurePreviewData.gasInstallation
    ) {
      setCanAddPreviewFeature(true);
    } else {
      setCanAddPreviewFeature(false);
    }
  }, [featurePreview, featurePreviewData]);
  
  const UpdateMapCenter = () => {
    const map = useMap();
    useEffect(() => {
      if (featurePreview) {
        map.setView(
          [
            featurePreview.geometry.coordinates[1],
            featurePreview.geometry.coordinates[0],
          ],
          map.getZoom()
        );
      } else if (currentMapLocation) {
        map.setView(currentMapLocation, map.getZoom());
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [featurePreview, map]);

    return null;
  };
  return (
    <div className="flex grow gap-8">
      <div className="grow">
        <div className="grid grid-cols-2 gap-8 h-full">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <Input
                value={searchAddress}
                name="searchAddress"
                placeholder="Veuillez saisir l'adresse du bien"
                className=""
                autoFocus={true}
                onChange={(e) => setSearchAddress(e.target.value)}
              />
              <div className="flex flex-col gap-1">
                {searchResults.map((result, index) => (
                  <Button
                    key={index}
                    variant={"outline"}
                    className="flex gap-1 px-4 py-1 h-auto rounded-sm justify-start"
                    onClick={() => handleFeaturePreviewSelection(index)}
                  >
                    <span className="text-sm">
                      {result.properties.name}, {result.properties.city}{" "}
                      {result.properties.postcode}
                    </span>
                  </Button>
                ))}
              </div>
              <Button
                variant={"ghost"}
                className="self-end text-sm text-gray-500 px-1 py-0.5 h-auto"
              >
                Je ne trouve pas mon adresse
              </Button>
            </div>
            {featurePreview && (
              <div className="flex flex-col gap-6 grow">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Ajouter un bien</h2>
                  <span>{featurePreview?.properties.label}</span>
                </div>
                <div className="flex flex-col gap-4 grow">
                  <div>
                    <span>Vous souhaitez:</span>
                    <div className="flex gap-2">
                      <Button
                        variant={
                          featurePreviewData.transationType !== "sell"
                            ? "secondary"
                            : "default"
                        }
                        className="w-full"
                        onClick={() =>
                          setFeaturePreviewData({
                            ...featurePreviewData,
                            transationType: "sell",
                          })
                        }
                      >
                        Vendre
                      </Button>
                      <Button
                        variant={
                          featurePreviewData.transationType !== "rent"
                            ? "secondary"
                            : "default"
                        }
                        className="w-full"
                        onClick={() =>
                          setFeaturePreviewData({
                            ...featurePreviewData,
                            transationType: "rent",
                          })
                        }
                      >
                        Louer
                      </Button>
                      <Button
                        variant={
                          featurePreviewData.transationType !== "renovate"
                            ? "secondary"
                            : "default"
                        }
                        className="w-full"
                        onClick={() =>
                          setFeaturePreviewData({
                            ...featurePreviewData,
                            transationType: "renovate",
                          })
                        }
                      >
                        Rénover
                      </Button>
                    </div>
                  </div>
                  <div>
                    <span>Type de bien:</span>
                    <div className="flex gap-2">
                      <Button
                        variant={
                          featurePreviewData.assetType !== "house"
                            ? "secondary"
                            : "default"
                        }
                        className="w-full"
                        onClick={() =>
                          setFeaturePreviewData({
                            ...featurePreviewData,
                            assetType: "house",
                          })
                        }
                      >
                        Maison
                      </Button>
                      <Button
                        variant={
                          featurePreviewData.assetType !== "apartment"
                            ? "secondary"
                            : "default"
                        }
                        className="w-full"
                        onClick={() =>
                          setFeaturePreviewData({
                            ...featurePreviewData,
                            assetType: "apartment",
                          })
                        }
                      >
                        Appartement
                      </Button>
                      <Button
                        variant={
                          featurePreviewData.assetType !== "other"
                            ? "secondary"
                            : "default"
                        }
                        className="w-full"
                        onClick={() =>
                          setFeaturePreviewData({
                            ...featurePreviewData,
                            assetType: "other",
                          })
                        }
                      >
                        Autre
                      </Button>
                    </div>
                  </div>
                  <div>
                    <span>Nombre de pièces:</span>
                    <Select
                      onValueChange={(value) =>
                        setFeaturePreviewData({
                          ...featurePreviewData,
                          totalRooms: parseInt(value) + 1,
                        })
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="1" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <span>Étage:</span>
                    <Input
                      type="number"
                      placeholder="0"
                      value={featurePreviewData.floor}
                      onChange={(e) =>
                        setFeaturePreviewData({
                          ...featurePreviewData,
                          floor: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <span>Date permis de construire:</span>
                    <div className="flex gap-2">
                      <Button
                        variant={
                          featurePreviewData.constructionDate !== "before1949"
                            ? "secondary"
                            : "default"
                        }
                        className="w-full"
                        onClick={() =>
                          setFeaturePreviewData({
                            ...featurePreviewData,
                            constructionDate: "before1949",
                          })
                        }
                      >
                        Avant 01/01/1949
                      </Button>
                      <Button
                        variant={
                          featurePreviewData.constructionDate !==
                          "between1949and1997"
                            ? "secondary"
                            : "default"
                        }
                        className="w-full"
                        onClick={() =>
                          setFeaturePreviewData({
                            ...featurePreviewData,
                            constructionDate: "between1949and1997",
                          })
                        }
                      >
                        Entre 1949 et 01/07/1997
                      </Button>
                      <Button
                        variant={
                          featurePreviewData.constructionDate !== "after1997"
                            ? "secondary"
                            : "default"
                        }
                        className="w-full"
                        onClick={() =>
                          setFeaturePreviewData({
                            ...featurePreviewData,
                            constructionDate: "after1997",
                          })
                        }
                      >
                        Après 01/07/1997
                      </Button>
                    </div>
                  </div>
                  <div>
                    <span>Installation électrique:</span>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sélectionner option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less15">Oui, moins de 15 ans.</SelectItem>
                        <SelectItem value="more15">Oui, plus de 15 ans.</SelectItem>
                        <SelectItem value="no">Non.</SelectItem>
                        <SelectItem value="unknown">Je ne sais pas.</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <span>Installation gaz:</span>
                    <Select onValueChange={(value) => setFeaturePreviewData({...featurePreviewData, gasInstallation: value})}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sélectionner option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less15">Oui, moins de 15 ans.</SelectItem>
                        <SelectItem value="more15">Oui, plus de 15 ans.</SelectItem>
                        <SelectItem value="no">Non.</SelectItem>
                        <SelectItem value="unknown">Je ne sais pas.</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button onClick={() => setFeaturePreview(null)}>
                    Annuler
                  </Button>
                  <Button disabled={!canAddPreviewFeature}>Ajouter {canAddPreviewFeature}</Button>
                </div>
              </div>
            )}
          </div>
          <MapContainer
            center={
              featurePreview
                ? [
                    featurePreview.geometry.coordinates[1],
                    featurePreview.geometry.coordinates[0],
                  ]
                : [43.8, 5.383473]
            }
            zoom={18}
            scrollWheelZoom={false}
            className="w-full h-96 rounded-lg"
          >
            <UpdateMapCenter />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {featurePreview && (
              <Marker
                position={[
                  featurePreview.geometry.coordinates[1],
                  featurePreview.geometry.coordinates[0],
                ]}
              >
                <Popup>
                  {featurePreview.properties.label} <br />{" "}
                  {featurePreview.properties.name}
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>
      <div className="basis-1/3">
        <h1 className="text-xl font-bold">Résumé</h1>
        <Button onClick={updateValidSteps} className="w-full mt-4"></Button>
      </div>
    </div>
  );
};

export default PatronSimulationAssetSelectionComponent;
