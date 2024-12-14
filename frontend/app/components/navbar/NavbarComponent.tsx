"use client";

import Link from "next/link";
import useUserStore from "@/app/stores/userStore";
import { usePathname } from "next/navigation";

// Icons
import HomeIcon from "@/app/components/icons/HomeIcon";
import HandsClappingIcon from "@/app/components/icons/HandsClappingIcon";
// import LogoutIcon from "@/components/icons/LogoutIcon";
import FlaskIcon from "@/app/components/icons/FlaskIcon";
import NotificationIcon from "@/app/components/icons/NotificationIcon";

import { deleteCookie } from "@/app/actions/cookie";
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
  const { user, isLoggedIn, logout } = useUserStore();

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
    }
  ];

  const filteredMenus = MENUS.filter((menu) => {
    if (menu.requiresAuth && !isLoggedIn && pathname !== "/") {
      return false;
    }
    return menu.url !== pathname;
  });

  return (
    <nav className="h-12 flex justify-between items-center px-4 bg-gray-50 shadow">
      <div className="flex items-center gap-2">
        {process.env.NODE_ENV === "development" && (
          <div className="bg-orange-500 p-1 rounded">
            <FlaskIcon className="fill-white" />
          </div>
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
              {/* <LogoutIcon width={20} height={20} className="fill-gray-50" /> */}
              
            </button>
            <button
              className="flex items-center bg-gray-800 px-2 py-1 rounded"
              onClick={() => {
                deleteCookie("token");
                logout();
                router.push("/");
              }}
            >
              <NotificationIcon width={20} height={20} className="fill-gray-50" />
            </button>
          </div>
        )}
        <button className="flex items-center gap-1 bg-gray-800 px-2 py-1 rounded">
          <span className="text-sm text-gray-50">{ user?.username }</span>
        </button>
      </div>
    </nav>
  );
};

export default NavbarComponent;
