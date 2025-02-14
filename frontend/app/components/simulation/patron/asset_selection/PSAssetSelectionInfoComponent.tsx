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

// Interfaces
import { IAPIGovFeature } from "@/app/interfaces/geo/APIGovAddressInterface";
interface IFeaturePreviewData {
  transationType: "sell" | "rent" | "renovate";
  assetType: "house" | "apartment" | "other";
  totalRooms: number;
  floor: number;
  constructionDate: "before1949" | "between1949and1997" | "after1997" | "";
  electricalInstallation: string;
  gasInstallation: string;
}

interface PSAssetSelectionInfoComponentProps {
  featurePreview: IAPIGovFeature | null;
  featurePreviewData: IFeaturePreviewData;
  selectedFeatures: IAPIGovFeature[];
  canAddPreviewFeature: boolean;
  setFeaturePreviewData: (data: any) => void;
  setFeaturePreview: (data: any) => void;
  setSelectedFeatures: (data: any) => void;
}

const PSAssetSelectionInfoComponent: React.FC<
  PSAssetSelectionInfoComponentProps
> = ({
  featurePreview,
  featurePreviewData,
  selectedFeatures,
  canAddPreviewFeature,
  setFeaturePreviewData,
  setFeaturePreview,
  setSelectedFeatures,
}) => {
  return (
    featurePreview && (
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
                  featurePreviewData.constructionDate !== "between1949and1997"
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
            <Select
              onValueChange={(value) =>
                setFeaturePreviewData({
                  ...featurePreviewData,
                  electricalInstallation: value,
                })
              }
            >
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
            <Select
              onValueChange={(value) =>
                setFeaturePreviewData({
                  ...featurePreviewData,
                  gasInstallation: value,
                })
              }
            >
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
          <Button onClick={() => setFeaturePreview(null)}>Annuler</Button>
          <Button
            disabled={!canAddPreviewFeature}
            onClick={() =>
              setSelectedFeatures([...selectedFeatures, featurePreview])
            }
          >
            Ajouter {canAddPreviewFeature}
          </Button>
        </div>
      </div>
    )
  );
};

export default PSAssetSelectionInfoComponent;
