import { create } from "zustand";

interface CoreState {
  hasNotification: boolean;
  toggleHasNotification: () => void;
}

const useCoreStore = create<CoreState>((set) => ({
  hasNotification: false,
  toggleHasNotification: () => set((state) => ({ hasNotification: !state.hasNotification })),
}));

export default useCoreStore;
