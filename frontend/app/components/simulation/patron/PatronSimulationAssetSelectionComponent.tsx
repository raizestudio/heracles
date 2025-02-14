"use client";

import React, { useState, useEffect, useMemo } from "react";
import useSWRMutation from "swr/mutation";
import dynamic from "next/dynamic";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogHeader, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
// import DialogComponent from "@/app/components/dialog/DialogComponent";
import PSAssetSelectionSummaryComponent from "@/app/components/simulation/patron/asset_selection/PSAssetSelectionSummaryComponent";
import PSAssetSelectionInfoComponent from "@/app/components/simulation/patron/asset_selection/PSAssetSelectionInfoComponent";

export const LazyMap = dynamic(
  () => import("@/app/components/map/MapComponent"),
  { ssr: false }
);

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
  const [selectedFeatures, setSelectedFeatures] = useState<IAPIGovFeature[]>(
    []
  );
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
  const [canAddPreviewFeature, setCanAddPreviewFeature] =
    useState<boolean>(false);

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
    console.log(`DEBUG: featurePreviewData`, featurePreviewData);
    console.log(`DEBUG: canAddPreviewFeature 1`, canAddPreviewFeature);
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
    console.log(`DEBUG: canAddPreviewFeature 2`, canAddPreviewFeature);
  }, [featurePreview, featurePreviewData]);

  useEffect(() => {
    if (selectedFeatures.length > 0) {
      updateValidSteps();
    }
  }, [selectedFeatures]);

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
              <Dialog>
                <DialogTrigger className="self-end">
                  <Button
                    variant={"ghost"}
                    className="self-end text-sm text-gray-500 px-1 py-0.5 h-auto"
                  >
                    Je ne trouve pas mon adresse
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Paramètres supplémentaires recherche adresse</DialogTitle>
                  </DialogHeader>
                  <DialogDescription></DialogDescription>
                </DialogContent>
              </Dialog>
            </div>
            <PSAssetSelectionInfoComponent
              featurePreview={featurePreview || null}
              featurePreviewData={featurePreviewData}
              setFeaturePreviewData={setFeaturePreviewData}
              canAddPreviewFeature={canAddPreviewFeature}
              selectedFeatures={selectedFeatures}
              setFeaturePreview={setFeaturePreview}
              setSelectedFeatures={setSelectedFeatures}
            />
          </div>
          <LazyMap
            lat={featurePreview?.geometry.coordinates[1] || null}
            lon={featurePreview?.geometry.coordinates[0] || null}
            markerLabel={{ label: "aze", name: "aze" }}
          />
        </div>
      </div>
      <div className="basis-1/3">
        <PSAssetSelectionSummaryComponent selectedFeatures={selectedFeatures} />
        {/* <Button onClick={updateValidSteps} className="w-full mt-4"></Button> */}
      </div>
    </div>
  );
};

export default PatronSimulationAssetSelectionComponent;
