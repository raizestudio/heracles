import { create } from "zustand";

interface UserState {
    id: number;
    isLoggedIn?: boolean;
    login: () => void;
    logout: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useUserStore = create<UserState>((set) => ({ 
  id: 0,
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
}));

export default useUserStore;