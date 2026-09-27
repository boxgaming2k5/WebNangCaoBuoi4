import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import type { Product } from '../types/product';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Product[];
  onRemoveFavorite: (id: string) => void;
  onClearFavorites: () => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onClearFavorites
}) => {
  if (!isOpen) return null;

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const totalPrice = favorites.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title">
            <Heart className="fill-rose-500 text-rose-500" size={22} />
            <span>Danh sách Yêu thích</span>
            <span className="fav-badge">{favorites.length}</span>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close drawer">
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="drawer-body">
          {favorites.length === 0 ? (
            <div className="empty-state">
              <ShoppingBag className="empty-icon" />
              <h3>Chưa có sản phẩm yêu thích</h3>
              <p>Hãy bấm vào biểu tượng trái tim ở các sản phẩm để thêm vào danh sách yêu thích của bạn!</p>
            </div>
          ) : (
            favorites.map((product) => (
              <div key={product.id} className="fav-item">
                <img src={product.image} alt={product.name} className="fav-thumb" />
                <div className="fav-info">
                  <div className="fav-name">{product.name}</div>
                  <div className="fav-price">{formatVND(product.price)}</div>
                </div>
                <button
                  className="remove-item-btn"
                  onClick={() => onRemoveFavorite(product.id)}
                  title="Xóa khỏi yêu thích"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {favorites.length > 0 && (
          <div className="drawer-footer">
            <div className="summary-row">
              <span style={{ color: 'var(--text-muted)' }}>Tổng số sản phẩm:</span>
              <strong style={{ color: '#fff' }}>{favorites.length} sản phẩm</strong>
            </div>
            <div className="summary-row">
              <span style={{ color: 'var(--text-muted)' }}>Tổng giá trị:</span>
              <strong style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>
                {formatVND(totalPrice)}
              </strong>
            </div>
            <button className="clear-all-btn" onClick={onClearFavorites}>
              <Trash2 size={16} />
              Xóa tất cả sản phẩm yêu thích
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
