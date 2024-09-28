import { create } from "zustand";

export const useStore = create((set)=>({

    details: [],
    setDetails: (value) => set((state) => ({ details: value })),
    
}))