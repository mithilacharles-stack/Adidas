export type Category = 'Men' | 'Women' | 'Kids' | 'Sports' | 'New Arrivals';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  image: string;
  rating: number;
  reviewsCount: number;
  sizes: string[];
  colors: string[];
  details: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  stockCount: number;
}

export interface CartItem extends Product {
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}
