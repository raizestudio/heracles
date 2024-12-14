import { create } from "zustand";

import { UserInterface } from "@/app/interfaces/UserInterface";

interface UserState {
    isLoggedIn?: boolean;
    user?: UserInterface | null;
    login: (user: UserInterface) => void;
    logout: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useUserStore = create<UserState>((set) => ({ 
  isLoggedIn: false,
  user: null,
  login: async (user: UserInterface) => {
    set({ isLoggedIn: true });
    set({ user: user });
  }
  ,
  logout: () => set({ isLoggedIn: false }),
}));

export default useUserStore;