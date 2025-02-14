"use client";
import React, { useState } from "react";
// Components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import PatronSimulationAssetSelectionComponent from "@/app/components/simulation/patron/PatronSimulationAssetSelectionComponent";

const PatronSimulationComponent = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [validSteps, setValidSteps] = useState(currentStep - 1);

  const STEPS = [
    {
      id: 1,
      title: "Sélection des actifs",
    },
    {
      id: 2,
      title: "Informations complémentaires",
    },
    {
      id: 3,
      title: "Choix diagnostics",
    },
  ];

  const handleStepChange = (step: number) => {
    if (step > currentStep) {
      return;
    }
    setCurrentStep(step);
  };

  const handleStepValidation = () => {
    if (validSteps === currentStep) {
      return;
    }
    setValidSteps(currentStep);
  }

  return (
    <div className="flex flex-col grow gap-6">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            {STEPS.map((step, index) => (
              <BreadcrumbItem key={index}>
                <BreadcrumbPage
                  className={`select-none ${
                    currentStep >= step.id ? "text-gray-950 dark:text-gray-50" : "text-gray-400"
                  } ${
                    currentStep >= step.id && currentStep !== step.id
                      ? "cursor-pointer"
                      : ""
                  }`}
                  onClick={() => {
                    handleStepChange(step.id);
                  }}
                >
                  {step.title}
                </BreadcrumbPage>
                {index < STEPS.length - 1 && <BreadcrumbSeparator />}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex grow">
        {currentStep === 1 && <PatronSimulationAssetSelectionComponent updateValidSteps={() => handleStepValidation()} />}
        {currentStep === 2 && <div>Informations complémentaires</div>}
        {currentStep === 3 && <div>Choix diagnostics</div>}
      </div>
      <div className="flex justify-end">
        {currentStep > 1 && (
          <Button onClick={() => setCurrentStep(currentStep - 1)}>
            Retour
          </Button>
        )}
        {currentStep < STEPS.length && (
          <Button
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={validSteps < currentStep}
          >
            Valider
          </Button>
        )}
        {currentStep === STEPS.length && <Button>Paiement</Button>}
      </div>
    </div>
  );
};

export default PatronSimulationComponent;
