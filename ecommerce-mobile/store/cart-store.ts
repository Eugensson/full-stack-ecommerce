import { create } from "zustand";

export const useCartStore = create((set) => ({
  items: [],

  addProduct: (product: any) =>
    set((state) => ({
      items: [...state.items, { product, quantity: 1 }],
    })),

  resetCart: () => set({ items: [] }),
}));
