import { create } from "zustand";

import { UserInterface } from "@/app/interfaces/UserInterface";
import { ISession } from "@/app/interfaces/SessionInterface";

interface UserState {
    isLoggedIn?: boolean;
    user?: UserInterface | null;
    session?: ISession | null;
    setSession: (session: ISession) => void;
    login: (user: UserInterface) => void;
    logout: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useUserStore = create<UserState>((set) => ({ 
  isLoggedIn: false,
  user: null,
  session: null,
  setSession: (session: ISession) => set({ session: session }),
  login: async (user: UserInterface) => {
    set({ isLoggedIn: true });
    set({ user: user });
  }
  ,
  logout: () => set({ isLoggedIn: false }),
}));

export default useUserStore;