import type { Product } from '../types/product';

export const CATEGORIES = [
  'Tất cả',
  'Điện tử',
  'Thời trang',
  'Phụ kiện',
  'Nhà cửa & Đời sống',
  'Sách'
] as const;

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Tai nghe Chống ồn Wireless Sony WH-1000XM5',
    price: 8490000,
    originalPrice: 9990000,
    rating: 4.9,
    reviewCount: 328,
    category: 'Điện tử',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    description: 'Tai nghe chụp tai chống ồn đỉnh cao thế hệ mới, pin lên đến 30 giờ, tích hợp micro đàm thoại rõ nét.',
    isBestSeller: true,
    discount: 15
  },
  {
    id: 'prod-2',
    name: 'Đồng hồ Thông minh Apple Watch Series 9 GPS',
    price: 10490000,
    originalPrice: 11990000,
    rating: 4.8,
    reviewCount: 215,
    category: 'Điện tử',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    description: 'Màn hình Always-On Retina siêu sáng, thao tác chạm đúp độc đáo, theo dõi sức khỏe chuyên sâu.',
    isNew: true,
    discount: 12
  },
  {
    id: 'prod-3',
    name: 'Áo Khoác Denim Vintage Unisex Oversize',
    price: 550000,
    originalPrice: 750000,
    rating: 4.7,
    reviewCount: 142,
    category: 'Thời trang',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    description: 'Chất liệu jeans cotton dày dặn, phom dáng chuẩn phong cách Streetwear hiện đại.',
    discount: 26
  },
  {
    id: 'prod-4',
    name: 'Bàn Phím Cơ Không Dây Keychron K2 Pro Wireless',
    price: 2150000,
    originalPrice: 2490000,
    rating: 4.9,
    reviewCount: 512,
    category: 'Điện tử',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    description: 'Hỗ trợ QMK/VIA, switch hot-swappable, kết nối Bluetooth 5.1 và cáp Type-C tiện lợi.',
    isBestSeller: true,
    discount: 13
  },
  {
    id: 'prod-5',
    name: 'Bình Giữ Nhiệt Hydro Flask Flex Cap 946ml',
    price: 890000,
    originalPrice: 1050000,
    rating: 4.8,
    reviewCount: 98,
    category: 'Nhà cửa & Đời sống',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    description: 'Công nghệ TempShield giữ lạnh 24h, giữ nóng 12h. Thép không gỉ 18/8 cao cấp.',
    discount: 15
  },
  {
    id: 'prod-6',
    name: 'Giày Sneaker Nike Air Jordan 1 Low Retro',
    price: 3690000,
    originalPrice: 4200000,
    rating: 4.9,
    reviewCount: 430,
    category: 'Thời trang',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    description: 'Thiết kế kinh điển với chất liệu da cao cấp, đế cao su chống trượt tuyệt vời.',
    isNew: true,
    discount: 12
  },
  {
    id: 'prod-7',
    name: 'Balo Chống Nước Minimalist Laptop 15.6 inch',
    price: 680000,
    originalPrice: 850000,
    rating: 4.6,
    reviewCount: 88,
    category: 'Phụ kiện',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    description: 'Nhiều ngăn chứa thông minh, chất liệu vải Oxford trượt nước, đệm lưng thoáng khí.',
    discount: 20
  },
  {
    id: 'prod-8',
    name: 'Sách "Atomic Habits" - Thay Đổi Tí Hon Hiệu Quả Bất Ngờ',
    price: 189000,
    originalPrice: 220000,
    rating: 5.0,
    reviewCount: 1250,
    category: 'Sách',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    description: 'Cuốn sách bán chạy toàn cầu về chiến lược xây dựng thói quen tốt và loại bỏ thói quen xấu.',
    isBestSeller: true,
    discount: 14
  }
];
