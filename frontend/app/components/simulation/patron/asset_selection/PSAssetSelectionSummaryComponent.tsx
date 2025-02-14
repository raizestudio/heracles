import React from "react";

// Interfaces
import { IAPIGovFeature } from "@/app/interfaces/geo/APIGovAddressInterface";

interface PSAssetSelectionSummaryComponentProps {
  selectedFeatures: IAPIGovFeature[];
}

const PSAssetSelectionSummaryComponent: React.FC<PSAssetSelectionSummaryComponentProps> = ({selectedFeatures}) => {
  return (
    <>
      <h1 className="text-xl font-bold">Résumé</h1>
      {selectedFeatures.map((feature, index) => (
        <div key={index}>
          <span>{feature.properties.label}</span>
        </div>
      ))}
    </>
  );
};

export default PSAssetSelectionSummaryComponent;