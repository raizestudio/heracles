"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import useUserStore from "@/app/stores/userStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Components
import DropdownComponent from "@/app/components/dropdown/DropdownComponent";

// Icons
import HomeIcon from "@/app/components/icons/HomeIcon";
import HandsClappingIcon from "@/app/components/icons/HandsClappingIcon";
import LogoutIcon from "@/app/components/icons/LogoutIcon";
import FlaskIcon from "@/app/components/icons/FlaskIcon";
import NotificationIcon from "@/app/components/icons/NotificationIcon";
import BirdIcon from "@/app/components/icons/BirdIcon";

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
        login({ username: "test", email: "t@t.co", id: 1, password: "test", first_name: "test", last_name: "test", avatar: "" });
      }
    }
    getCookieToken();
  }, []);
  return (
    <nav className="h-12 flex justify-between items-center px-4 bg-gray-50 shadow">
      <div className="flex items-center gap-2">
        {(process.env.NODE_ENV === "development" && process.env.DEMO === "false") && (
          <div className="bg-orange-500 p-1 rounded">
            <FlaskIcon className="fill-white" />
          </div>
        )}
        {process.env.DEMO === "true" && (
          <div className="bg-blue-500 p-1 rounded">
            <BirdIcon className="fill-white" />
          </div>
        )}
        <Link
          href="/"
          className="text-lg text-primary-100 font-black select-none"
        >
          Heracles
        </Link>
        
      </div>
      <span>{process.env.DEMO} | {isLoggedIn ? 'yes' : 'no'} - {user?.username}</span>
      <div className="flex gap-1">
        <ul className="flex gap-2">
          {filteredMenus.map((menu, index) => (
            <li key={index}>
              <Link
                href={menu.url}
                className="flex text-white bg-gray-800 hover:bg-primary-400 active:bg-primary-100 px-2 py-1 rounded select-none"
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
                    {user?.username}
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
      </div>
    </nav>
  );
};

export default NavbarComponent;
