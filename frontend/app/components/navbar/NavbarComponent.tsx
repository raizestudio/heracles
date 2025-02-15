"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import useUserStore from "@/app/stores/userStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useTheme } from "next-themes";

// Components
import DropdownComponent from "@/app/components/dropdown/DropdownComponent";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Icons
import HomeIcon from "@/app/components/icons/HomeIcon";
import HandsClappingIcon from "@/app/components/icons/HandsClappingIcon";
import LogoutIcon from "@/app/components/icons/LogoutIcon";
import FlaskIcon from "@/app/components/icons/FlaskIcon";
import NotificationIcon from "@/app/components/icons/NotificationIcon";
import BirdIcon from "@/app/components/icons/BirdIcon";
import MoonIcon from "@/app/components/icons/MoonIcon";
import SunIcon from "@/app/components/icons/SunIcon";

import { deleteCookie, getCookie } from "@/app/actions/cookie";
import { useRouter } from "next/navigation";

interface MenuInterface {
  name: string;
  icon?: React.FC<{ width?: number; height?: number }>;
  url: string;
  requiresAuth?: boolean;
}

const NavbarComponent = () => {
  const pathname = usePathname();

  const router = useRouter();
  const { user, isLoggedIn, logout, login } = useUserStore();
  const { setTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const MENUS: MenuInterface[] = [
    {
      name: "accueil",
      icon: HomeIcon,
      url: "/",
      requiresAuth: false,
    },
    {
      name: "dashboard",
      icon: HandsClappingIcon,
      url: "/app",
      requiresAuth: true,
    },
  ];

  const filteredMenus = MENUS.filter((menu) => {
    if (menu.requiresAuth && !isLoggedIn && pathname !== "/") {
      return false;
    }
    return menu.url !== pathname;
  });

  useEffect(() => {
    const getCookieToken = async () => {
      const token = await getCookie("token");
      if (token) {
        fetch("http://localhost:8000/auth/authenticate/token/", {
          method: "POST",
          body: JSON.stringify({
            token: token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then(async (data) => {
            login(data.user);
          });
      }
    };
    getCookieToken();
  }, []);
  return (
    <nav className="h-12 flex justify-between items-center px-4">
      <div className="flex items-center gap-2">
        {process.env.NODE_ENV === "development" &&
          process.env.DEMO?.toLocaleLowerCase() === "false" && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="bg-orange-500 p-1 rounded">
                    <FlaskIcon className="fill-white" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Heracles is running in dev env.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        {process.env.DEMO?.toLocaleLowerCase() === "true" && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="bg-blue-500 p-1 rounded">
                  <BirdIcon className="fill-white" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Attention ceci est un environnement de démo.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <Link
          href="/"
          className="text-lg text-primary-100 font-black select-none"
        >
          Heracles
        </Link>
      </div>
      <div className="flex gap-1">
        <ul className="flex gap-2">
          {filteredMenus.map((menu, index) => (
            <li key={index}>
              <Link
                href={menu.url}
                className={buttonVariants({ variant: "outline", size: "icon" })}
              >
                {menu.icon && <menu.icon width={20} height={20} />}
              </Link>
            </li>
          ))}
        </ul>
        {isLoggedIn && (
          <div className="flex gap-1">
            <button
              className="flex items-center bg-gray-800 px-2 py-1 rounded"
              onClick={() => {
                deleteCookie("token");
                logout();
                router.push("/");
              }}
            >
              <NotificationIcon
                width={20}
                height={20}
                className="fill-gray-50"
              />
            </button>
          </div>
        )}
        {isLoggedIn && (
          <DropdownComponent isOpen={isOpen}>
            <DropdownComponent.Trigger>
              <button
                className="flex items-center gap-1 p-0.5 bg-gray-800 rounded"
                onClick={() => setIsOpen(!isOpen)}
              >
                {user?.avatar && (
                  <Image
                    src={`http://localhost:8000/${user?.avatar}`}
                    alt="avatar"
                    className="w-6 h-6 object-cover rounded"
                    width={256}
                    height={256}
                  />
                )}
                <div className="flex justify-center px-2">
                  <span className="text-gray-50 text-sm font-semibold">
                    {user?.first_name}
                  </span>
                </div>
              </button>
            </DropdownComponent.Trigger>
            <DropdownComponent.Content>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span>{user?.first_name || "Devuser"}</span>

                  <button
                    className="flex items-center bg-gray-800 px-2 py-1 rounded"
                    onClick={() => {
                      deleteCookie("token");
                      logout();
                      router.push("/");
                    }}
                  >
                    <LogoutIcon
                      width={20}
                      height={20}
                      className="fill-gray-50"
                    />
                  </button>
                </div>
                <div className="flex flex-col gap-1">
                  <Link
                    href="/app/profile"
                    className="flex items-center gap-1 bg-gray-800 px-2 py-1 rounded"
                  >
                    <span className="text-sm text-gray-50">Profile</span>
                  </Link>
                </div>
              </div>
            </DropdownComponent.Content>
          </DropdownComponent>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <SunIcon
                className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                height={4}
                width={4}
              />
              <MoonIcon
                className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                height={2}
                width={2}
              />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default NavbarComponent;
