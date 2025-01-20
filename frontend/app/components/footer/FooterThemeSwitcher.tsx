
// Icons
import ComputerTowerIcon from "@/app/components/icons/ComputerTowerIcon";
import MoonIcon from "@/app/components/icons/MoonIcon";
import SunIcon from "@/app/components/icons/SunIcon";

// Stores
import useThemeStore from "@/app/stores/themeStore";

const FooterThemeSwitcher = () => {
  
  const { isDarkMode, setDarkMode } = useThemeStore();
  return (
          <div
            className={`flex gap-2 px-0.5 py-0.5 rounded-full ${
              isDarkMode ? "bg-dark-100" : "bg-light-300 shadow-inner"
            }`}
          >
            <button className="p-1">
              {
                <ComputerTowerIcon
                  width={14}
                  height={14}
                  className={`${
                    isDarkMode ? "fill-light-100" : "fill-dark-100"
                  }`}
                />
              }
            </button>
            <button
              className={`p-1 ${isDarkMode ? "" : "bg-light-100 rounded-full"}`}
              onClick={() => setDarkMode(false)}
            >
              {
                <SunIcon
                  width={14}
                  height={14}
                  className={`${
                    isDarkMode ? "fill-light-100" : "fill-dark-100"
                  }`}
                />
              }
            </button>
            <button
              className={`p-1 ${isDarkMode ? "bg-dark-300 rounded-full" : ""}`}
              onClick={() => setDarkMode(true)}
            >
              {
                <MoonIcon
                  width={14}
                  height={14}
                  className={`${
                    isDarkMode ? "fill-light-100" : "fill-dark-100"
                  }`}
                />
              }
            </button>
          </div>
  )
};

export default FooterThemeSwitcher;