"use client";

import Link from "next/link";
import useUserStore from "@/stores/userStore";
import { usePathname } from "next/navigation";

// Icons
import HomeIcon from "@/components/icons/HomeIcon";
import HandsClappingIcon from "@/components/icons/HandsClappingIcon";
import LogoutIcon from "@/components/icons/LogoutIcon";

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
  const { isLoggedIn, logout } = useUserStore();

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

  return (
    <nav className="h-12 flex justify-between items-center px-4 bg-gray-200">
      <div>
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
                className="flex text-white bg-primary-100 hover:bg-primary-400 active:bg-primary-100 px-4 py-1 rounded select-none"
              >
                {menu.icon && <menu.icon width={24} height={24} />}
              </Link>
            </li>
          ))}
        </ul>
        {isLoggedIn && (
          <button
          className="flex items-center bg-red-400 px-2 py-1 rounded"
          onClick={() => {
            deleteCookie("token");
            logout();
            router.push("/");
          }}
        >
          <LogoutIcon width={24} height={24} className="fill-white" />
        </button>
        )}
      </div>
    </nav>
  );
};

export default NavbarComponent;
