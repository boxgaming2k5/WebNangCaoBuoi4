import React, { useState } from 'react';
import { X, Code, Check, Copy } from 'lucide-react';

interface CodeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ZUSTAND_CODE = `// src/store/favoritesStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '../types/product';

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
          set({ favorites: favorites.filter((item) => item.id !== product.id) });
        } else {
          set({ favorites: [...favorites, product] });
        }
      },

      clearFavorites: () => set({ favorites: [] }),

      isFavorite: (productId: string) => {
        return get().favorites.some((item) => item.id === productId);
      }
    }),
    {
      name: 'favorites-zustand-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);`;

export const CodeViewer: React.FC<CodeViewerProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(ZUSTAND_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="drawer-overlay" onClick={onClose} style={{ justifyContent: 'center', alignItems: 'center', padding: '1.5rem' }}>
      <div
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '800px',
          maxHeight: '90vh',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Modal Header */}
        <div className="drawer-header">
          <div className="drawer-title">
            <Code size={22} className="text-indigo-400" />
            <span>Mã nguồn Cài đặt (Source Code)</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Copy Button */}
        <div style={{ padding: '12px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <strong>Zustand Store: favoritesStore.ts</strong>
          <button className="code-inspector-btn" onClick={handleCopy}>
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            {copied ? 'Đã sao chép!' : 'Sao chép code'}
          </button>
        </div>

        {/* Modal Code Content */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
          <pre className="code-block">{ZUSTAND_CODE}</pre>
        </div>
      </div>
    </div>
  );
};
