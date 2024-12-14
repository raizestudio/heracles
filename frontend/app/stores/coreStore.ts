import { create } from "zustand";

interface CoreState {
  avgLatency: number;
  latencyHistory: number[];
  addLatency: (latency: number) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useCoreStore = create<CoreState>((set) => ({
  avgLatency: 0,
  latencyHistory: [],
  addLatency: (latency: number) => {
    set((state) => {
      // Limit the history to 10 latencies
      const latencyHistory = [...state.latencyHistory, latency].slice(-10);

      // Calculate the average latency
      const avgLatency = Math.round(
        latencyHistory.reduce((acc, curr) => acc + curr, 0) /
          latencyHistory.length
      );

      return {
        avgLatency,
        latencyHistory,
      };
    });
  },
}));

export default useCoreStore;
