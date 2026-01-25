import { create } from "zustand";
import { OpenState } from "../types";

export const useOpenBookStore = create<OpenState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

type EditBookState = {
  id?: number;
  isOpen: boolean;
  onOpen: (id?: number) => void;
  onClose: () => void;
};

export const useEditBookStore = create<EditBookState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id?: number) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
