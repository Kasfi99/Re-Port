import { create } from "zustand";

const useStore = create((set) => ({
  userData: null,
  setUserData: (data) => set({ userData: data }),
}));

export default useStore;
