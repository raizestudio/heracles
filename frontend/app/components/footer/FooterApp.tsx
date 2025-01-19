"use client";
import { useEffect } from "react";

import useCoreStore from "@/app/stores/coreStore";

import BugIcon from "@/app/components/icons/BugIcon";

interface FooterAppProps {
  t?: string;
}

const FooterApp: React.FC<FooterAppProps> = () => {
  const { avgLatency, addLatency } = useCoreStore();

  const healthCheck = async () => {
    const start = new Date().getTime();
    const res = await fetch("http://localhost:8000/health");
    const data = await res.json();

    const end = new Date().getTime();

    addLatency(end - start);

    console.log(data);
  };

  const calculateAvgLatencyColor = () => {
    if (avgLatency < 50) {
      return "bg-green-500";
    } else if (avgLatency < 100) {
      return "bg-yellow-500";
    } else {
      return "bg-red-500";
    }
  };

  useEffect(() => {
    // setInterval(() => {
    //   healthCheck();
    // }, 10000);
  }, []);

  return (
    <footer className="flex justify-between items-center bg-gray-50 h-8 px-4 shadow">
      <div>
        <span className="text-primary-100 text-sm font-semibold">
          Heracles - 2024
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="bg-red-500 px-1.5 py-0.5 rounded">
          <BugIcon width={20} height={20} className="fill-gray-50" />
        </div>
        <div
          className={`flex h-3 w-3 py-0.5 rounded-full transition-colors duration-300 ease-in-out ${calculateAvgLatencyColor()}`}
        ></div>
      </div>
    </footer>
  );
};

export default FooterApp;
