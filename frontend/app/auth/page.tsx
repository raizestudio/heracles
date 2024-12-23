"use client";
import React, { useState } from "react";

// Components
import LoginComponent from "@/app/components/auth/LoginComponent";
import RegisterComponent from "@/app/components/auth/RegisterComponent";

const AuthPage = () => {
  const [currentView, setCurrentView] = useState("login");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="h-[calc(100vh-5rem)] flex justify-center items-center grow">
      <div className="flex flex-col bg-gray-100 w-5/6 min-h-3/4 md:w-2/4 lg:w-3/5 xl:w-2/5 rounded p-4">
        {/* Button Container */}
        <div className="relative flex bg-primary-100 rounded h-10">
          {/* Sliding Background */}
          <div
            className="absolute top-0 left-0 h-8 w-[calc(50%-4px)] m-1 bg-gray-100 rounded transition-transform duration-500 ease-in-out"
            style={{
              transform:
                currentView === "login" ? "translateX(0)" : "translateX(100%)",
            }}
          ></div>

          {/* Login Button */}
          <button
            className="relative z-10 grow text-center rounded text-white px-4"
            onClick={() => setCurrentView("login")}
          >
            <span
              className={`transition-all duration-500 ease-in-out ${
                currentView === "login" ? "text-black" : "text-gray-100"
              }`}
            >
              Connexion
            </span>
          </button>

          {/* Register Button */}
          <button
            className="relative z-10 grow text-center rounded text-white"
            onClick={() => setCurrentView("register")}
          >
            <span
              className={`transition-all duration-500 ease-in-out ${
                currentView === "register" ? "text-black" : "text-gray-100"
              }`}
            >
              Créer un compte
            </span>
          </button>
        </div>

        {/* Content */}
        {currentView === "login" && <LoginComponent isLoading={isLoading} toggleLoading={(value) => setIsLoading(value)} />}
        {currentView === "register" && <RegisterComponent />}
      </div>
    </div>
  );
};

export default AuthPage;
