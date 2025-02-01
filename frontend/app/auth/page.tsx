"use client";
import React, { useState } from "react";

// Components
import LoginComponent from "@/app/components/auth/LoginComponent";
import RegisterComponent from "@/app/components/auth/RegisterComponent";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

// Icons
import WarningIcon from "@/app/components/icons/WarningIcon";

const AuthPage = () => {
  const [currentView, setCurrentView] = useState("login");
  const [isLoading, setIsLoading] = useState(false);

  const title = currentView === "login" ? "Connexion" : "Créer un compte";

  return (
    <div className="h-[calc(100vh-5rem)] flex justify-center items-center grow">
      <div className="flex flex-col justify-center items-center gap-8">
        <h1 className="text-2xl font-bold">{title}</h1>
        {process.env.DEMO?.toLocaleLowerCase() === "true" && (
          <Alert variant="default">
            <WarningIcon className="h-4 w-4" />
            <AlertTitle>Attention</AlertTitle>
            <AlertDescription>
              Vous êtes dans un environnement de démo.
            </AlertDescription>
          </Alert>
        )}
        {currentView === "login" && (
          <LoginComponent
            isLoading={isLoading}
            toggleLoading={(value) => setIsLoading(value)}
          />
        )}
        {currentView === "register" && <RegisterComponent />}
        <Button
          variant={"ghost"}
          onClick={() =>
            setCurrentView(currentView === "login" ? "register" : "login")
          }
        >
          {currentView === "login" ? "Créer un compte" : "Connexion"}
        </Button>
      </div>
    </div>
  );
};

export default AuthPage;
