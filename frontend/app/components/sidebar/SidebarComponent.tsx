"use client";
import { useState } from "react";
import Link from "next/link";

import CloseIcon from "@/app/components/icons/CloseIcon";
import DotsThreeIcon from "@/app/components/icons/DotsThreeIcon";

interface SidebarComponentProps {
  t?: string;
}

const SidebarComponent: React.FC<SidebarComponentProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen ? (
        <div className="absolute flex flex-col bg-gray-200 w-64 h-[calc(100%-2rem)] p-2 m-4 rounded shadow">
          <div className="flex justify-between items-center">
            <span className="text-gray-800 font-semibold">Menu</span>
            <button
              className="px-1 py-0.5 bg-gray-50 rounded"
              onClick={() => setIsOpen(false)}
            >
              <CloseIcon width={18} />
            </button>
          </div>
          <div className="grow">
            Menus
          </div>
          <div className="flex flex-col items-center">
            <Link href="/documentation" className="bg-primary-100 rounded w-fit px-2">
              <span className="text-gray-50 text-sm">Documentation</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="absolute flex justify-center items-center mx-4 my-4 rounded shadow">
          <button
            className="px-0.5 py-0.5 bg-gray-200 rounded"
            onClick={() => setIsOpen(true)}
          >
            <DotsThreeIcon width={20} />
          </button>
        </div>
      )}
    </>
  );
};

export default SidebarComponent;
