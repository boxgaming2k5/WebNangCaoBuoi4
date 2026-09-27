import React from 'react';
import { Heart, Star, Check } from 'lucide-react';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite
}) => {
  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="product-card glass-panel">
      {/* Product Image & Badges */}
      <div className="card-img-wrapper">
        <img src={product.image} alt={product.name} className="card-img" />
        
        {product.isBestSeller && (
          <span className="badge-tag badge-bestseller">Bán chạy</span>
        )}
        {product.isNew && !product.isBestSeller && (
          <span className="badge-tag badge-new">Mới</span>
        )}

        {/* Favorite Heart Button Overlay */}
        <button
          className={`fav-heart-btn ${isFavorite ? 'is-active' : ''}`}
          onClick={() => onToggleFavorite(product)}
          title={isFavorite ? 'Bỏ khỏi yêu thích' : 'Thêm vào yêu thích'}
          aria-label="Toggle Favorite"
        >
          <Heart size={20} className={isFavorite ? 'fill-rose-500 text-rose-500' : ''} />
        </button>
      </div>

      {/* Card Content */}
      <div className="card-body">
        <div className="card-category">{product.category}</div>
        <h3 className="card-title" title={product.name}>
          {product.name}
        </h3>

        <div className="rating-row">
          <Star size={15} className="star-icon" />
          <span style={{ fontWeight: 700, color: '#f8fafc' }}>{product.rating}</span>
          <span>({product.reviewCount} đánh giá)</span>
        </div>

        <div className="card-footer">
          <div className="price-box">
            <span className="current-price">{formatVND(product.price)}</span>
            {product.originalPrice && (
              <span className="original-price">{formatVND(product.originalPrice)}</span>
            )}
          </div>

          <button
            className={`toggle-fav-action-btn ${isFavorite ? 'remove' : 'add'}`}
            onClick={() => onToggleFavorite(product)}
          >
            {isFavorite ? (
              <>
                <Check size={14} />
                Đã thích
              </>
            ) : (
              <>
                <Heart size={14} />
                Yêu thích
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
