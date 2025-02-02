import React from "react";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PatronSimulationAssetSelectionComponentProps {
  updateValidSteps: () => void;
}

const PatronSimulationAssetSelectionComponent: React.FC<
  PatronSimulationAssetSelectionComponentProps
> = ({ updateValidSteps }) => {
  return (
    <div className="flex grow gap-8">
      <div className="grow">
        <div className="flex flex-col gap-1 w-1/2">
          <Input placeholder="Adresse" className="" autoFocus={true} />
          <Button variant={"ghost"} className="self-end text-sm text-gray-500 px-1 py-0.5 h-auto">
            Je ne trouve pas mon adresse
          </Button>
        </div>
      </div>
      <div className="basis-1/3">
        <h1 className="text-xl font-bold">Résumé</h1>
      </div>
    </div>
  );
};

export default PatronSimulationAssetSelectionComponent;
