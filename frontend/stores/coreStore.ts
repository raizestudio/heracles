import { create } from "zustand";

interface StatusInterface {
  latency: number;
}

interface CoreState {
    status: StatusInterface;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useUserStore = create<CoreState>((set) => ({ 
  status: { latency: 0 },
}));

export default useUserStore;