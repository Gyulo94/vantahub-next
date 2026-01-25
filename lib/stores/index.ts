import { create } from "zustand";
import { OpenState } from "../types";

export const useOpenMenuStore = create<OpenState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export { useOpenAuthorStore, useEditAuthorStore } from "./author";
export { useOpenCategoryStore, useEditCategoryStore } from "./category";
export { useOpenBookStore, useEditBookStore } from "./book";
