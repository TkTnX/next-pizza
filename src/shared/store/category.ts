import { create } from "zustand";

interface CategoryIdInterface {
  categoryActive: number;
  setCategoryActive: (categoryId: number) => void;
}

export const useCategories = create<CategoryIdInterface>((set) => ({
  categoryActive: 0,
  setCategoryActive: (categoryId: number) =>
    set((state: { categoryActive: number; }) => ({ categoryActive: (state.categoryActive = categoryId) })),
}));
