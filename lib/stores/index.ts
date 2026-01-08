import { create } from "zustand";

interface OpenStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useOpenMenuStore = create<OpenStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
