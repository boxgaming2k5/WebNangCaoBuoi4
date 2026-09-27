import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { CodeViewer } from './components/CodeViewer';
import { useFavoritesStore } from './store/favoritesStore';
import { PRODUCTS, CATEGORIES } from './data/products';
import { Heart, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

function AppContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCodeInspectorOpen, setIsCodeInspectorOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const favoritesManager = useFavoritesStore();

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleToggleFavorite = (product: typeof PRODUCTS[0]) => {
    const willBeFav = !favoritesManager.isFavorite(product.id);
    favoritesManager.toggleFavorite(product);
    triggerToast(
      willBeFav
        ? `Đã thêm "${product.name}" vào danh sách yêu thích`
        : `Đã xóa "${product.name}" khỏi danh sách yêu thích`
    );
  };

  // Filter products by category and search term
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'Tất cả' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 100,
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            color: '#fff',
            padding: '12px 20px',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backdropFilter: 'blur(10px)',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        favoritesCount={favoritesManager.favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onToggleCodeInspector={() => setIsCodeInspectorOpen(true)}
      />

      {/* Main Content Area */}
      <main className="container" style={{ flex: 1 }}>
        {/* Hero Section */}
        <section className="hero-banner glass-panel">
          <div className="hero-content">
            <div className="hero-badge-info">
              <Sparkles size={14} />
              <span>Bài tập tuần 4 - Lập trình Web nâng cao</span>
            </div>
            <h2>Tính năng "Sản Phẩm Yêu Thích"</h2>
            <p>
              Quản lý bằng <strong>Zustand Store (favoritesStore)</strong>. Nhấn trái tim để thêm hoặc bỏ sản phẩm; danh sách được lưu trên trình duyệt.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="fav-trigger-btn" onClick={() => setIsFavoritesOpen(true)}>
              <Heart size={20} className="fill-rose-500 text-rose-500" />
              <span>Xem danh sách thích ({favoritesManager.favorites.length})</span>
            </button>
          </div>
        </section>

        {/* Category Filters */}
        <section className="filter-tabs">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, marginRight: '4px' }}>
            <Filter size={16} />
            <span>Lọc:</span>
          </div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-tab ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </section>

        {/* Product Grid Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
            Danh sách sản phẩm {selectedCategory !== 'Tất cả' && `— ${selectedCategory}`}
          </h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Hiển thị <strong>{filteredProducts.length}</strong> / {PRODUCTS.length} sản phẩm
          </span>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="empty-state glass-panel" style={{ borderRadius: '16px' }}>
            <Heart className="empty-icon" />
            <h3>Không tìm thấy sản phẩm nào</h3>
            <p>Thử tìm kiếm với từ khóa khác hoặc chuyển sang danh mục sản phẩm khác.</p>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favoritesManager.isFavorite(product.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}

        <section className="comparison-section" aria-labelledby="comparison-title">
          <div className="comparison-heading">
            <span>NHẬN XÉT</span>
            <h2 id="comparison-title">Zustand và Redux Toolkit</h2>
          </div>
          <ol>
            <li>Zustand có API gọn, tạo store nhanh và ít mã thiết lập hơn Redux Toolkit.</li>
            <li>Store Zustand dùng trực tiếp trong component, không cần Provider bao ứng dụng.</li>
            <li>Middleware persist giúp lưu danh sách yêu thích vào localStorage thuận tiện.</li>
            <li>Redux Toolkit có cấu trúc chuẩn hóa, phù hợp dự án lớn và nhiều luồng state.</li>
            <li>Redux Toolkit tích hợp tốt với Redux DevTools và hệ sinh thái middleware phong phú.</li>
            <li>Với tính năng nhỏ này, Zustand nhẹ và đơn giản; đổi lại Redux Toolkit dễ quản lý quy mô lớn hơn.</li>
          </ol>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '1.5rem 0', background: 'rgba(15, 23, 42, 0.9)', textAlign: 'center', marginTop: 'auto' }}>
        <div className="container">
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            © 2026 LTWNC - Bài tập tuần 4: Quản lý State với Zustand & React Context nâng cao.
          </p>
        </div>
      </footer>

      {/* Favorites Slide-over Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favoritesManager.favorites}
        onRemoveFavorite={(id) => {
          favoritesManager.removeFavorite(id);
          triggerToast('Đã xóa sản phẩm khỏi danh sách yêu thích');
        }}
        onClearFavorites={() => {
          favoritesManager.clearFavorites();
          triggerToast('Đã xóa tất cả sản phẩm yêu thích');
        }}
      />

      {/* Code Inspector Modal */}
      <CodeViewer
        isOpen={isCodeInspectorOpen}
        onClose={() => setIsCodeInspectorOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
