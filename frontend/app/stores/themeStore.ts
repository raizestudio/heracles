import { create } from "zustand";

interface ThemeState {
  theme: string;
  isDarkMode: boolean;
  setTheme: (theme: string) => void;
  toggleDarkMode: () => void;
  setDarkMode: (isDarkMode: boolean) => void;
}

/*
 * This store is used to manage the theme of the application.
 * It stores the current theme and whether the dark mode is enabled.
 * 
 * The theme can be set using the `setTheme` method.
 * The dark mode can be toggled using the `toggleDarkMode` method.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useThemeStore = create<ThemeState>((set) => ({
  theme: "default",
  isDarkMode: false,
  setTheme: (theme: string) => {
    set((state) => ({
      ...state,
      theme,
    }));
  },
  toggleDarkMode: () => {
    set((state) => ({
      ...state,
      isDarkMode: !state.isDarkMode,
    }));
  },
  setDarkMode: (isDarkMode: boolean) => {
    set((state) => ({
      ...state,
      isDarkMode,
    }));
  },
}));

export default useThemeStore;
