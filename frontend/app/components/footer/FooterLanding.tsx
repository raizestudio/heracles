"use client";
import React, { useEffect } from "react";

// Stores
import useUserStore from "@/app/stores/userStore";
interface FooterLandingProps {
  t?: string;
}

const FooterLanding: React.FC<FooterLandingProps> = () => {
  const { session, setSession } = useUserStore();

  useEffect(() => {
    fetch("https://freeipapi.com/api/json")
    .then((response) => response.json())
    .then((data) => {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/session/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ip_v4: data.ipAddress
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.session);
        setSession(data.session);
        console.log(session);
      })
    });
  }, []);
  return (
    <footer className="flex bg-gray-50 p-4 shadow">
      <div className="flex flex-col">
        <span className="text-primary-100 text-sm font-semibold">
          Heracles - {new Date().getFullYear()}
        </span>
        <span className="text-xs">Lorem ipsum dolor sit amet.</span>
      </div>
      <div className="grow"></div>
      <div className="flex flex-col">
        <div className="flex gap-2">
          <span className="text-sm">Documentation</span>
          <span className="text-sm">Question fréquentes</span>
          <span className="text-sm">Qui sommes nous</span>
        </div>
        <div className="flex justify-end">
          <span className="text-xs text-gray-700">{ session?.id }</span>
        </div>
      </div>
    </footer>
  );
};

export default FooterLanding;
