export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: string;
  image: string;
  description: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  discount?: number;
}
