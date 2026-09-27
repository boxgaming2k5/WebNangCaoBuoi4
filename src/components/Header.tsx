import React from 'react';
import { Heart, Search, Code } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onToggleCodeInspector: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchTerm,
  onSearchChange,
  favoritesCount,
  onOpenFavorites,
  onToggleCodeInspector
}) => {
  return (
    <header className="glass-nav">
      <div className="container header-wrapper">
        {/* Logo */}
        <div className="logo-group">
          <div className="logo-icon">
            <Heart className="w-6 h-6 text-white fill-white" size={24} />
          </div>
          <div className="logo-text">
            <h1>LTWNC - Tuần 4</h1>
            <span>Zustand Favorites Store</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-box">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm sản phẩm yêu thích..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* View Code Button */}
          <button className="code-inspector-btn" onClick={onToggleCodeInspector}>
            <Code size={16} />
            Xem Code
          </button>

          {/* Favorites Button */}
          <button className="fav-trigger-btn" onClick={onOpenFavorites}>
            <Heart size={18} className="fill-rose-500 text-rose-500" />
            <span>Yêu thích</span>
            <span className="fav-badge">{favoritesCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
