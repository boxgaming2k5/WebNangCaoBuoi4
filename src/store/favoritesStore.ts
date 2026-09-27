import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product } from '../types/product';

interface FavoritesState {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  toggleFavorite: (product: Product) => void;
  clearFavorites: () => void;
  isFavorite: (productId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (product: Product) => {
        const { favorites } = get();
        if (!favorites.some((item) => item.id === product.id)) {
          set({ favorites: [...favorites, product] });
        }
      },

      removeFavorite: (productId: string) => {
        set((state) => ({
          favorites: state.favorites.filter((item) => item.id !== productId)
        }));
      },

      toggleFavorite: (product: Product) => {
        const { favorites } = get();
        const exists = favorites.some((item) => item.id === product.id);

        if (exists) {
          set({
            favorites: favorites.filter((item) => item.id !== product.id)
          });
        } else {
          set({
            favorites: [...favorites, product]
          });
        }
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },

      isFavorite: (productId: string) => {
        return get().favorites.some((item) => item.id === productId);
      }
    }),
    {
      name: 'favorites-zustand-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
